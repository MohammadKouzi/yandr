import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faInstagram, 
} from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-row">
          <Col xs={12} md={6} lg={3} className="footer-column mb-4">
            <h3>GlamStone</h3>
            <p>
              At GlamStone, we specialise in delivering precision-cut and expertly installed worktops,
              floor tiles, wall tiles, and vanities that elevate the design and functionality of kitchen spaces and beyond.
              Our reputation is built on a commitment to craftsmanship, ensuring that every project we undertake meets the highest standards of excellence.
            </p>
          </Col>

          <Col xs={10} md={6} lg={2} className="footer-column mb-4">
            <h3>Sections</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/galleries">Galleries</Link></li>
              <li><Link to="/our-suppliers">Our Suppliers</Link></li>

                 </ul>
          </Col>

          <Col xs={12} md={6} lg={2} className="footer-column mb-4">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><Link to="/contact">Email Us</Link></li>
              <li><Link to="/quote">Free Quote</Link></li>
              <li><Link to="/home-assistance">Home Visit</Link></li>
              <li><Link to="/request-call-back">Request a Call Back</Link></li>
            </ul>
          </Col>

          <Col xs={12} md={6} lg={3} className="footer-column mb-4">
            <h3>Follow Us</h3>
            <div className="social-media-container">
              <a href="https://www.facebook.com/profile.php?id=61567824472609" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="social-icon facebook" />
              </a>
              <a href="https://www.instagram.com/glamstone.ltd?igsh=OXdvdm5vYTA2MW0y" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="social-icon instagram" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom">
        <Container className="text-center">
          <p>© 2024 GlamStone. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
