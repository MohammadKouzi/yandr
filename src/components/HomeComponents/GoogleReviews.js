// src/components/GoogleReviews.js
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CardWidget from './CardWidget';
import Marquee from 'react-fast-marquee';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulating an API response for demonstration purposes
    const exampleData = {
      result: {
        reviews: [
          {
            author_name: 'John Doe',
            text: 'Amazing service and great quality products!',
            rating: 5,
          },
          {
            author_name: 'Jane Smith',
            text: 'The customer service was excellent. Highly recommended!',
            rating: 4,
          },
          {
            author_name: 'Alice Johnson',
            text: 'Good experience overall, but delivery was a bit slow.',
            rating: 3,
          },
        ],
      },
    };

    // Set the example reviews data
    setReviews(exampleData.result.reviews);
  }, []);

  return (
    <div>
      <Container>
        <h1 className="hstyle text-center">  Customers Reviews</h1>
        <Marquee>
          {reviews.map((review, index) => (
            <div key={index} style={{ padding: '4px' }}> {/* Add padding here */}
              <CardWidget
                authorName={review.author_name}
                text={review.text}
                rating={review.rating}
              />
            </div>
          ))}
        </Marquee>
      </Container>
      <br />
    </div>
  );
};

export default GoogleReviews;
