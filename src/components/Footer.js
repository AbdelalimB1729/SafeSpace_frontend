// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>MySafeSpace © {new Date().getFullYear()} - All rights reserved</p>
        
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">My Blogs</Link></li>
          <li><Link to="/papers">My Papers</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
        
        <p>A student's personal space for sharing research and thoughts 🎓</p>
      </div>
    </footer>
  );
};

export default Footer;