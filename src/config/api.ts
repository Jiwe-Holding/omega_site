// API Configuration
export const API_CONFIG = {
  EMAIL_API_URL: "https://saas.jiwe-holding.online/api/mailer/send-email/",
  // Replace with your actual token
  EMAIL_API_TOKEN: "Token 0cda37712f67c6a5417578f74b619eddc0fe8906",
};

// Email templates
export const EMAIL_TEMPLATES = {
  CONTACT: {
    sender_name: "JIWE_SITE",
    sujet_prefix: "Envoi depuis la page contact",
  },
  CHATBOT: {
    sender_name: "JIWE_SITE",
    sujet_prefix: "Lead Chatbot",
  },
  QUOTE: {
    sender_name: "JIWE_SITE", 
    sujet_prefix: "Demande de devis",
  }
};
