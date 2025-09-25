import { useEffect, useRef, useReducer } from 'react';
import { MessageCircle, X, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { API_CONFIG, EMAIL_TEMPLATES } from '../config/api';
import Swal from 'sweetalert2';

// Types
interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'buttons' | 'form';
  buttons?: ActionButton[];
  form?: FormField[];
}

interface ActionButton {
  id: string;
  text: string;
  icon: string;
}

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

interface UserJourney {
  language: string;
  profile: string;
  goal: string;
  services: string[];
  method: string;
  sampleSize: string;
  timeline: string;
  budget: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  consent: boolean;
  timestamp: Date;
}

// State management
interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  currentStep: string;
  messages: Message[];
  userJourney: Partial<UserJourney>;
  isTyping: boolean;
  currentLanguage: string;
  stepHistory: string[];
}

type ChatAction = 
  | { type: 'OPEN_CHAT' }
  | { type: 'CLOSE_CHAT' }
  | { type: 'MINIMIZE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_STEP'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'UPDATE_JOURNEY'; payload: Partial<UserJourney> }
  | { type: 'GO_BACK' }
  | { type: 'RESET_CHAT' };

const initialState: ChatState = {
  isOpen: false,
  isMinimized: false,
  currentStep: 'welcome',
  messages: [],
  userJourney: {},
  isTyping: false,
  currentLanguage: 'en',
  stepHistory: []
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'OPEN_CHAT':
      return { ...state, isOpen: true };
    case 'CLOSE_CHAT':
      return { ...state, isOpen: false, isMinimized: false };
    case 'MINIMIZE_CHAT':
      return { ...state, isMinimized: !state.isMinimized };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'SET_STEP':
      return { 
        ...state, 
        currentStep: action.payload,
        stepHistory: [...state.stepHistory, state.currentStep]
      };
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'UPDATE_JOURNEY':
      return { ...state, userJourney: { ...state.userJourney, ...action.payload } };
    case 'GO_BACK':
      const previousStep = state.stepHistory[state.stepHistory.length - 1] || 'welcome';
      return {
        ...state,
        currentStep: previousStep,
        stepHistory: state.stepHistory.slice(0, -1)
      };
    case 'RESET_CHAT':
      return {
        ...initialState,
        isOpen: true,
        currentLanguage: state.currentLanguage
      };
    default:
      return state;
  }
}

// Dialog data embedded directly
const dialogData = {
  welcome: {
    message: "Hello! I'm Omega Assistant, your virtual assistant to discover our research and consulting services.",
    actions: [
      { id: "start_journey", text: "Start journey", icon: "" },
      { id: "human_contact", text: "Talk to a human", icon: "" }
    ]
  },
  profile_selection: {
    message: "What is your professional profile?",
    actions: [
      { id: "profile_marketing", text: "Marketing / Communication", icon: "" },
      { id: "profile_sales", text: "Sales / Business Development", icon: "" },
      { id: "profile_management", text: "Management / Executive", icon: "" },
      { id: "profile_research", text: "Research / Analytics", icon: "" },
      { id: "profile_other", text: "Other", icon: "" }
    ]
  },
  goal_selection: {
    message: "What is your main objective?",
    actions: [
      { id: "goal_brand_awareness", text: "Improve brand awareness", icon: "" },
      { id: "goal_customer_satisfaction", text: "Measure customer satisfaction", icon: "" },
      { id: "goal_market_research", text: "Understand the market", icon: "" },
      { id: "goal_product_development", text: "Develop new products", icon: "" },
      { id: "goal_competitor_analysis", text: "Analyze competition", icon: "" }
    ]
  },
  services: {
    message: "Here are our research and consulting services:",
    actions: [
      { id: "service_research_analytics", text: "Research Analytics", icon: "" },
      { id: "service_strategic_consulting", text: "Strategic Consulting", icon: "" },
      { id: "service_nps_plus", text: "NPS+", icon: "" },
      { id: "service_ua_research", text: "U&A Research", icon: "" },
      { id: "service_focus_groups", text: "Focus Groups", icon: "" }
    ]
  },
  method_selection: {
    message: "Which research method do you prefer?",
    actions: [
      { id: "method_quantitative", text: "Quantitative (surveys, polls)", icon: "" },
      { id: "method_qualitative", text: "Qualitative (interviews, focus groups)", icon: "" },
      { id: "method_mixed", text: "Mixed (quantitative + qualitative)", icon: "" },
      { id: "method_consultation", text: "Strategic consultation", icon: "" }
    ]
  },
  sample_size: {
    message: "What sample size are you considering?",
    actions: [
      { id: "sample_small", text: "Small (50-200 people)", icon: "" },
      { id: "sample_medium", text: "Medium (200-1000 people)", icon: "" },
      { id: "sample_large", text: "Large (1000+ people)", icon: "" },
      { id: "sample_consultation", text: "No sample (consultation)", icon: "" }
    ]
  },
  timeline: {
    message: "What is your preferred timeline?",
    actions: [
      { id: "timeline_urgent", text: "Urgent (1-2 weeks)", icon: "" },
      { id: "timeline_fast", text: "Fast (2-4 weeks)", icon: "" },
      { id: "timeline_standard", text: "Standard (1-2 months)", icon: "" },
      { id: "timeline_flexible", text: "Flexible (2+ months)", icon: "" }
    ]
  },
  budget: {
    message: "What is your approximate budget?",
    actions: [
      { id: "budget_small", text: "Less than €5,000", icon: "" },
      { id: "budget_medium", text: "€5,000 - €15,000", icon: "" },
      { id: "budget_large", text: "€15,000 - €50,000", icon: "" },
      { id: "budget_enterprise", text: "€50,000+", icon: "" },
      { id: "budget_discuss", text: "To discuss", icon: "" }
    ]
  },
  contact_form: {
    message: "Perfect! To finalize your request, I need a few details:",
    fields: [
      { id: "name", label: "Full name *", placeholder: "Your first and last name", type: "text", required: true },
      { id: "email", label: "Professional email *", placeholder: "your.email@company.com", type: "email", required: true },
      { id: "phone", label: "Phone", placeholder: "+33 1 23 45 67 89", type: "tel", required: false },
      { id: "company", label: "Company", placeholder: "Your company name", type: "text", required: false }
    ],
    consent: {
      text: "I agree to be contacted by Omega Research & Consulting regarding my request and I have read the",
      privacy_link: "Privacy Policy",
      required: true
    },
    actions: [
      { id: "submit_lead", text: "Send my request", icon: "" },
      { id: "back_to_budget", text: "Back", icon: "" }
    ]
  },
  confirmation: {
    message: "Thank you! Your request has been sent successfully. Our team will contact you within 24h.",
    actions: [
      { id: "close_chat", text: "Close", icon: "" },
      { id: "new_journey", text: "New journey", icon: "" }
    ]
  }
};

const OmegaChatbotFixed = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-open after 3 seconds for testing
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Auto-opening chatbot...');
      dispatch({ type: 'OPEN_CHAT' });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Initialize conversation
  useEffect(() => {
    console.log('Chatbot useEffect triggered:', { isOpen: state.isOpen, messagesLength: state.messages.length });
    if (state.isOpen && state.messages.length === 0) {
      console.log('Creating welcome message...');
      const welcomeMessage = createMessage(
        dialogData.welcome.message,
        true,
        'buttons',
        dialogData.welcome.actions
      );
      console.log('Welcome message created:', welcomeMessage);
      dispatch({ type: 'ADD_MESSAGE', payload: welcomeMessage });
    }
  }, [state.isOpen, state.messages.length, state.currentLanguage]);

  // Helper functions
  const createMessage = (
    text: string, 
    isBot: boolean, 
    type: 'text' | 'buttons' | 'form' = 'text',
    buttons?: ActionButton[],
    form?: FormField[]
  ): Message => ({
    id: Date.now().toString(),
    text,
    isBot,
    timestamp: new Date(),
    type,
    buttons,
    form
  });

  const addTypingDelay = async (delay: number = 1000) => {
    dispatch({ type: 'SET_TYPING', payload: true });
    await new Promise(resolve => setTimeout(resolve, delay));
    dispatch({ type: 'SET_TYPING', payload: false });
  };

  const handleAction = async (actionId: string) => {
    // Add user message
    const userMessage = createMessage(
      getActionText(actionId),
      false
    );
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    await addTypingDelay(800);

    // Handle different actions
    switch (actionId) {
      case 'start_journey':
        dispatch({ type: 'SET_STEP', payload: 'profile_selection' });
        const profileMessage = createMessage(
          dialogData.profile_selection.message,
          true,
          'buttons',
          dialogData.profile_selection.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: profileMessage });
        break;

      case 'human_contact':
        const humanMessage = createMessage(
          "I'll connect you with our team. Please provide your contact details and we'll get back to you within 24 hours.",
          true,
          'buttons',
          [
            { id: 'provide_contact', text: 'Provide my contact details', icon: '' },
            { id: 'back_to_welcome', text: 'Back to main menu', icon: '' }
          ]
        );
        dispatch({ type: 'ADD_MESSAGE', payload: humanMessage });
        break;

      case 'provide_contact':
        dispatch({ type: 'SET_STEP', payload: 'contact_form' });
        const humanContactMessage = createMessage(
          dialogData.contact_form.message,
          true,
          'form',
          undefined,
          dialogData.contact_form.fields
        );
        dispatch({ type: 'ADD_MESSAGE', payload: humanContactMessage });
        break;

      case 'back_to_welcome':
        dispatch({ type: 'SET_STEP', payload: 'welcome' });
        const backToWelcomeMessage = createMessage(
          dialogData.welcome.message,
          true,
          'buttons',
          dialogData.welcome.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: backToWelcomeMessage });
        break;

      case 'profile_marketing':
      case 'profile_sales':
      case 'profile_management':
      case 'profile_research':
      case 'profile_other':
        dispatch({ type: 'UPDATE_JOURNEY', payload: { profile: actionId, language: 'en' } });
        dispatch({ type: 'SET_STEP', payload: 'goal_selection' });
        const goalMessage = createMessage(
          dialogData.goal_selection.message,
          true,
          'buttons',
          dialogData.goal_selection.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: goalMessage });
        break;

      case 'goal_brand_awareness':
      case 'goal_customer_satisfaction':
      case 'goal_market_research':
      case 'goal_product_development':
      case 'goal_competitor_analysis':
        dispatch({ type: 'UPDATE_JOURNEY', payload: { goal: actionId } });
        dispatch({ type: 'SET_STEP', payload: 'services' });
        const servicesMessage = createMessage(
          dialogData.services.message,
          true,
          'buttons',
          dialogData.services.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: servicesMessage });
        break;

      case 'service_research_analytics':
      case 'service_strategic_consulting':
      case 'service_nps_plus':
      case 'service_ua_research':
      case 'service_focus_groups':
        // Add service to selected services
        const currentServices = state.userJourney.services || [];
        const serviceKey = actionId.replace('service_', '');
        if (!currentServices.includes(serviceKey)) {
          dispatch({ type: 'UPDATE_JOURNEY', payload: { services: [...currentServices, serviceKey] } });
        }
        dispatch({ type: 'SET_STEP', payload: 'method_selection' });
        const methodMessage = createMessage(
          dialogData.method_selection.message,
          true,
          'buttons',
          dialogData.method_selection.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: methodMessage });
        break;

      case 'method_quantitative':
      case 'method_qualitative':
      case 'method_mixed':
      case 'method_consultation':
        dispatch({ type: 'UPDATE_JOURNEY', payload: { method: actionId } });
        dispatch({ type: 'SET_STEP', payload: 'sample_size' });
        const sampleMessage = createMessage(
          dialogData.sample_size.message,
          true,
          'buttons',
          dialogData.sample_size.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: sampleMessage });
        break;

      case 'sample_small':
      case 'sample_medium':
      case 'sample_large':
      case 'sample_consultation':
        dispatch({ type: 'UPDATE_JOURNEY', payload: { sampleSize: actionId } });
        dispatch({ type: 'SET_STEP', payload: 'timeline' });
        const timelineMessage = createMessage(
          dialogData.timeline.message,
          true,
          'buttons',
          dialogData.timeline.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: timelineMessage });
        break;

      case 'timeline_urgent':
      case 'timeline_fast':
      case 'timeline_standard':
      case 'timeline_flexible':
        dispatch({ type: 'UPDATE_JOURNEY', payload: { timeline: actionId } });
        dispatch({ type: 'SET_STEP', payload: 'budget' });
        const budgetMessage = createMessage(
          dialogData.budget.message,
          true,
          'buttons',
          dialogData.budget.actions
        );
        dispatch({ type: 'ADD_MESSAGE', payload: budgetMessage });
        break;

      case 'budget_small':
      case 'budget_medium':
      case 'budget_large':
      case 'budget_enterprise':
      case 'budget_discuss':
        dispatch({ type: 'UPDATE_JOURNEY', payload: { budget: actionId } });
        dispatch({ type: 'SET_STEP', payload: 'contact_form' });
        const budgetContactMessage = createMessage(
          dialogData.contact_form.message,
          true,
          'form',
          undefined,
          dialogData.contact_form.fields
        );
        dispatch({ type: 'ADD_MESSAGE', payload: budgetContactMessage });
        break;

      case 'submit_lead':
        handleSubmitLead();
        break;

      case 'back_to_budget':
        dispatch({ type: 'GO_BACK' });
        break;

      case 'close_chat':
        dispatch({ type: 'CLOSE_CHAT' });
        break;

      case 'new_journey':
        dispatch({ type: 'RESET_CHAT' });
        break;
    }
  };

  const getActionText = (actionId: string): string => {
    const actionMap: { [key: string]: string } = {
      'start_journey': dialogData.welcome.actions[0].text,
      'human_contact': dialogData.welcome.actions[1].text,
      'provide_contact': 'Provide my contact details',
      'back_to_welcome': 'Back to main menu',
      'profile_marketing': dialogData.profile_selection.actions[0].text,
      'profile_sales': dialogData.profile_selection.actions[1].text,
      'profile_management': dialogData.profile_selection.actions[2].text,
      'profile_research': dialogData.profile_selection.actions[3].text,
      'profile_other': dialogData.profile_selection.actions[4].text,
      'goal_brand_awareness': dialogData.goal_selection.actions[0].text,
      'goal_customer_satisfaction': dialogData.goal_selection.actions[1].text,
      'goal_market_research': dialogData.goal_selection.actions[2].text,
      'goal_product_development': dialogData.goal_selection.actions[3].text,
      'goal_competitor_analysis': dialogData.goal_selection.actions[4].text,
      'service_research_analytics': dialogData.services.actions[0].text,
      'service_strategic_consulting': dialogData.services.actions[1].text,
      'service_nps_plus': dialogData.services.actions[2].text,
      'service_ua_research': dialogData.services.actions[3].text,
      'service_focus_groups': dialogData.services.actions[4].text,
      'method_quantitative': dialogData.method_selection.actions[0].text,
      'method_qualitative': dialogData.method_selection.actions[1].text,
      'method_mixed': dialogData.method_selection.actions[2].text,
      'method_consultation': dialogData.method_selection.actions[3].text,
      'sample_small': dialogData.sample_size.actions[0].text,
      'sample_medium': dialogData.sample_size.actions[1].text,
      'sample_large': dialogData.sample_size.actions[2].text,
      'sample_consultation': dialogData.sample_size.actions[3].text,
      'timeline_urgent': dialogData.timeline.actions[0].text,
      'timeline_fast': dialogData.timeline.actions[1].text,
      'timeline_standard': dialogData.timeline.actions[2].text,
      'timeline_flexible': dialogData.timeline.actions[3].text,
      'budget_small': dialogData.budget.actions[0].text,
      'budget_medium': dialogData.budget.actions[1].text,
      'budget_large': dialogData.budget.actions[2].text,
      'budget_enterprise': dialogData.budget.actions[3].text,
      'budget_discuss': dialogData.budget.actions[4].text,
    };
    return actionMap[actionId] || actionId;
  };

  const handleSubmitLead = async () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const contactInfo = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
    };

    const consent = formData.get('consent') === 'on';

        if (!contactInfo.name || !contactInfo.email || !consent) {
          Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill in all required fields',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3B82F6',
            position: 'top-end',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true
          });
          return;
        }

    dispatch({ type: 'UPDATE_JOURNEY', payload: { contactInfo, consent } });

    // Use the existing contact API
    try {
      console.log('Submitting chatbot lead:', { ...state.userJourney, contactInfo, consent });
      
      // Split name into first and last name
      const nameParts = contactInfo.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Determine the subject based on the journey
      let subject = 'Chatbot Lead - General Inquiry';
      if (state.stepHistory.includes('human_contact')) {
        subject = 'Chatbot Lead - Human Contact Request';
      } else if (state.userJourney.goal) {
        const goalText = state.userJourney.goal.replace('goal_', '').replace('_', ' ');
        subject = `Chatbot Lead - ${goalText}`;
      }

      // Prepare the email data according to the existing API structure
      const emailData = {
        sender_email: contactInfo.email,
        sender_name: EMAIL_TEMPLATES.CONTACT.sender_name,
        organisation: contactInfo.company || "Non spécifié",
        sujet: `${EMAIL_TEMPLATES.CHATBOT.sujet_prefix} - ${subject}`,
        message: `
          CHATBOT LEAD - Détails du parcours utilisateur
          
          Informations de contact:
          Nom complet: ${contactInfo.name}
          Email: ${contactInfo.email}
          Téléphone: ${contactInfo.phone || 'Non fourni'}
          Entreprise: ${contactInfo.company || 'Non fournie'}
          
          Parcours chatbot:
          Profil: ${state.userJourney.profile || 'Non spécifié'}
          Objectif: ${state.userJourney.goal || 'Non spécifié'}
          Services: ${state.userJourney.services?.join(', ') || 'Non spécifié'}
          Méthode: ${state.userJourney.method || 'Non spécifié'}
          Taille d'échantillon: ${state.userJourney.sampleSize || 'Non spécifié'}
          Délai: ${state.userJourney.timeline || 'Non spécifié'}
          Budget: ${state.userJourney.budget || 'Non spécifié'}
          
          Consentement: ${consent ? 'Oui' : 'Non'}
          Langue: ${state.currentLanguage}
          Timestamp: ${new Date().toISOString()}
        `,
        noms: [firstName, lastName],
        extra_json: {
          source: 'chatbot',
          journey_type: state.stepHistory.includes('human_contact') ? 'human_contact' : 'guided_journey',
          profile: state.userJourney.profile || "Non spécifié",
          goal: state.userJourney.goal || "Non spécifié",
          services: state.userJourney.services || [],
          method: state.userJourney.method || "Non spécifié",
          sample_size: state.userJourney.sampleSize || "Non spécifié",
          timeline: state.userJourney.timeline || "Non spécifié",
          budget: state.userJourney.budget || "Non spécifié",
          language: state.currentLanguage,
          consent: consent
        }
      };

      // Send email via the existing API
      const response = await fetch(API_CONFIG.EMAIL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': API_CONFIG.EMAIL_API_TOKEN
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Chatbot lead sent successfully:', result);
      
      // Different confirmation message based on the journey
      let confirmationText = dialogData.confirmation.message;
      if (state.currentStep === 'contact_form' && state.stepHistory.includes('human_contact')) {
        confirmationText = "Thank you! Your contact details have been sent to our team. We'll get back to you within 24 hours to discuss your needs.";
      }
      
      dispatch({ type: 'SET_STEP', payload: 'confirmation' });
      const confirmationMessage = createMessage(
        confirmationText,
        true,
        'buttons',
        dialogData.confirmation.actions
      );
      dispatch({ type: 'ADD_MESSAGE', payload: confirmationMessage });
      
      // Clear localStorage
      localStorage.removeItem('omega-chatbot-state');
      } catch (error) {
        console.error('Error sending chatbot lead:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error sending request. Please try again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#EF4444',
          position: 'top-end',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true
        });
      }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Button */}
      {!state.isOpen && (
        <button
          onClick={() => {
            console.log('Chatbot button clicked!');
            dispatch({ type: 'OPEN_CHAT' });
          }}
          className="w-14 h-14 sm:w-16 sm:h-16 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden"
          style={{
            backgroundImage: 'url(/assets/img/favicon.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full animate-pulse flex items-center justify-center z-20">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {state.isOpen && (
        <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          state.isMinimized 
            ? 'w-72 h-16 sm:w-80' 
            : 'w-[min(85vw,500px)] h-[min(70vh,600px)] sm:w-[500px] sm:h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundImage: 'url(/assets/img/favicon.png)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Omega Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {state.stepHistory.length > 0 && (
                <button
                  onClick={() => dispatch({ type: 'GO_BACK' })}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title="Back"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              )}
              <button
                onClick={() => dispatch({ type: 'MINIMIZE_CHAT' })}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => dispatch({ type: 'CLOSE_CHAT' })}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {!state.isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto h-[calc(min(70vh,600px)-12rem)] sm:h-[450px]">
                {state.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[90%] sm:max-w-[85%] ${
                      message.isBot ? 'flex-row' : 'flex-row-reverse'
                    }`}>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isBot 
                          ? '' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      style={message.isBot ? {
                        backgroundImage: 'url(/assets/img/favicon.png)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      } : {}}
                      >
                        {!message.isBot && (
                          <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                      <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        
                        {/* Buttons */}
                        {message.type === 'buttons' && message.buttons && (
                          <div className="mt-3 space-y-2">
                            {message.buttons.map((button) => (
                              <button
                                key={button.id}
                                onClick={() => handleAction(button.id)}
                                className="w-full text-left px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors text-xs sm:text-sm"
                              >
                                {button.text}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Form */}
                        {message.type === 'form' && message.form && (
                          <form ref={formRef} className="mt-3 space-y-3">
                            {message.form.map((field) => (
                              <div key={field.id}>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {field.label}
                                </label>
                                <input
                                  type={field.type}
                                  name={field.id}
                                  placeholder={field.placeholder}
                                  required={field.required}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                                />
                              </div>
                            ))}
                            
                            {/* Consent checkbox */}
                            <div className="flex items-start space-x-2">
                              <input
                                type="checkbox"
                                name="consent"
                                required
                                className="mt-1"
                              />
                              <label className="text-xs text-gray-600">
                                {dialogData.contact_form.consent.text}{' '}
                                <a href="/privacy" className="text-blue-600 hover:underline">
                                  {dialogData.contact_form.consent.privacy_link}
                                </a>
                              </label>
                            </div>

                            {/* Form actions */}
                            <div className="flex space-x-2 pt-2">
                              <button
                                type="button"
                                onClick={() => handleAction('submit_lead')}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm flex items-center justify-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>{dialogData.contact_form.actions[0].text}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAction('back_to_budget')}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm flex items-center space-x-2"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                <span>{dialogData.contact_form.actions[1].text}</span>
                              </button>
                            </div>
                          </form>
                        )}

                        <p className={`text-xs mt-1 ${
                          message.isBot ? 'text-gray-500' : 'text-blue-100'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {state.isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div 
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundImage: 'url(/assets/img/favicon.png)',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                      >
                      </div>
                      <div className="px-3 py-2 sm:px-4 sm:py-2 rounded-2xl bg-gray-100">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OmegaChatbotFixed;
