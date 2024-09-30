import React, { useState } from 'react';
import { Container, Card ,Col , Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTools,
  faUserCog,
  faGem,
  faHome,
  faClipboardList,
  faTruck,
  faCalendarAlt,
  faMapMarkedAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link component

// Data for cards
const cardItems = [
  {
    icon: faTools,
    title: 'Specialized Expertise',
    text: 'With extensive experience in working with high-end materials, we bring a deep understanding of each stone’s unique characteristics, enabling us to achieve superior results in both cutting and installation.',
  },
  {
    icon: faUserCog,
    title: 'Personalized Service',
    text: 'As independent designers, we offer a tailored approach to each project, collaborating closely with builders and clients to ensure that the final product not only meets but exceeds design expectations.',
  },
  {
    icon: faGem,
    title: 'Commitment to Quality',
    text: 'Quality craftsmanship is at the heart of everything we do. We ensure that every project, from worktops to vanities, walls, and floors, is completed with the utmost attention to detail and excellence.',
  },
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
        We provide convenient quotation options both online and through our home visit service. Whether you prefer a quick estimate <Link to="/quote" className="quote-link">via our website</Link> or a more personalized consultation during a home visit, we ensure transparency and accuracy in every quote.
      </>
    ),
  },
  {
    icon: faTruck,
    title: 'Sample Delivery Service',
    text: 'We bring a wide range of worktop, floor tile, wall tile, and vanity samples directly to your door, allowing you to explore your options from the comfort of your home.',
  },
  {
    icon: faCalendarAlt,
    title: 'Weekend & Bank Holiday Availability',
    text: 'We understand that your schedule may be busy, which is why we are available on weekends and bank holidays to better meet your needs and ensure your project progresses smoothly.',
  },
  {
    icon: faMapMarkedAlt,
    title: 'Nationwide Coverage',
    text: 'We proudly serve various areas across the UK, bringing our high-quality worktop, floor tile, wall tile, and vanity services to homes and businesses nationwide.',
  },
  {
    icon: faClock,
    title: 'Reliable and Timely Execution',
    text: 'We recognize the importance of adhering to project timelines and budgets, providing reliable services that support your construction and home decoration goals.',
  },
];

const WhyUsPage = () => {
  // State to keep track of which card is expanded
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <Container className="section2 text-center">
    <h1 className="hstyle">Why Us</h1>
    <br />
    <Row>
      {cardItems.map((item, index) => (
        <Col key={index} xs={6} md={4} lg={4} className="mb-3"> {/* 2 cards per row on small screens, 3 on medium, 4 on large */}
          <Card 
            className={`custom-card ${expandedCard === index ? 'expanded' : 'pulsing'}`}
            onClick={() => handleCardClick(index)}
          >
            <Card.Body>
              <FontAwesomeIcon icon={item.icon} size="3x" className="mb-3" />
              <Card.Title>{item.title}</Card.Title>
              {expandedCard === index && <Card.Text>{item.text}</Card.Text>}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  
  );
};

export default WhyUsPage;
