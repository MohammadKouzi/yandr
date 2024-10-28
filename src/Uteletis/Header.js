import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown

  const handleToggle = () => {
    setExpanded(!expanded);
    setDropdownOpen(false); // Close dropdown when main toggle is used
  };

  const handleNavItemClick = () => {
    setExpanded(false); // Close the navbar when a link is clicked
    setDropdownOpen(false); // Close the dropdown when a link is clicked
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen); // Toggle dropdown state
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
              to="/services" 
              className="headerLink" 
              onClick={handleNavItemClick}
            >
              Services
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
              to="/galleries" 
              className="headerLink" 
              onClick={handleNavItemClick}
            >
              Galleries
            </Nav.Link>
            <NavDropdown 
              title="Contact Us" 
              className="headerLink" 
              show={dropdownOpen} // Control dropdown visibility
              onToggle={handleDropdownToggle} // Toggle dropdown open state
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
  style={{ fontWeight: 'bold', color: 'darkgoldenrod' }} // Apply styles inline
>
  Free Quote
</NavDropdown.Item>

              <NavDropdown.Item 
                as={NavLink} 
                to="/home-assistance" 
                onClick={handleNavItemClick}
              >
                Home Visit
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
