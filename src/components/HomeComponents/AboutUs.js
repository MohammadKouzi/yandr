import React from 'react';
import { Container } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div>
      <Container>
        <br />
        <h1 className="hstyle text-center">About GlamStone</h1>
        <p className="pstyle">
          At GlamStone, we specialize in delivering precision-cut, expertly installed worktops, floor tiles, wall tiles, and vanities, enhancing both the aesthetics and functionality of kitchen spaces and beyond. Our reputation is founded on a steadfast commitment to craftsmanship, ensuring every project meets the highest standards of excellence. Consistently high ratings from our clients reflect our dedication to quality and professionalism. Discover client reviews and feedback on our{' '}
          <a 
            href="https://maps.app.goo.gl/sRgPxksK1FmRb8y19" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="quote-link"
          >
            Google Reviews
          </a>.
        </p>
      </Container>
    </div>
  );
};

export default AboutUs;
