// API Configuration
export const API_CONFIG = {
  EMAIL_API_URL: "https://saas.jiwe-holding.online/api/mailer/send-email/",
  // Replace with your actual token
  EMAIL_API_TOKEN: "Token 09770e66db667e0f551cfe5c75b05b54db2c098d",
};

// Email templates
export const EMAIL_TEMPLATES = {
  CONTACT: {
    sender_name: "OMEGA_RC",
    sujet_prefix: "Envoi depuis la page contact",
  },
  QUOTE: {
    sender_name: "OMEGA_RC", 
    sujet_prefix: "Demande de devis",
  }
};
