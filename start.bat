@echo off

REM Démarrage du serveur Node.js
echo Démarrage du serveur Node.js...
start cmd /c node server.js

REM Démarrage de Webpack pour l'application React
echo Démarrage de Webpack pour l'application React...
start cmd /c npm start

REM Fermeture de la console
exit