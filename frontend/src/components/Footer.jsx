import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        <div className="footer-left">
          <img src="/logo.jpeg" alt="HOOT Logo" className="footer-logo" />
          <p className="footer-copyright">© 2026 HOOT. All rights reserved.</p>
        </div>

        <div className="footer-center">
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About HOOT</a></li>
            <li><a href="#programs">HOOT Programs</a></li>
          </ul>
        </div>

        <div className="footer-right">
        </div>

      </div>
    </footer>
  );
};

export default Footer;
