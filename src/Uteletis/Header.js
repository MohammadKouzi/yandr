import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavItemClick = () => {
    setExpanded(false); // This will close the navbar when a link is clicked
  };

  return (
    <Navbar expanded={expanded} expand="md" className="HeaderBar">
      <Container fluid className="d-flex align-items-center justify-content-between">
        
        {/* Navbar brand logo - moved to the far left */}
        <Navbar.Brand as={NavLink} to="/" className="HeaderItem ms-2">
          <img
            src={process.env.PUBLIC_URL + '/logo.svg'}
            alt="GlamStone Logo"
            style={{ width: 'auto', height: '50px' }} 
          />
        </Navbar.Brand>

        {/* Navbar items collapse */}
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ms-auto">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              className="headerLink" 
              onClick={handleNavItemClick}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/our-suppliers" 
              className="headerLink" 
              onClick={handleNavItemClick}
            >
              Our Suppliers
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/services" 
              className="headerLink" 
              onClick={handleNavItemClick}
            >
              Services
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/about" 
              className="headerLink" 
              onClick={handleNavItemClick}
            >
              About Us
            </Nav.Link>
            
            <NavDropdown 
              title="Contact Us" 
              className="headerLink" 
              onClick={handleNavItemClick}
            >
              <NavDropdown.Item 
                as={NavLink} 
                to="/contact" 
                onClick={handleNavItemClick}
              >
                Email Us
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={NavLink} 
                to="/quote" 
                onClick={handleNavItemClick}
              >
                Free Quote
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={NavLink} 
                to="/home-assistance" 
                onClick={handleNavItemClick}
              >
                Home Assistance
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={NavLink} 
                to="/request-call-back" 
                onClick={handleNavItemClick}
              >
                Request a Call Back
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {/* Navbar toggle button - always on the right */}
        <Navbar.Toggle
          aria-controls="navbar-collapse"
          onClick={handleToggle}
          className="ms-3"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
      </Container>
    </Navbar>
  );
}

export default Header;
