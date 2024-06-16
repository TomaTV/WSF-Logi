import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Form from "./components/FormWEC";
import FormRDD from "./components/FormRDD";
import FormPizza from "./components/FormPizza";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPizzaSlice, faClipboard, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles/app.css";
import "./styles/nav.css";

const AppRoutes = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <>
      {user && (
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src="/img/webschoolfactory-b.svg" alt="Logo de l'école" />
          </div>
          <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
            <ul className={menuOpen ? 'open' : ''}>
              <li>
                <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                  <FontAwesomeIcon icon={faHome} /> Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/form-wec" className={({ isActive }) => (isActive ? "active" : "")}>
                  <FontAwesomeIcon icon={faClipboard} /> Formulaire WEC
                </NavLink>
              </li>
              <li>
                <NavLink to="/form-pizza" className={({ isActive }) => (isActive ? "active" : "")}>
                  <FontAwesomeIcon icon={faPizzaSlice} /> Participant WEC
                </NavLink>
              </li>
              <li>
                <NavLink to="/form-rdd" className={({ isActive }) => (isActive ? "active" : "")}>
                  <FontAwesomeIcon icon={faClipboard} /> Formulaire RDD
                </NavLink>
              </li>
            </ul>
            <div className="navbar-profile" onClick={toggleProfileMenu}>
              <img className="profile-picture" src={user.profilePicture || "/img/logo.png"} alt={`Profil de ${user.name}`} />
              <div className="profile-details">
                {profileMenuOpen && (
                  <ul className="profile-menu active">
                    <span className="profile-name">{user.name}</span><br></br>
                    <span className="profile-name">{user.email}</span>
                    <li>
                      <NavLink to="/" onClick={() => setUser(null)} className={({ isActive }) => (isActive ? "active" : "")}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/home" element={user ? <Home /> : <Login setUser={setUser} />} />
        <Route path="/form-wec" element={user ? <Form user={user} /> : <Login setUser={setUser} />} />
        <Route path="/form-pizza" element={user ? <FormPizza user={user} /> : <Login setUser={setUser} />} />
        <Route path="/form-rdd" element={user ? <FormRDD user={user} /> : <Login setUser={setUser} />} />
      </Routes>
    </>
  );
};
function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">
        <AppRoutes user={user} setUser={setUser} />
      </div>
    </Router>
  );
}

export default App;