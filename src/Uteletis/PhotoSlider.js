import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Marquee from 'react-fast-marquee';
import materialPhotos from '../data/materialPhotos';

const PhotoSlider = () => {
  // Divide images into 3 groups for demonstration
  const materialGroups = [
    Object.values(materialPhotos).slice(0, Math.ceil(Object.values(materialPhotos).length / 3)),
    Object.values(materialPhotos).slice(Math.ceil(Object.values(materialPhotos).length / 3), Math.ceil(2 * Object.values(materialPhotos).length / 3)),
    Object.values(materialPhotos).slice(Math.ceil(2 * Object.values(materialPhotos).length / 3))
  ];

  const marqueeSpeed = 40;

  // Custom function to open a smaller window
  const openInSmallWindow = (e, link) => {
    e.preventDefault(); // Prevent default anchor behavior
    window.open(link, '_blank', 'width=800,height=600'); // Open a new window with custom size
  };

  return (
    <div className='quoteSection'>
      {materialGroups.map((group, groupIndex) => (
        <Row key={groupIndex} className="slider-row mb-4">
          <Marquee
            direction={groupIndex % 2 === 0 ? "right" : "left"}
            speed={marqueeSpeed}
            delay={1}
            pauseOnHover // Pauses marquee on hover
          >
            {group.map((material, index) => (
              <Col key={index} lg={12} md={13} sm={14} xs={19} className="image-wrapper">
                <a
                  href={material.link}
                  onClick={(e) => openInSmallWindow(e, material.link)} // Use the custom function
                  rel="noopener noreferrer"
                >
                  <img src={material.photo} alt={material.name} className="slider-image" />
                </a>
              </Col>
            ))}
          </Marquee>
        </Row>
      ))}
    </div>
  );
};

export default PhotoSlider;
