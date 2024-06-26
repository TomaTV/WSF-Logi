import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormPizza({ user }) {
  const [formData, setFormData] = useState({
    fullName: "",
    pizza: "",
    allergie: "",
    vegetarien: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await fetch("http://localhost:5000/submit-pizza", {
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
          // Réinitialiser le formulaire après une soumission réussie
          setFormData({
            fullName: "",
            pizza: "",
            allergie: "",
            vegetarien: "",
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Erreur lors de la soumission du formulaire: " + error.message);
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
            Pizza :
            <select
              className="app-select"
              name="pizza"
              value={formData.pizza}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="4 Fromages">4 Fromages (mozza, chèvre, emmental, Fourme d'Ambert) - Veggie</option>
              <option value="Chèvre Miel">Chèvre miel - Veggie</option>
              <option value="Marguerita">Marguerita - Veggie</option>
              <option value="Vegan Marguerita">Vegan Marguerita (sans mozza)</option>
              <option value="Classique Jambon">Classique Jambon</option>
              <option value="Originale Pepperoni">Originale Pepperoni</option>
              <option value="Spéciale Merguez">Spéciale Merguez</option>
              <option value="Bacon Groovy">Bacon Groovy</option>
              <option value="Cannibale">Cannibale (poulet + merguez + bœuf)</option>
              <option value="Deluxe">Deluxe (Bœuf)</option>
              <option value="Diavola">Diavola (Bœuf)</option>
              <option value="Diavola Pepperoni">Diavola Pepperoni</option>
              <option value="Extravaganzza">Extravaganzza (pepperoni, jambon, bœuf)</option>
              <option value="Forestière">Forestière (lardons, jambon)</option>
              <option value="Hypnotika">Hypnotika (merguez, poulet)</option>
              <option value="Indienne">Indienne (poulet)</option>
              <option value="Kebab">Kebab</option>
              <option value="Saumoneta">Saumoneta (saumon)</option>
            </select>
          </label>
        </div>
        <div>
          <label className="app-label">
            Allergie :
            <input
              type="text"
              name="allergie"
              className="app-input"
              value={formData.allergie}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className="app-label">
            Végétarien(ne) :
            <select
              className="app-select"
              name="vegetarien"
              value={formData.vegetarien}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </label>
        </div>
        <button type="submit">Soumettre</button> {/* Changer le type de bouton */}
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

export default FormPizza;