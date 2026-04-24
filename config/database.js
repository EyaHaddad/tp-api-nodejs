// Importer mongoose pour se connecter à MongoDB
const mongoose = require('mongoose');

let memoryServer;

const startMemoryDatabase = async () => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri();
    const conn = await mongoose.connect(memoryUri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
    });
    console.log('⚡ MongoDB en mémoire démarré (mode fallback)');
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
};

// Fonction asynchrone de connexion à la base de données
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    const useMemoryDb = process.env.USE_MEMORY_DB === 'true';
    const allowMemoryFallback = process.env.ALLOW_MEMORY_FALLBACK === 'true';

    // Si USE_MEMORY_DB=true ou aucune URI fournie, utiliser MongoDB en mémoire
    if (!uri || useMemoryDb) {
        await startMemoryDatabase();
        return;
    }

    try {
        // Tenter la connexion avec l'URI défini
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000
        });

        // Si la connexion réussit, afficher un message
        console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    } catch (error) {
        if (error.code === 'ECONNREFUSED' && allowMemoryFallback) {
            console.warn(`⚠️ MongoDB indisponible sur ${uri}. Bascule vers MongoDB en mémoire.`);
            await startMemoryDatabase();
            return;
        }

        // Si la connexion échoue pour une autre raison, arrêter le programme
        console.error(`❌ Erreur de connexion MongoDB: ${error.message}`);
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Démarrez MongoDB localement, ou définissez USE_MEMORY_DB=true dans .env.');
        }
        process.exit(1);
    }
};

// Exporter la fonction pour l'utiliser ailleurs
module.exports = connectDB;