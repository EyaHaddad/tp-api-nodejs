// ============================================
// IMPORTS
// ============================================
// Serveur Express principal - Application de gestion des étudiants
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// ============================================
// CONFIGURATION
// ============================================

// Charger les variables d'environnement depuis . env
dotenv.config();

const PORT = process.env.PORT || 3000;

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const startMessage = `
    ╔════════════════════════════════════════════╗
    ║   🚀 Serveur démarré avec succès!          ║
    ╠════════════════════════════════════════════╣
    ║   📍 URL: http://localhost:${PORT}             ║
    ║   📚 API: http://localhost:${PORT}/api/etudiants║
    ╚════════════════════════════════════════════╝
    `;

throw new Error('Erreur intentionnelle pour tester le pipeline');

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(startMessage);
  });
});
// TODO: ajouter la documentation
// Ce commentaire est une erreur
// Modification temporaire
// Fonction utilitaire
