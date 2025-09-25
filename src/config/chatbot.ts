// Configuration pour l'API du chatbot
export const CHATBOT_CONFIG = {
  API_ENDPOINT: '/api/chatbot-lead',
  TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 seconde
};

// Types pour l'API
export interface ChatbotLeadData {
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
  timestamp: string;
  journey: {
    steps: string[];
    duration: number; // en millisecondes
  };
}

// Fonction pour envoyer les données du lead
export const sendChatbotLead = async (data: ChatbotLeadData): Promise<boolean> => {
  try {
    const response = await fetch(CHATBOT_CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error sending chatbot lead:', error);
    throw error;
  }
};

// Fonction pour générer l'email de lead pour Omega
export const generateLeadEmailContent = (data: ChatbotLeadData): string => {
  const profileText = data.profile.replace('profile_', '').replace('_', ' ');
  const goalText = data.goal.replace('goal_', '').replace('_', ' ');
  
  return `
Lead Chatbot – ${profileText} – ${goalText} – ${new Date(data.timestamp).toLocaleDateString()}

DÉTAILS DU PARCOURS:
- Langue: ${data.language}
- Profil: ${profileText}
- Objectif: ${goalText}
- Méthode: ${data.method.replace('method_', '').replace('_', ' ')}
- Taille d'échantillon: ${data.sampleSize.replace('sample_', '').replace('_', ' ')}
- Délai: ${data.timeline.replace('timeline_', '').replace('_', ' ')}
- Budget: ${data.budget.replace('budget_', '').replace('_', ' ')}

COORDONNÉES:
- Nom: ${data.contactInfo.name}
- Email: ${data.contactInfo.email}
- Téléphone: ${data.contactInfo.phone || 'Non fourni'}
- Entreprise: ${data.contactInfo.company || 'Non fournie'}

CONSENTEMENT: ${data.consent ? 'Oui' : 'Non'}

DURÉE DU PARCOURS: ${Math.round(data.journey.duration / 1000 / 60)} minutes
ÉTAPES: ${data.journey.steps.join(' → ')}

Timestamp: ${data.timestamp}
  `.trim();
};

// Fonction pour générer l'email de confirmation pour le prospect
export const generateConfirmationEmailContent = (data: ChatbotLeadData): string => {
  const isFrench = data.language === 'fr';
  
  if (isFrench) {
    return `
Bonjour ${data.contactInfo.name},

Merci pour votre intérêt pour les services d'Omega Research & Consulting !

RÉCAPITULATIF DE VOTRE DEMANDE:
- Profil: ${data.profile.replace('profile_', '').replace('_', ' ')}
- Objectif: ${data.goal.replace('goal_', '').replace('_', ' ')}
- Méthode préférée: ${data.method.replace('method_', '').replace('_', ' ')}
- Budget: ${data.budget.replace('budget_', '').replace('_', ' ')}

Notre équipe vous contactera dans les 24 heures pour discuter de vos besoins spécifiques.

Cordialement,
L'équipe Omega Research & Consulting
    `.trim();
  } else {
    return `
Hello ${data.contactInfo.name},

Thank you for your interest in Omega Research & Consulting services!

REQUEST SUMMARY:
- Profile: ${data.profile.replace('profile_', '').replace('_', ' ')}
- Objective: ${data.goal.replace('goal_', '').replace('_', ' ')}
- Preferred method: ${data.method.replace('method_', '').replace('_', ' ')}
- Budget: ${data.budget.replace('budget_', '').replace('_', ' ')}

Our team will contact you within 24 hours to discuss your specific needs.

Best regards,
Omega Research & Consulting Team
    `.trim();
  }
};
