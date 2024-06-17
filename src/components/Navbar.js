import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPizzaSlice, faClipboard, faSignOutAlt, faGear } from '@fortawesome/free-solid-svg-icons';
import '../styles/nav.css';

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.navbar-profile')) {
      setProfileMenuOpen(false);
    }
    if (!event.target.closest('.navbar') && !event.target.closest('.hamburger-menu')) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src="/img/webschoolfactory-b.svg" alt="Logo de l'école" />
      </div>
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul className={menuOpen ? 'open' : ''}>
          <li>
            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FontAwesomeIcon icon={faHome} /> Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/form-wec" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FontAwesomeIcon icon={faClipboard} /> Formulaire WEC
            </NavLink>
          </li>
          <li>
            <NavLink to="/form-pizza" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FontAwesomeIcon icon={faPizzaSlice} /> Participant WEC
            </NavLink>
          </li>
          <li>
            <NavLink to="/form-rdd" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FontAwesomeIcon icon={faClipboard} /> Formulaire RDD
            </NavLink>
          </li>
        </ul>
        <div className="navbar-profile" onClick={toggleProfileMenu}>
          <img className="profile-picture" src={user.profilePicture || '/img/logo.png'} alt={`Profil de ${user.name}`} />
          <div className="profile-details">
            {profileMenuOpen && (
              <ul className="profile-menu active">
                <span className="profile-name">{user.name}</span><br />
                <span className="profile-email">{user.email}</span>
                <li>
                <NavLink to="/settings">
                  <FontAwesomeIcon icon={faGear} /> Paramètres
                </NavLink>
                </li>
                <li>
                  <NavLink to="/" onClick={() => setUser(null)} className={({ isActive }) => (isActive ? 'active' : '')}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;