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

// Connexion à la base de données MongoDB
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════╗
    ║   🚀 Serveur démarré avec succès!          ║
    ╠════════════════════════════════════════════╣
    ║   📍 URL: http://localhost:${PORT}             ║
    ║   📚 API: http://localhost:${PORT}/api/etudiants║
    ╚════════════════════════════════════════════╝
    `);
});
// TODO: ajouter la documentation
// Ce commentaire est une erreur
// Modification temporaire
// Fonction utilitaire
