import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import fabricationImage from '../Images/service.png';
import templatingImage from '../Images/service2.png';
import installationImage from '../Images/service3.png';

const Services = () => {
  const [activeTab, setActiveTab] = useState('Fabrication');
  const [animationClass, setAnimationClass] = useState('zoom-in');

  const handleTabSelect = (key) => {
    setAnimationClass('zoom-out');
    setTimeout(() => {
      setActiveTab(key);
      setAnimationClass('zoom-in');
    }, 300);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Fabrication':
        return (
          <p className={`servicep pstyle ${animationClass}`}>
            We  produce meticulously crafted products using only the highest quality materials. Skilled artisans on our team ensure that each piece is manufactured to stringent standards. We utilize modern techniques to guarantee both dimensional accuracy and beautiful finishing, resulting in durable, stunning products. With the capability to create a wide variety of designs, we cater to each client's unique needs. We see every project as an opportunity to showcase our craftsmanship and creativity. At GlamStone, you can trust that each product we create enhances the beauty of your spaces.</p>
        );
      case 'Templating':
        return (
          <p className={`servicep pstyle ${animationClass}`}>
            We deliver precise design services to ensure a perfect fit for all surfaces we manufacture. Utilizing advanced measurement techniques, our team guarantees exceptional results. We view templating as a crucial step in the fabrication process, defining design details and bringing them to life. By paying close attention to every angle and dimension, we ensure cohesion in each project. Our goal is to exceed client expectations and realize their vision with accuracy and care. At GlamStone, we take pride in innovating with every project we undertake. </p>
        );
      case 'Installation':
        return (
          <p className={`servicep pstyle ${animationClass}`}>
           We prioritize delivering a professional service that meets the highest quality standards. Our trained team installs each piece with precision, ensuring it aligns perfectly with the design specifications. We pay meticulous attention to detail during installation, enhancing the overall client experience. Our commitment to deadlines and effective communication ensures a smooth process from start to finish. We view each installation as an opportunity to foster lasting relationships with our clients. At GlamStone, we strive for complete customer satisfaction through flawless installations.</p>
        );
      default:
        return null;
    }
  };

  const renderTabImage = () => {
    switch (activeTab) {
      case 'Fabrication':
        return (
          <LazyLoadImage
            src={fabricationImage}
            alt="Fabrication Service"
            className="service-image img-fluid p-0"
            effect="blur"
          />
        );
      case 'Templating':
        return (
          <LazyLoadImage
            src={templatingImage}
            alt="Templating Service"
            className="service-image img-fluid p-0"
            effect="blur"
          />
        );
      case 'Installation':
        return (
          <LazyLoadImage
            src={installationImage}
            alt="Installation Service"
            className="service-image img-fluid p-0"
            effect="blur"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='body'>
      <Helmet>
        <title>GlamStone - Our Services</title>
        <meta name="description" content="Explore the expert services offered by GlamStone..." />
        <meta name="keywords" content="precision cutting, quartz cutting, porcelain cutting..." />
      </Helmet>

      <Container className='section2'>
        <br />
        <h1 className="text-center hstyle">Our Services</h1>
        <br />
        <Row>
          <Col md={12}>
            <Tabs
              id="service-tabs"
              activeKey={activeTab}
              onSelect={(key) => handleTabSelect(key)}
              className="mb-4 custom-tabs"
              justify
            >
              <Tab eventKey="Fabrication" title="Fabrication"></Tab>
              <Tab eventKey="Templating" title="Templating"></Tab>
              <Tab eventKey="Installation" title="Installation"></Tab>
            </Tabs>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            {/* عرض الصورة المرتبطة بالتبويب النشط */}
            {renderTabImage()}
          </Col>

          <Col md={6}>
            {/* عرض محتوى التبويب النشط */}
            {renderTabContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Services;