import React, { useState, useEffect, useCallback } from "react";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faClipboardList, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Définir les éléments à afficher dans les cards
  const cards = [
    {
      title: "Objectif de l'application",
      content:
        "Cette application a pour but de simplifier la gestion des évènements et des inscriptions pour les étudiants de la Web School Factory.",
      icon: faRocket
    },
    {
      title: "Fonctionnalités",
      content:
        "Vous pouvez vous inscrire aux différents évènements, soumettre des formulaires pour le Week-End Challenge, et bien plus encore.",
      icon: faClipboardList
    },
    {
      title: "Comment commencer",
      content:
        "Utilisez la barre de navigation pour accéder aux différentes sections de l'application. Si vous avez des questions, n'hésitez pas à contacter le support.",
      icon: faQuestionCircle
    }
  ];

  // Fonction stable pour passer à la carte suivante
  const nextCard = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  }, [cards.length]);

  // Effet pour changer automatiquement de carte toutes les 5 secondes
  useEffect(() => {
    const interval = setTimeout(nextCard, 5000);
    return () => clearTimeout(interval);
  }, [activeIndex, nextCard]); // Utiliser nextCard comme dépendance stable

  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenue sur WSF-Logi</h2>
      <div className="home-content">
        <div className="card-section" onClick={nextCard}>
          <FontAwesomeIcon icon={cards[activeIndex].icon} size="3x" />
          <h3>{cards[activeIndex].title}</h3>
          <p>{cards[activeIndex].content}</p>
          <div key={activeIndex} className="timer-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;