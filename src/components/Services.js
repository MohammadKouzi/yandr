import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import serviceImage from '../Images/service.jpg'; // مسار الصورة النسبي الصحيح

const Services = () => {
  const [activeTab, setActiveTab] = useState('Precision Cutting');

  // محتوى التابات حسب التاب النشط
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
      <Container className='section2'>
        <br />
        <h1 className="text-center hstyle">Our Services</h1>
        <br />
        <Row>
          <Col md={12}>
            {/* التابات ومحتوى التاب */}
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
          {/* الصورة الثابتة ومحتوى التاب معاً */}
          <Col md={6}>
            <LazyLoadImage
              src={serviceImage} // استخدام الصورة المستوردة
              alt="Service"
              className="service-image img-fluid p-0"
              effect="blur"
            />
          </Col>

          <Col md={6}>
            {/* عرض محتوى التاب حسب التاب النشط */}
            {renderTabContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Services;
