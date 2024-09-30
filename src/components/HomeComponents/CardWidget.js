// src/components/CardWidget.js
import React from 'react';
import { Card , Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,   faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';

const getStarIcons = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="filled-star" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faEmptyStar} className="empty-star" />);
    }
  }
  return stars;
};

const CardWidget = ({ authorName, text, rating }) => {
  return (
    <Container>
    <br></br>
    <Card className="review-card" style={{ padding: ' 20px' }}>
      <Card.Body className="review-card-body" style={{ padding: '10px' }}>
        <div className="review-card-header text-center" style={{ marginBottom: '10px' }}>
          <h4 className="review-author">{authorName}</h4>
          <div className="review-rating">
            {getStarIcons(rating)}
          </div>
        </div>
        <p className="review-text">{text}</p>
      </Card.Body>
    </Card>
    </Container>
  );
};

export default CardWidget;
