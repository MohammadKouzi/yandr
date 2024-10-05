import React from 'react';
import { Helmet } from 'react-helmet';  
import { Container, Row, Col } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Image4 from '../Images/4.jpg';  

const AboutUs = () => {
  return (
    <div className='body'>
      {/* SEO using React Helmet */}
      <Helmet>
        <title>GlamStone - About Us </title>
        <meta name="description" content="Learn more about GlamStone, specialists in precision-cut worktops, floor tiles, wall tiles, and vanities. Our expertise elevates kitchen and living spaces with premium craftsmanship." />
        <meta 
          name="keywords" 
          content="
            GlamStone, precision-cut worktops, expert tile installations, floor tiles, wall tiles, vanities, kitchen worktops, high-quality craftsmanship, home design, kitchen renovation, expert installation, UK worktops, luxury kitchen surfaces, premium materials
          " 
        />
      </Helmet>

      <Container>
        <div className='section2'>
          <br />
          <h1 className="hstyle text-center">About Us</h1>
          <br />
          <Row className="mb-4">
            <Col xs={12} md={6}>
              <br />
              <LazyLoadImage
                src={Image4}
                alt="About Us Image"
                className="about-image img-fluid"
                effect="blur"
              />
            </Col>
            <Col xs={12} md={6}>
              <br />
              <h2 className='h6style '>GlamStone</h2>
              <p className='pstyle' >
                At GlamStone, we specialize in delivering precision-cut and expertly installed worktops, floor tiles, wall tiles, and vanities that elevate the design and functionality of kitchen spaces and beyond. Our reputation is built on a commitment to craftsmanship, ensuring that every project we undertake meets the highest standards of excellence.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
