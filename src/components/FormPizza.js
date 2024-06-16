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
              <option value="Margherita">Margherita</option>
              <option value="Pepperoni">Pepperoni</option>
              <option value="Supreme">Supreme</option>
              <option value="Hawaiian">Hawaiian</option>
              <option value="Texas BBQ">Texas BBQ</option>
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