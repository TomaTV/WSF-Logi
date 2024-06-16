const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const cors = require('cors');
const app = express();
const PORT = process.env.PORT_SERVER || 5000;

dotenv.config();

// Middlewares nombre de requêtes
const rateLimit = require('express-rate-limit');

// Configuration de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre de 15 minutes
});

// Configuration de Helmet
const helmet = require('helmet'); // Middlewares HTTP
const contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'strict-dynamic'", 'https:', 'http:'],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", 'https://apis.google.com'],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
};

app.use(helmet({
  contentSecurityPolicy: contentSecurityPolicy,
  frameguard: {
    action: 'deny',
  },
  featurePolicy: false
}));

// Middlewares
app.use(limiter);
app.use(bodyParser.json());
app.use(cors());

const SHEET_ID = process.env.SHEET_ID;
const RANGE = process.env.RANGE;
const RANGE_RDD = process.env.RANGE_RDD;
const RANGE_PIZZA = process.env.RANGE_PIZZA;

// Fonctions pour afficher des messages console colorés
const colorize = (message, color) => `\x1b[${color}m${message}\x1b[0m`;
const white = (message) => colorize(message, '37');
const green = (message) => colorize(message, '32');
const red = (message) => colorize(message, '31');
const orange = (message) => colorize(message, '33');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.KEYFILE, // Chemin vers ton fichier JSON de compte de service
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Fonction pour récupérer les données actuelles du tableau Google Sheets
async function getSheetData(range) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: range,
  });

  return response.data.values;
}

app.get('/submit', (req, res) => {
  res.status(405).send('Méthode non autorisée. Veuillez utiliser la méthode POST pour soumettre le formulaire.');
});

app.post('/submit', async (req, res) => {
  const { fullName, installation, brief, morning, noon, afternoon, evening, nextMorning, nextNoon, cleaning } = req.body;

  console.log(white('[\x1b[32mGOOGLE\x1b[37m] Données du formulaire reçues')); // Affichage d'un message console indiquant la réception des données du formulaire

  try {
    const client = await auth.getClient();
    console.log(white('[\x1b[32mGOOGLE\x1b[37m] Authentification réussie')); // Ajout d'un console.log pour vérifier si l'authentification avec Google Sheets fonctionne correctement
    const sheets = google.sheets({ version: 'v4', auth: client });

    const request = {
      spreadsheetId: SHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [fullName, installation, brief, morning, noon, afternoon, evening, nextMorning, nextNoon, cleaning]
        ],
      },
    };

    const response = await sheets.spreadsheets.values.append(request);
    console.log(white('[GOOGLE-WEC] Réponse de Google Sheets reçue'));

    if (response.status === 200) {
      const successMessage = 'Formulaire soumis avec succès !';
      console.log(white(successMessage));
      res.status(200).json({ message: successMessage });
    } else {
      const errorMessage = '[ERROR] Erreur lors de la soumission du formulaire.';
      console.log(white(errorMessage));
      res.status(500).json({ message: errorMessage });
    }
  } catch (error) {
    const errorMessage = '[ERROR] Erreur lors de la soumission du formulaire: ' + error;
    console.error(white(errorMessage));
    res.status(500).json({ message: errorMessage });
  }
});

app.get('/submit-rdd', (req, res) => {
  res.status(405).send('Méthode non autorisée. Veuillez utiliser la méthode POST pour soumettre le formulaire.');
});

app.get('/get-limits', async (req, res) => {
  try {
    // Récupérer les données actuelles de la feuille de calcul pour les limites
    const currentData = await getSheetData(RANGE_RDD);

    // Calculer les limites actuelles
    const countPreparationOui = currentData.filter(row => row[1] === 'Oui').length;
    const countVestiaireOui = currentData.filter(row => row[2] === 'Oui').length;
    const countRushVestiaireOui = currentData.filter(row => row[3] === 'Oui').length;
    const countRoulementOui = currentData.filter(row => row[4] === 'Oui').length;
    const countRushRoulementOui = currentData.filter(row => row[5] === 'Oui').length;

    // Définir les limites pour chaque champ
    const limitePreparation = 4;
    const limiteVestiaire = 4;
    const limiteRushVestiaire = 4;
    const limiteRoulement = 2;
    const limiteRushRoulement = 4;

    // Envoyer les limites et les comptes au client
    res.status(200).json({
      preparation: countPreparationOui >= limitePreparation,
      vestiaire: countVestiaireOui >= limiteVestiaire,
      rushVestiaire: countRushVestiaireOui >= limiteRushVestiaire,
      roulement: countRoulementOui >= limiteRoulement,
      rushRoulement: countRushRoulementOui >= limiteRushRoulement,
      counts: {
        preparation: countPreparationOui,
        vestiaire: countVestiaireOui,
        rushVestiaire: countRushVestiaireOui,
        roulement: countRoulementOui,
        rushRoulement: countRushRoulementOui,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des limites:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des limites.' });
  }
});

const LIMITES = [4, 4, 4, 2, 4];  // Tableau des limites pour chaque champ
const CHAMPS = ['Préparation', 'Vestiaire', 'Rush Vestiaire', 'Roulement', 'Rush Roulement'];  // Noms des champs

app.post('/submit-rdd', async (req, res) => {
  const { fullName, preparation, vestiaire, rushVestiaire, roulement, rushRoulement } = req.body;

  console.log('[GOOGLE-RDD] Données du formulaire reçues');

  try {

      // Vérifier que tous les champs requis sont présents et non vides
      if (!fullName || !preparation || !vestiaire || !rushVestiaire || !roulement || !rushRoulement) {
        throw new Error('Tous les champs doivent être remplis.');
      }
  
      // Valider les valeurs de chaque champ selon vos règles métier
      if (![preparation, vestiaire, rushVestiaire, roulement, rushRoulement].every(value => value === 'Oui' || value === 'Non')) {
        throw new Error('Les valeurs des champs doivent être "Oui" ou "Non".');
      }
    // Récupérer les données actuelles de la feuille de calcul
    const currentData = await getSheetData(RANGE_RDD);

    // Fonction pour vérifier si une limite est atteinte pour un champ donné
    const isLimiteAtteinte = (count, limite, champ) => {
      if (count >= limite && champ === 'Oui') {
        throw new Error(`La limite pour "${champ}" est atteinte.`);
      }
    };

    // Vérifier les limites pour chaque champ
    LIMITES.forEach((limite, index) => {
      isLimiteAtteinte(
        currentData.filter(row => row[index + 1] === 'Oui').length,
        limite,
        CHAMPS[index]
      );
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const request = {
      spreadsheetId: SHEET_ID,
      range: RANGE_RDD,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [fullName, preparation, vestiaire, rushVestiaire, roulement, rushRoulement]
        ],
      },
    };

    const response = await sheets.spreadsheets.values.append(request);
    console.log('[GOOGLE-RDD] Réponse de Google Sheets reçue');

    if (response.status === 200) {
      const successMessage = 'Formulaire soumis avec succès !';
      console.log(successMessage);
      res.status(200).json({ message: successMessage });
    } else {
      const errorMessage = 'Erreur lors de la soumission du formulaire.';
      console.log(errorMessage);
      res.status(500).json({ message: errorMessage });
    }
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error);
    res.status(500).json({ message: 'Erreur lors de la soumission du formulaire.' });
  }
});

app.get('/submit-pizza', (req, res) => {
  res.status(405).send('Méthode non autorisée. Veuillez utiliser la méthode POST pour soumettre le formulaire.');
});

app.post('/submit-pizza', async (req, res) => {
  const { fullName, pizza, allergie, vegetarien } = req.body;

  console.log(white('[\x1b[32mGOOGLE-PIZZA\x1b[37m] Données du formulaire reçues')); // Affichage d'un message console indiquant la réception des données du formulaire

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const request = {
      spreadsheetId: SHEET_ID,
      range: RANGE_PIZZA,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [fullName, pizza, allergie, vegetarien]
        ],
      },
    };

    const response = await sheets.spreadsheets.values.append(request);
    console.log(white('[\x1b[32mGOOGLE-PIZZA\x1b[37m] Réponse de Google Sheets reçue')); // Ajout d'un console.log pour afficher la réponse de Google Sheets

    // Vérification de la réussite de la requête
    if (response.status === 200) {
      const successMessage = 'Formulaire soumis avec succès !';
      console.log(white(successMessage)); // Réponse en cas de succès
      res.status(200).json({ message: successMessage });
    } else {
      const errorMessage = '[GOOGLE-PIZZA] Erreur lors de la soumission du formulaire.';
      console.log(white(errorMessage));
      res.status(500).json({ message: errorMessage }); // Réponse en cas d'échec
    }
  } catch (error) {
    const errorMessage = '[GOOGLE-PIZZA] Erreur lors de la soumission du formulaire: ' + error;
    console.error(white(errorMessage));
    res.status(500).json({ message: errorMessage }); // Gestion des erreurs
  }
});

app.listen(PORT, () => {
  console.log(`[\x1b[33mSERVER\x1b[37m] fonctionnel sur le port : ${PORT}`);
});