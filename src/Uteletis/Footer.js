import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-row">
          {/* GlamStone Info Section */}
          <Col xs={12} md={6} lg={4} className="footer-column mb-4">
            <h3>GlamStone</h3>
            <p>
              At GlamStone, we specialize in delivering precision-cut and expertly installed worktops,
              floor tiles, wall tiles, and vanities that elevate the design and functionality of kitchen spaces and beyond.
              Our reputation is built on a commitment to craftsmanship, ensuring that every project we undertake meets the highest standards of excellence.
            </p>
          </Col>

          {/* Sections - Same as Header */}
          <Col xs={10} md={6} lg={2} className="footer-column mb-4">
            <h3>Sections</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/our-suppliers">Our Suppliers</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </Col>

          {/* Contact Us Section */}
          <Col xs={12} md={6} lg={4} className="footer-column mb-4">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><Link to="/contact">Email Us</Link></li>
              <li><Link to="/quote">Free Quote</Link></li>
              <li><Link to="/home-assistance">Home Assistance</Link></li>
              <li><Link to="/request-call-back">Request a Call Back</Link></li>
            </ul>
          </Col>
        </Row>
      </Container>

{/* New Footer Bottom Section for Contact Details */}
<div className="footer2-bottom">
  <Container>
    <Row className="text-center mx-auto mb-4">
      {/* Contact Details Column */}
      <Col xs={12} sm={10} md={8} lg={6} className="mx-auto"> {/* Responsive column */}
        <p className="contact-info">
          <span className="contact-item d-block mb-3"> {/* Added margin for spacing */}
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" /> 
            <a href="mailto:example@example.com" className="contact-link">example@example.com</a>
          </span>
          <span className="contact-item d-block"> {/* Ensure this is also d-block */}
            <FontAwesomeIcon icon={faPhoneAlt} className="contact-icon" /> 
            <span className="contact-link">+1234567890</span>
          </span>
        </p>
      </Col>
    </Row>
  </Container>
</div>




      {/* Existing Footer Bottom Section for Copyright */}
      <div className="footer-bottom">
        <Container className="text-center">
          <p>© 2024 GlamStone. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
