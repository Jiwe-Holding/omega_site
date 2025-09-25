# Configuration de l'API Email

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec :

```
REACT_APP_EMAIL_API_TOKEN=your_actual_api_token_here
```

## Configuration de l'API

L'API d'envoi d'emails est configurée dans `src/config/api.ts` :

- **URL** : `https://saas.jiwe-holding.online/api/mailer/send-email/`
- **Méthode** : POST
- **Headers** : 
  - `Content-Type: application/json`
  - `Authorization: [VOTRE_TOKEN]`

## Structure des données

```json
{
  "sender_email": "email@utilisateur.com",
  "sender_name": "JIWE_SITE",
  "organisation": "Nom de l'entreprise",
  "sujet": "Envoi depuis la page contact - Type de projet",
  "message": "Message formaté avec toutes les informations",
  "noms": ["Nom", "Nom"]
}
```

## Utilisation

1. Remplacez `••••••` par votre vrai token dans `src/config/api.ts`
2. Ou configurez la variable d'environnement `REACT_APP_EMAIL_API_TOKEN`
3. L'API sera utilisée automatiquement dans les formulaires de contact et devis
