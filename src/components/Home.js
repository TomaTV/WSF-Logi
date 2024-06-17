import React, { useState, useEffect, useCallback } from 'react';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faClipboardList, faQuestionCircle, faSchool, faTrophy, faGraduationCap, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      title: "Objectif de l'application",
      content: "Cette application a pour but de simplifier la gestion des évènements et des inscriptions pour les étudiants de la Web School Factory.",
      icon: faRocket,
    },
    {
      title: "Fonctionnalités",
      content: "Vous pouvez vous inscrire aux différents évènements, soumettre des formulaires pour le Week-End Challenge, et bien plus encore.",
      icon: faClipboardList,
    },
    {
      title: "Comment commencer",
      content: "Utilisez la barre de navigation pour accéder aux différentes sections de l'application. Si vous avez des questions, n'hésitez pas à contacter le support.",
      icon: faQuestionCircle,
    },
  ];

  const nextCard = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  }, [cards.length]);

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval);
  }, [nextCard]);

  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenue sur WSF-Logi</h2>
      <div className="home-content">
        <div className="card-section" onClick={nextCard}>
          <FontAwesomeIcon icon={cards[activeIndex].icon} size="3x" className="card-icon" />
          <h3>{cards[activeIndex].title}</h3>
          <p>{cards[activeIndex].content}</p>
          <div key={activeIndex} className="timer-bar"></div>
        </div>
      </div>
      <div className="events-section">
        <h3 className="section-title">Événements à venir</h3>
        <div className="events">
          <div className="event">
            <FontAwesomeIcon icon={faSchool} size="3x" />
            <h4>Journée Portes Ouvertes</h4>
            <p>19 Juin 2024</p>
          </div>
          <div className="event">
            <FontAwesomeIcon icon={faTrophy} size="3x" />
            <h4>Week-End Challenge</h4>
            <p>19-21 Juin 2024</p>
          </div>
          <div className="event">
            <FontAwesomeIcon icon={faGraduationCap} size="3x" />
            <h4>Remise des diplômes</h4>
            <p>19 Décembre 2024</p>
          </div>
        </div>
      </div>
      <div className="contact-section">
        <h3 className="section-title">Contact</h3>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter à l'adresse suivante :</p>
        <p><FontAwesomeIcon icon={faEnvelope} /> lemaildusupport@webschoolfactory.fr</p>
      </div>
    </div>
  );
}

export default Home;