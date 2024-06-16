import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Form({ user }) {
  const [formData, setFormData] = useState({
    fullName: "",
    installation: "",
    brief: "",
    morning: "",
    noon: "",
    afternoon: "",
    evening: "",
    nextMorning: "",
    nextNoon: "",
    cleaning: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await fetch("http://localhost:5000/submit", {
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
          setTimeout(() => {
            navigate("/form-pizza");
          }, 2000);
          // Réinitialiser le formulaire après une soumission réussie
          setFormData({
            fullName: "",
            installation: "",
            brief: "",
            morning: "",
            noon: "",
            afternoon: "",
            evening: "",
            nextMorning: "",
            nextNoon: "",
            cleaning: "",
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(
          "Erreur lors de la soumission du formulaire: " + error.message
        );
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container2">
      <ToastContainer />
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
        <div>
          <label className="app-label">
            Installation :
            <select
              className="app-select"
              name="installation"
              value={formData.installation}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
              <option value="WEC/AMC">WEC/AMC</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Brief :
            <select
              className="app-select"
              name="brief"
              value={formData.brief}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
              <option value="WEC/AMC">WEC/AMC</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Matin :
            <select
              className="app-select"
              name="morning"
              value={formData.morning}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Viennoiserie">Viennoiserie</option>
              <option value="Café">Café</option>
              <option value="WEC/AMC">WEC/AMC</option>
              <option value="Pas présent">Pas présent</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Midi :
            <select
              className="app-select"
              name="noon"
              value={formData.noon}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Distribution">Distribution</option>
              <option value="Organisation">Organisation</option>
              <option value="WEC/AMC">WEC/AMC</option>
              <option value="Pas présent">Pas présent</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Après-midi :
            <select
              className="app-select"
              name="afternoon"
              value={formData.afternoon}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Aide">Aide</option>
              <option value="Dry-Run">Dry-Run</option>
              <option value="Crêpe">Crêpe</option>
              <option value="WEC/AMC">WEC/AMC</option>
              <option value="Pas présent">Pas présent</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Soir :
            <select
              className="app-select"
              name="evening"
              value={formData.evening}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Pizza">Pizza</option>
              <option value="Distribution">Distribution</option>
              <option value="WEC/AMC">WEC/AMC</option>
              <option value="Pas présent">Pas présent</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Matin (jour suivant) :
            <select
              className="app-select"
              name="nextMorning"
              value={formData.nextMorning}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Viennoiserie">Viennoiserie</option>
              <option value="Café">Café</option>
              <option value="WEC/AMC">WEC/AMC</option>
              <option value="Pas présent">Pas présent</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Midi (jour suivant) :
            <select
              className="app-select"
              name="nextNoon"
              value={formData.nextNoon}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Distribution">Distribution</option>
              <option value="Organisation">Organisation</option>
              <option value="WEC/AMC">WEC/AMC</option>
              <option value="Pas présent">Pas présent</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Rangement :
            <select
              className="app-select"
              name="cleaning"
              value={formData.cleaning}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
              <option value="WEC/AMC">WEC/AMC</option>
            </select>
          </label>
        </div>
        <button type="submit">Soumettre</button>{" "}
        {/* Changer le type de bouton */}
      </form>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} -
          <a
            href="https://github.com/TomaTV"
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            Toma
          </a>
          <span className="footer-separator">|</span>
          <a
            href="https://www.webschoolfactory.fr/"
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            Web School Factory
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Form;