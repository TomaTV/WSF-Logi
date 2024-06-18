import React, { useState } from "react";
import "../styles/settings.css";

function Settings({ user }) {
  // Exemple de gestion de l'état pour une option de paramètre
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState("fr");

  // Fonction de gestion pour activer/désactiver les notifications
  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Fonction de gestion pour activer/désactiver le mode sombre
  const handleDarkModeChange = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  // Fonction de gestion pour changer la langue
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="settings-container">
      <h1>Paramètres</h1>

      {/* Section Notifications */}
      <section className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleNotificationsChange}
            />{" "}
            Recevoir des notifications
          </label>
        </div>
      </section>

      {/* Section Dark Mode */}
      <section className="settings-section">
        <h2>Dark Mode</h2>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={darkModeEnabled}
              onChange={handleDarkModeChange}
            />{" "}
            Activer le mode sombre
          </label>
        </div>
      </section>

      {/* Section Language */}
      <section className="settings-section-langage">
        <h2>Langage</h2>
        <div className="settings-item">
          <select value={language} onChange={handleLanguageChange}>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </section>

      {/* Section Account */}
      <section className="settings-section">
        <h2>Compte</h2>
        <div className="settings-item">
          <p>Prénom NOM : <strong>{user.name}</strong></p>
          <p>Email : <strong>{user.email}</strong></p>
        </div>
      </section>

      {/* Section Footer */}
      <footer className="settings-footer">
        <p>&copy; {new Date().getFullYear()} - Web School Factory</p>
      </footer>
    </div>
  );
}

export default Settings;
