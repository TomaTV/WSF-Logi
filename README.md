# Interface Web pour l'Association de l'École

Ce projet consiste en une interface web permettant aux membres de l'association de l'école de s'inscrire à des événements organisés par l'association.

## Installation

1. Clonez ce dépôt sur votre machine locale.
```bash
git clone https://github.com/TomaTV/WSF-Logi.git
cd your-repo-name
```
2. Installez les dépendances en exécutant `npm install`.
3. Configurez les clés d'API et les identifiants nécessaires.

   - Accédez à la [Console Google Cloud](https://console.cloud.google.com/) et créez un projet.
   - Activez les API nécessaires pour votre projet, telles que l'API Google Sheets.
   - Configurez les identifiants OAuth2 pour permettre l'authentification avec votre application. Assurez-vous d'ajouter les URL de redirection appropriées, notamment pour le développement en local.
   - Une fois les identifiants OAuth2 créés, assurez-vous de les configurer dans votre application.
4. Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :
```bash
PORT="5000"
CLIENT_ID="Votre Client ID API"
REACT_APP_GOOGLE_CLIENT_ID="ID de Google Client qui fini par .apps.googleusercontent.com"
SHEET_ID="ID de Google Sheet"
RANGE="Exemple : Feuille1:A:T"
RANGE_RDD="Exemple : Feuille1:A:T"
RANGE_PIZZA="Exemple : Feuille1:A:T"
KEYFILE="Chemin vers ton fichier JSON de compte de service Google"
```

## Utilisation

1. Lancez le serveur Node en exécutant `node server.js`.
2. Lancez l'application en exécutant `npm start`.
3. Connectez-vous à l'application à l'aide de votre compte Google associé à l'école --> localhost:3000
4. Remplissez le formulaire d'inscription aux événements en fonction de votre disponibilité et de vos préférences.
5. Soumettez le formulaire pour vous inscrire aux événements sélectionnés.

### Exemples

![Capture d'écran de l'interface utilisateur](/public/img/screenshot.JPG)

## Contributions

Les contributions à ce projet sont les bienvenues ! Veuillez ouvrir une issue pour discuter des changements proposés.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Auteurs

- Thomas DEVULDER

## Contact

Pour toute question ou commentaire, veuillez contacter Thomas DEVULDER à l'adresse t_devulder@etu-webschoolfactory.fr
