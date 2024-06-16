import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleManualSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleSignIn = async (googleUser) => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
  
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: googleUser.getBasicProfile().getEmail(), password: idToken }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCredentialResponse = useCallback(
    (response) => {
      const data = jwtDecode(response.credential);
  
      if (data.email.endsWith("@etu-webschoolfactory.fr")) {
        setUser({...data,});
        navigate("/home");
      } else {
        console.log("Erreur : vous devez utiliser un email de Web School Factory.");
        console.error(response.error);
      }
    },
    [setUser, navigate]
  );

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        
        const options = {
          theme: "outline",
          width: 150,
          text: "continue_with",
          size: "large",
          shape: "PILL",
          locale: "fr",
        };

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          options
        );
      }
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      window.addEventListener("load", initializeGoogleSignIn);
    }

    return () => {
      window.removeEventListener("load", initializeGoogleSignIn);
    };
  }, [handleCredentialResponse]);

  return (
    <div className="Login">
      <div className="login-container">
        <aside className="blue-bar">
          <img src="/img/webschoolfactory.svg" alt="Logo de l'école" />
        </aside>
        <section className="login-form">
          <h2 className="welcome-title">
            Bienvenue sur WSF-Logi <span className="beta-text">(beta)</span>
          </h2>
          <form onSubmit={handleManualSignIn || handleGoogleSignIn}>
            <label htmlFor="email">Identifiant</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                className="fa-2x password-icon"
                onClick={handleTogglePasswordVisibility}
              />
            </div>

            <div className="remember-me-container">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>

            <p className="forgot-password">
              <a
                href="https://www.my-webschoolfactory.fr"
                target="_blank"
                rel="noreferrer"
              >
                Mot de passe oublié / Première connexion
              </a>
            </p>
            <div className="form-container" id="btn-google">
              <div id="googleSignInButton"></div>
            </div>
            <button type="submit">CONNEXION</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;