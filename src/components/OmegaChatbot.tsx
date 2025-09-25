import { useEffect, useRef, useReducer } from 'react';
import { MessageCircle, X, Bot, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dialogFlowData from '../data/dialogFlow.json';
import { sendChatbotLead, type ChatbotLeadData } from '../config/chatbot';

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

const OmegaChatbot = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const navigate = useNavigate();
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

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('omega-chatbot-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.currentStep && parsed.messages?.length > 0) {
          dispatch({ type: 'SET_STEP', payload: parsed.currentStep });
          dispatch({ type: 'UPDATE_JOURNEY', payload: parsed.userJourney || {} });
          dispatch({ type: 'SET_LANGUAGE', payload: parsed.currentLanguage || 'fr' });
        }
      } catch (error) {
        console.error('Error loading chatbot state:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.currentStep !== 'welcome' && state.messages.length > 0) {
      localStorage.setItem('omega-chatbot-state', JSON.stringify({
        currentStep: state.currentStep,
        userJourney: state.userJourney,
        currentLanguage: state.currentLanguage,
        messages: state.messages
      }));
    }
  }, [state.currentStep, state.userJourney, state.currentLanguage, state.messages]);

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
        getLocalizedText('welcome.message'),
        true,
        'buttons',
        getLocalizedText('welcome.actions')
      );
      console.log('Welcome message created:', welcomeMessage);
      dispatch({ type: 'ADD_MESSAGE', payload: welcomeMessage });
    }
  }, [state.isOpen, state.messages.length, state.currentLanguage]);

  // Helper functions
  const getLocalizedText = (key: string) => {
    try {
      const keys = key.split('.');
      let value: any = dialogFlowData.languages[state.currentLanguage as keyof typeof dialogFlowData.languages];
      
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    } catch (error) {
      console.error('Error in getLocalizedText:', error);
      return key;
    }
  };

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
          getLocalizedText('profile_selection.message'),
          true,
          'buttons',
          getLocalizedText('profile_selection.actions')
        );
        dispatch({ type: 'ADD_MESSAGE', payload: profileMessage });
        break;

      case 'human_contact':
        navigate('/contact');
        dispatch({ type: 'CLOSE_CHAT' });
        break;

      case 'profile_marketing':
      case 'profile_sales':
      case 'profile_management':
      case 'profile_research':
      case 'profile_other':
        dispatch({ type: 'UPDATE_JOURNEY', payload: { profile: actionId, language: 'en' } });
        dispatch({ type: 'SET_STEP', payload: 'goal_selection' });
        const goalMessage = createMessage(
          getLocalizedText('goal_selection.message'),
          true,
          'buttons',
          getLocalizedText('goal_selection.actions')
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
        const services = getLocalizedText('services');
        const servicesMessage = createMessage(
          'Here are our research and consulting services:',
          true,
          'buttons',
          Object.keys(services).map((key: string) => ({
            id: `service_${key}`,
            text: services[key].title,
            icon: ''
          }))
        );
        dispatch({ type: 'ADD_MESSAGE', payload: servicesMessage });
        break;

      case 'service_research_analytics':
      case 'service_strategic_consulting':
      case 'service_nps_plus':
      case 'service_ua_research':
      case 'service_focus_groups':
        // Ajouter le service à la liste des services sélectionnés
        const currentServices = state.userJourney.services || [];
        const serviceKey = actionId.replace('service_', '');
        if (!currentServices.includes(serviceKey)) {
          dispatch({ type: 'UPDATE_JOURNEY', payload: { services: [...currentServices, serviceKey] } });
        }
        dispatch({ type: 'SET_STEP', payload: 'method_selection' });
        const methodMessage = createMessage(
          getLocalizedText('method_selection.message'),
          true,
          'buttons',
          getLocalizedText('method_selection.actions')
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
          getLocalizedText('sample_size.message'),
          true,
          'buttons',
          getLocalizedText('sample_size.actions')
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
          getLocalizedText('timeline.message'),
          true,
          'buttons',
          getLocalizedText('timeline.actions')
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
          getLocalizedText('budget.message'),
          true,
          'buttons',
          getLocalizedText('budget.actions')
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
        const contactMessage = createMessage(
          getLocalizedText('contact_form.message'),
          true,
          'form',
          undefined,
          Object.values(getLocalizedText('contact_form.fields'))
        );
        dispatch({ type: 'ADD_MESSAGE', payload: contactMessage });
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
      'start_journey': getLocalizedText('welcome.actions.0.text'),
      'human_contact': getLocalizedText('welcome.actions.1.text'),
      'profile_marketing': getLocalizedText('profile_selection.actions.0.text'),
      'profile_sales': getLocalizedText('profile_selection.actions.1.text'),
      'profile_management': getLocalizedText('profile_selection.actions.2.text'),
      'profile_research': getLocalizedText('profile_selection.actions.3.text'),
      'profile_other': getLocalizedText('profile_selection.actions.4.text'),
      'goal_brand_awareness': getLocalizedText('goal_selection.actions.0.text'),
      'goal_customer_satisfaction': getLocalizedText('goal_selection.actions.1.text'),
      'goal_market_research': getLocalizedText('goal_selection.actions.2.text'),
      'goal_product_development': getLocalizedText('goal_selection.actions.3.text'),
      'goal_competitor_analysis': getLocalizedText('goal_selection.actions.4.text'),
      'service_research_analytics': getLocalizedText('services.research_analytics.title'),
      'service_strategic_consulting': getLocalizedText('services.strategic_consulting.title'),
      'service_nps_plus': getLocalizedText('services.nps_plus.title'),
      'service_ua_research': getLocalizedText('services.ua_research.title'),
      'service_focus_groups': getLocalizedText('services.focus_groups.title'),
      'method_quantitative': getLocalizedText('method_selection.actions.0.text'),
      'method_qualitative': getLocalizedText('method_selection.actions.1.text'),
      'method_mixed': getLocalizedText('method_selection.actions.2.text'),
      'method_consultation': getLocalizedText('method_selection.actions.3.text'),
      'sample_small': getLocalizedText('sample_size.actions.0.text'),
      'sample_medium': getLocalizedText('sample_size.actions.1.text'),
      'sample_large': getLocalizedText('sample_size.actions.2.text'),
      'sample_consultation': getLocalizedText('sample_size.actions.3.text'),
      'timeline_urgent': getLocalizedText('timeline.actions.0.text'),
      'timeline_fast': getLocalizedText('timeline.actions.1.text'),
      'timeline_standard': getLocalizedText('timeline.actions.2.text'),
      'timeline_flexible': getLocalizedText('timeline.actions.3.text'),
      'budget_small': getLocalizedText('budget.actions.0.text'),
      'budget_medium': getLocalizedText('budget.actions.1.text'),
      'budget_large': getLocalizedText('budget.actions.2.text'),
      'budget_enterprise': getLocalizedText('budget.actions.3.text'),
      'budget_discuss': getLocalizedText('budget.actions.4.text'),
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
      alert('Please fill in all required fields');
      return;
    }

    dispatch({ type: 'UPDATE_JOURNEY', payload: { contactInfo, consent } });

    // Send to API
    try {
      const leadData: ChatbotLeadData = {
        ...state.userJourney as any,
        contactInfo,
        consent,
        timestamp: new Date().toISOString(),
        language: state.currentLanguage,
        journey: {
          steps: state.stepHistory,
          duration: Date.now() - (state.messages[0]?.timestamp.getTime() || Date.now())
        }
      };

      await sendChatbotLead(leadData);

      dispatch({ type: 'SET_STEP', payload: 'confirmation' });
      const confirmationMessage = createMessage(
        getLocalizedText('confirmation.message'),
        true,
        'buttons',
        getLocalizedText('confirmation.actions')
      );
      dispatch({ type: 'ADD_MESSAGE', payload: confirmationMessage });
      
      // Clear localStorage
      localStorage.removeItem('omega-chatbot-state');
    } catch (error) {
      console.error('Error sending lead:', error);
      alert('Error sending request. Please try again.');
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
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative"
        >
          <div className="relative">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 absolute -bottom-1 -right-1 bg-white text-blue-600 rounded-full p-0.5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
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
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
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
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.isBot ? <Bot className="w-4 h-4 sm:w-5 sm:h-5" /> : <User className="w-4 h-4 sm:w-5 sm:h-5" />}
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
                                {getLocalizedText('contact_form.consent.text')}{' '}
                                <a href="/privacy" className="text-blue-600 hover:underline">
                                  {getLocalizedText('contact_form.consent.privacy_link')}
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
                                <span>{getLocalizedText('contact_form.actions.0.text')}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAction('back_to_budget')}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm flex items-center space-x-2"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                <span>{getLocalizedText('contact_form.actions.1.text')}</span>
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
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
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

export default OmegaChatbot;
