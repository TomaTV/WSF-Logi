import React from "react";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenue sur notre application</h2>
      <div className="home-content">
        <div className="section">
          <h3>Objectif de l'application</h3>
          <p>
            Cette application a pour but de simplifier la gestion des évènements et des inscriptions pour les étudiants de la Web School Factory.
          </p>
        </div>
        <div className="section">
          <h3>Fonctionnalités</h3>
          <p>
            Vous pouvez vous inscrire aux différents évènements, soumettre des formulaires pour le Week-End Challenge, et bien plus encore.
          </p>
        </div>
        <div className="section">
          <h3>Comment commencer</h3>
          <p>
            Utilisez la barre de navigation pour accéder aux différentes sections de l'application. Si vous avez des questions, n'hésitez pas à contacter le support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;