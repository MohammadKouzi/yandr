import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Image1 from '../Images/kitchen.png';
import Image2 from '../Images/livingroom.png';
import Image3 from '../Images/bathroom.png';

const Galleries = () => {
  const [loadedImages, setLoadedImages] = useState({
    kitchen: false,
    livingroom: false,
    bathroom: false,
  });

  const handleImageLoad = (imageName) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [imageName]: true,
    }));
  };

  return (
    <div className="body">
      <Container className='section2'>
        <Container className="our-work-section text-center">
          <Helmet>
            <title>GlamStone - Galleries</title>
            <meta
              name="description"
              content="Explore our craftsmanship in bespoke kitchens, elegant living rooms, and luxurious bathrooms."
            />
          </Helmet>  <br></br>
          <h1 className="hstyle">Galleries</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <p className="pstyle">
                Discover our outstanding craftsmanship in a variety of beautifully crafted spaces.
                <strong> Click on the images below to explore our work in detail </strong>
              </p>
            </Col>
          </Row>

          {/* Images Grid */}
          <Row className="g-3">
            <Col xs={6} sm={6} md={6} lg={4} className="our-work-item">
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
            <Col xs={6} sm={6} md={6} lg={4} className="our-work-item">
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
            <Col xs={6} sm={6} md={6} lg={4} className="our-work-item">
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
        </Container>
      </Container>
    </div>
  );
};

export default Galleries;
