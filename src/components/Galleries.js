import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Image1 from '../Images/kitchen.png';
import Image2 from '../Images/livingroom.png';
import Image3 from '../Images/bathroom.png';

const Galleries = () => {
  // State to track if images are loaded
  const [loadedImages, setLoadedImages] = useState({
    kitchen: false,
    livingroom: false,
    bathroom: false,
  });

  // Function to update the state when an image is loaded
  const handleImageLoad = (imageName) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [imageName]: true,
    }));
  };

  return (
    <div className="body">

    <Container className="our-work-section text-center">
      {/* SEO Helmet */}
      <Helmet>
        <title>GlamStone - Galleries</title>
        <meta
          name="description"
          content="Explore our craftsmanship in bespoke kitchens, elegant living rooms, and luxurious bathrooms. Each project showcases our commitment to quality and design excellence."
        />
        <meta
          name="keywords"
          content="bespoke kitchens, custom living rooms, luxurious bathrooms, craftsmanship, home design"
        />
        <meta property="og:title" content="Our Work | GlamStone Official Website" />
        <meta
          property="og:description"
          content="Explore our craftsmanship in bespoke kitchens, elegant living rooms, and luxurious bathrooms."
        />
        
      </Helmet>

      <br />
      <h1 className="hstyle">Galleries</h1>

      {/* Responsive Paragraph Section */}
      <Row className="justify-content-center">
        <Col xs={10} md={10} lg={8}>
          <p className="pstyle">
            Discover our outstanding craftsmanship in a variety of beautifully crafted spaces.
            From bespoke kitchens to refined living rooms and luxurious bathrooms, 
            every project is tailored with precision and care. 
            <br />
            <strong> Click on the images below to explore our work in detail </strong>
          </p>
        </Col>
      </Row>

      {/* Images Grid */}
      <Row className="g-4">
        <Col xs={4} sm={4} md={4} lg={4} className="our-work-item">
          <Link to="/kitchen" className="our-work-link">
            <div className="our-work-image-container">
              <img
                src={Image1}
                alt="Kitchen"
                className={`our-work-image img-fluid ${loadedImages.kitchen ? '' : 'blur'}`}
                onLoad={() => handleImageLoad('kitchen')}
              />
            </div>
            <h3 className="our-work-subtitle">Kitchens</h3>
          </Link>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="our-work-item">
          <Link to="/livingroom" className="our-work-link">
            <div className="our-work-image-container">
              <img
                src={Image2}
                alt="Living Room"
                className={`our-work-image img-fluid ${loadedImages.livingroom ? '' : 'blur'}`}
                onLoad={() => handleImageLoad('livingroom')}
              />
            </div>
            <h3 className="our-work-subtitle">Living Rooms</h3>
          </Link>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="our-work-item">
          <Link to="/bathroom" className="our-work-link">
            <div className="our-work-image-container">
              <img
                src={Image3}
                alt="Bathroom"
                className={`our-work-image img-fluid ${loadedImages.bathroom ? '' : 'blur'}`}
                onLoad={() => handleImageLoad('bathroom')}
              />
            </div>
            <h3 className="our-work-subtitle">Bathrooms</h3>
          </Link>
        </Col>
      </Row>

      <br />
    </Container>
  </div>);
};

export default Galleries;
