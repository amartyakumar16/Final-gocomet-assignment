// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import './Header.css'; // Make sure you have the CSS file for styling

function Header() {
  return (
    <header className="header">
      <div className="logo">
       <img src={logo} alt = "logo"></img>
      </div>
      <nav className="navigation">
        <Link to="/">Homes</Link>
        <Link to="/explore-hotels">Hotels</Link>
        <Link to="/explore-hotels">Places</Link>
      </nav>
    </header>
  );
}

export default Header;
