// app.js — définit l'application, ne démarre rien
const express = require('express');
const etudiantRoutes = require('./routes/etudiantRoutes');

const app = express();
app.use(express.json());

// ============================================
// ROUTES
// ============================================

// Route d'accueil - pour tester que le serveur fonctionne
app.get('/', (req, res) => {
    res.json({
        message: '🎓 Bienvenue sur l\'API de gestion des étudiants!',
        version: '1.0.0',
        endpoints: {
            listeEtudiants: 'GET /api/etudiants',
            creerEtudiant: 'POST /api/etudiants',
            voirEtudiant: 'GET /api/etudiants/:id',
            modifierEtudiant: 'PUT /api/etudiants/:id',
            supprimerEtudiant: 'DELETE /api/etudiants/: id',
            parFiliere: 'GET /api/etudiants/filiere/: filiere'
        }
    });
});

// Route pour vérifier que l'API fonctionne
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: require('./package.json').version
  });
});

// Monter les routes des étudiants sur /api/etudiants
app.use('/api/etudiants', require('./routes/etudiantRoutes'));

// ============================================
// GESTION DES ERREURS
// ============================================

// Route 404 pour les URLs non trouvées
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} non trouvée`
    });
});

module.exports = app;