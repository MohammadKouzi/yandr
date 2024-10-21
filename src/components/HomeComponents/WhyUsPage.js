import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTools,
  
  faHome,
  faClipboardList,
  faTruck,
  faCalendarAlt,
  faMapMarkedAlt,
 } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Data for cards
const cardItems = [

 
 
  {
    icon: faHome,
    title: 'Home Visit Services',
    text: 'To guarantee your complete satisfaction, we offer home visit services. This allows us to understand your space and vision firsthand, ensuring that the final product perfectly complements your home and meets your expectations.',
  },
  {
    icon: faClipboardList,
    title: 'Quotation Options',
    text: (
      <>
        We provide convenient quotation options both online and through our home visit service. Whether you prefer a quick estimate{' '}
        <Link to="/quote" className="quote-link">
          via our website
        </Link>{' '}
        or a more personalized consultation during a home visit, we ensure transparency and accuracy in every quote.
      </>
    ),
  },
  {
    icon: faTruck,
    title: 'Sample Delivery Service',
    text: 'We bring a wide range of worktop, floor tile, wall tile, and vanity samples directly to your door, allowing you to explore your options from the comfort of your home.',
  },
  {
    icon: faMapMarkedAlt,
    title: 'Nationwide Coverage',
    text: 'We proudly serve various areas across the UK, bringing our high-quality worktop, floor tile, wall tile, and vanity services to homes and businesses nationwide.',
  },
  {
    icon: faCalendarAlt,
    title: 'Weekend & Bank Holiday Availability',
    text: 'We understand that your schedule may be busy, which is why we are available on weekends and bank holidays to better meet your needs and ensure your project progresses smoothly.',
  },

  {
    icon: faTools,
    title: 'Exceptional Stonework and Reliable Project Delivery',
    text: ' We specialize in top-quality materials, offering expert cutting and seamless installation. As independent designers, we collaborate closely with builders and clients to ensure every project surpasses expectations. Whether it’s countertops, flooring, or other surfaces, our focus is on precision and craftsmanship. We guarantee timely and reliable service, ensuring all projects are completed on time and within your budget.',
  },
   
  
];

const WhyUsPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  // Function to reset the animation for all cards
  const resetAnimation = () => {
    const allCards = document.querySelectorAll('.custom-card'); // Select all cards
    allCards.forEach((card) => {
      card.style.animation = 'none'; // Remove animation
    });

    // Reapply the animation after a short delay to restart it
    setTimeout(() => {
      allCards.forEach((card) => {
        card.style.animation = ''; // Reapply animation
      });
    }, 10); // Short delay to trigger reflow
  };

  const handleCardClick = (index) => {
    resetAnimation(); // Reset the animation for all cards
    setExpandedCard(expandedCard === index ? null : index); // Toggle the card expansion
  };

  return (
    <>
      {/* SEO using React Helmet */}
      <Helmet>
        <title>GlamStone Official Website</title>
        <meta
          name="description"
          content="Discover why we stand out in worktop, floor tile, and vanity installations with our specialized expertise, personalized service, and commitment to quality."
        />
      </Helmet>

      <Container className="section2 text-center">
        <br />
        <h1 className="hstyle">Why Us</h1>
        <br />
        <Row>
          {cardItems.map((item, index) => (
            <Col key={index} xs={6} md={4} lg={4} className="mb-3">
              <Card
                className={`custom-card ${expandedCard === index ? 'expanded' : ''} ${
                  expandedCard === index ? '' : 'pulsing'
                }`}
                onClick={() => handleCardClick(index)}
              >
                <Card.Body>
                  <FontAwesomeIcon icon={item.icon} size="3x" className="mb-3" />
                  <Card.Title className="card-title">{item.title}</Card.Title>
                  {expandedCard === index && <Card.Text className="card-text">{item.text}</Card.Text>}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default WhyUsPage;
