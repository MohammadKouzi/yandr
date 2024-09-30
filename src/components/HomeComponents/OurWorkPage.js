import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image1 from '../../Images/kitchen.png';
import Image2 from '../../Images/livingroom.png';
import Image3 from '../../Images/bathroom.png';

const OurWorkPage = () => {
  return (
    <Container className="our-work-section text-center">
      <h1 className="hstyle">Our Work</h1>

      {/* Responsive Paragraph Section */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <p className="subtitle">
            Discover our outstanding craftsmanship in a variety of beautifully crafted spaces.
            From bespoke kitchens to refined living rooms and luxurious bathrooms, 
            every project is tailored with precision and care. 
            <br></br>
            <strong> Click on the images below to explore our work in detail!</strong>
          </p>
        </Col>
      </Row>

      {/* Images Grid */}
      <Row className="g-4">
        <Col xs={6} sm={4} md={4} lg={4} className="our-work-item">
          <Link to="/kitchen" className="our-work-link">
            <div className="our-work-image-container">
              <img src={Image1} alt="Kitchen" className="our-work-image img-fluid" />
            </div>
            <h3 className="our-work-subtitle">Kitchens</h3>
          </Link>
        </Col>
        <Col xs={6} sm={4} md={4} lg={4} className="our-work-item">
          <Link to="/livingroom" className="our-work-link">
            <div className="our-work-image-container">
              <img src={Image2} alt="Living Room" className="our-work-image img-fluid" />
            </div>
            <h3 className="our-work-subtitle">Living Rooms</h3>
          </Link>
        </Col>
        <Col xs={6} sm={4} md={4} lg={4} className="our-work-item">
          <Link to="/bathroom" className="our-work-link">
            <div className="our-work-image-container">
              <img src={Image3} alt="Bathroom" className="our-work-image img-fluid" />
            </div>
            <h3 className="our-work-subtitle">Bathrooms</h3>
          </Link>
        </Col>
      </Row>

      <br />
    </Container>
  );
};

export default OurWorkPage;
