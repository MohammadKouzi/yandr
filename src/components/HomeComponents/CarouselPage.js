import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Helmet } from 'react-helmet';  
import Image1 from '../../Images/kitchen.png';
import Image2 from '../../Images/livingroom.png';
import Image3 from '../../Images/bathroom.png';

const carouselItems = [
  {
    src: Image1,
    header: <h3 className="carouselHeader">Kitchens</h3>,
    text: (
      <p className="carouselParagraph">
        Our precision-cut worktops and expertly installed tiles transform kitchens into functional and elegant spaces.
        <br />
        With a focus on durability and aesthetics, our craftsmanship ensures that every kitchen project meets the highest standards,
        <br />
        delivering a seamless blend of style and practicality.
      </p>
    ),
  },
  {
    src: Image2,
    header: <h3 className="carouselHeader">Living Rooms</h3>,
    text: (
      <p className="carouselParagraph">
        From floor tiles to wall accents, we bring sophistication to living rooms.
        <br />
        Our custom solutions enhance the visual appeal and comfort of your living space,
        <br />
        combining modern design with meticulous installation to elevate the heart of your home.
      </p>
    ),
  },
  {
    src: Image3,
    header: <h3 className="carouselHeader">Bathrooms</h3>,
    text: (
      <p className="carouselParagraph">
        We specialize in creating luxurious bathroom environments with premium vanities and tiles.
        <br />
        Our attention to detail and craftsmanship ensures that
        <br />
        each bathroom we work on exudes elegance, durability, and relaxation.
      </p>
    ),
  },
];

const CarouselPage = () => {
  return (
    <div>
      {/* SEO using React Helmet */}
      <Helmet>
        <title>GlamStone Official Website</title>
        <meta name="description" content="Explore our precision-cut worktops and expertly installed tiles for kitchens, living rooms, and bathrooms that blend style and practicality." />
        <meta 
          name="keywords" 
          content="
            kitchen worktops, living room tiles, bathroom vanities, home improvement, elegant spaces, custom solutions, luxury design, interior decor, expert craftsmanship, UK services
          " 
        />
      </Helmet>

      <Carousel
        className="custom-carousel"
        controls={true} // Enables left/right controls
        indicators={true} // Enables navigation indicators
        interval={4000} // Disable auto slide
        fade={false} // Slide transition instead of fade
        slide={true} // Smooth sliding animation
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-image-container">
              <img
                className="d-block w-100"
                src={item.src}
                alt={`Slide ${index + 1}`}
              />
              <div className="carousel-text-overlay">
                {item.header}
                {item.text}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselPage;
