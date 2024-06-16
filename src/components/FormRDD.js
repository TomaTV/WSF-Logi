import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CHAMPS = ['preparation', 'vestiaire', 'rushVestiaire', 'roulement', 'rushRoulement'];
const LIMITES = [4, 4, 4, 2, 4]; // Définir les limites pour chaque champ

const START_DATE = '2024-12-10'; // 10 décembre 2024
const END_DATE = '2024-12-19';   // 19 décembre 2024

const isDateInRange = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
};

// Horaires
const HORAIRES = {
  preparation: "13h-16h",
  vestiaire: "13h-16h",
  rushVestiaire: "18h-19h",
  roulement: "19h-20h",
  rushRoulement: "20h-22h",
};

const FormRDD = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    preparation: "",
    vestiaire: "",
    rushVestiaire: "",
    roulement: "",
    rushRoulement: "",
  });

  const [limits, setLimits] = useState({
    preparation: false,
    vestiaire: false,
    rushVestiaire: false,
    roulement: false,
    rushRoulement: false,
  });

  const [counts, setCounts] = useState({
    preparation: 0,
    vestiaire: 0,
    rushVestiaire: 0,
    roulement: 0,
    rushRoulement: 0,
  });

  const [initialLimitsFetched, setInitialLimitsFetched] = useState(false);

  const fetchInitialLimits = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/get-limits");
      if (response.ok) {
        const { preparation, vestiaire, rushVestiaire, roulement, rushRoulement, counts } = await response.json();
        setLimits({ preparation, vestiaire, rushVestiaire, roulement, rushRoulement });
        setCounts(counts);
        setInitialLimitsFetched(true);
      } else {
        throw new Error('Erreur lors de la récupération des limites : ' + response.statusText);
      }
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    fetchInitialLimits();

    const interval = setInterval(fetchInitialLimits, 10000);
    return () => clearInterval(interval);
  }, [fetchInitialLimits]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch("http://localhost:5000/submit-rdd", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        resetForm();
        if (initialLimitsFetched) {
          fetchInitialLimits();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === 'Oui' && limits[name]) {
      toast.error(`La limite pour "${name}" est atteinte.`);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      preparation: "",
      vestiaire: "",
      rushVestiaire: "",
      roulement: "",
      rushRoulement: "",
    });
  };

  const handleError = (error) => {
    console.error(error);
    if (error.message.includes('rateLimitExceeded')) {
      toast.error("Limite de requêtes Google Sheets dépassée. Réessayez plus tard.");
    } else {
      toast.error("Erreur lors de la récupération des limites : " + error.message);
    }
  };

  const isBlocked = !isDateInRange(START_DATE, END_DATE);

  return (
    <div className="form-container2">
      <ToastContainer />
      {isBlocked && (
        <div className="notification-blocked">
          Les inscriptions ne sont pas encore ouvertes. Veuillez revenir entre le 10 décembre et le 19 décembre.
        </div>
      )}
      <div className={`form-content ${isBlocked ? 'blocked' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="app-label">
              Nom complet :
              <input
                type="text"
                name="fullName"
                className="app-input"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Exemple : Thomas DEVULDER"
                required
              />
            </label>
          </div>
          {CHAMPS.map(champ => (
          <div key={champ}>
            <label className="app-label">
              {`${champ.charAt(0).toUpperCase() + champ.slice(1)} ${HORAIRES[champ]} [${counts[champ]}/${LIMITES[CHAMPS.indexOf(champ)]}] :`}
              <select
                className="app-select"
                name={champ}
                value={formData[champ]}
                onChange={handleChange}
                required
                disabled={limits[champ] && formData[champ] === 'Oui'} // Désactive 'Oui' si la limite est atteinte
              >
                <option value="">Sélectionner</option>
                <option value="Oui" disabled={limits[champ]}>Oui</option> {/* Désactiver 'Oui' si la limite est atteinte */}
                <option value="Non">Non</option>
              </select>
            </label>
          </div>
        ))}
          <button type="submit">Soumettre</button>
        </form>
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} -
            <a href="https://github.com/TomaTV" className="footer-link" target="_blank" rel="noreferrer">
              Toma
            </a>
            <span className="footer-separator">|</span>
            <a href="https://www.webschoolfactory.fr/" className="footer-link" target="_blank" rel="noreferrer">
              Web School Factory
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default FormRDD;