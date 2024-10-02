import React, { useState } from 'react';
import { Helmet } from 'react-helmet'; // Import React Helmet for SEO
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import serviceImage from '../Images/service.jpg'; 

const Services = () => {
  const [activeTab, setActiveTab] = useState('Precision Cutting');

  // Render tab content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Precision Cutting':
        return (
          <p className="servicep pstyle">
            We offer meticulous cutting services for quartz, porcelain, granite, and marble. Whether it’s custom shapes, detailed edging, or precise cutouts for sinks, vanities, and fixtures, our work is defined by accuracy and a keen eye for detail.
          </p>
        );
      case 'Quartz & Porcelain for Floors, Walls, and Vanities':
        return (
          <p className="servicep pstyle">
            Beyond worktops, we provide specialized cutting services for quartz and porcelain floors, walls, and vanities. These durable and elegant materials are perfect for enhancing kitchens, bathrooms, living spaces, and any other area of your home.
          </p>
        );
      case 'Professional Installation':
        return (
          <p className="servicep pstyle">
            Our team of professionals ensures that your chosen materials are installed with precision and care. From worktops to floors, walls, and vanities, we handle the entire installation process, leaving you with a flawless and beautiful finish.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className='body'>
      {/* SEO using React Helmet */}
      <Helmet>
        <title>GlamStone - Our Services </title>
        <meta name="description" content="Explore the expert services offered by GlamStone, including precision cutting for quartz and porcelain, and professional installation for all your worktop and tile needs." />
        <meta 
          name="keywords" 
          content="
            precision cutting, quartz cutting, porcelain cutting, floor tiles, wall tiles, vanities, professional installation, home improvement, custom shapes, luxury kitchen design, durable materials, expert craftsmanship, UK services
          " 
        />
      </Helmet>

      <Container className='section2'>
        <br />
        <h1 className="text-center hstyle">Our Services</h1>
        <br />
        <Row>
          <Col md={12}>
            {/* Tabs and tab content */}
            <Tabs
              id="service-tabs"
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key)}
              className="mb-3 custom-tabs"
              justify
            >
              <Tab eventKey="Precision Cutting" title="Precision Cutting"></Tab>
              <Tab eventKey="Quartz & Porcelain for Floors, Walls, and Vanities" title="Quartz & Porcelain for Floors, Walls, and Vanities"></Tab>
              <Tab eventKey="Professional Installation" title="Professional Installation"></Tab>
            </Tabs>
          </Col>
        </Row>

        <Row>
          {/* Static image and tab content together */}
          <Col md={6}>
            <LazyLoadImage
              src={serviceImage} // Using the imported image
              alt="Service"
              className="service-image img-fluid p-0"
              effect="blur"
            />
          </Col>

          <Col md={6}>
            {/* Display the active tab content */}
            {renderTabContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Services;
