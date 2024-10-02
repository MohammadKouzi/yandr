import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row row">
          {/* GlamStone Info Section */}
          <div className="footer-column col-12 col-sm-12 col-md-4">
            <h3>GlamStone</h3>
            <p>
              At GlamStone, we specialize in delivering precision-cut and expertly installed worktops,
              floor tiles, wall tiles, and vanities that elevate the design and functionality of kitchen spaces and beyond.
              Our reputation is built on a commitment to craftsmanship, ensuring that every project we undertake meets the highest standards of excellence.
            </p>
          </div>

          {/* Sections - Same as Header */}
          <div className="footer-column col-12 col-sm-12 col-md-4">
            <h3>Sections</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/our-suppliers">Our Suppliers</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="footer-column col-12 col-sm-12 col-md-4">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><Link to="/contact">Email Us</Link></li>
              <li><Link to="/quote">Free Quote</Link></li>
              <li><Link to="/home-assistance">Home Assistance</Link></li>
              <li><Link to="/request-call-back">Request a Call Back</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* New Footer Bottom Section for Contact Details */}
      <div className="footer2-bottom col-12 col-sm-12 col-md-4">
        <div className="container text-center">
          <p className="contact-info">
            <span className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" /> 
              <a href="mailto:example@example.com" className="contact-link">example@example.com</a>
            </span>
            <span className="contact-item">
              <FontAwesomeIcon icon={faPhoneAlt} className="contact-icon" /> 
              <span className="contact-link">+1234567890</span>
            </span>
          </p>
        </div>
      </div>

      {/* Existing Footer Bottom Section for Copyright */}
      <div className="footer-bottom">
        <div className="container text-center">
          <p>© 2024 GlamStone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
