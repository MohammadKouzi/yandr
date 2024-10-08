import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PhotoGallery = ({ currentPhotos, handleImageClick, indexOfFirstPhoto }) => {
  return (
    <Row>
      {currentPhotos.map((img, index) => (
        <Col key={index + indexOfFirstPhoto} xs={6} sm={4} md={3} lg={3}>
          <LazyLoadImage
            src={img}
            alt={`Gallery ${index + 1}`}
            className="photo service-image"
            effect="blur"
            onClick={() => handleImageClick(img, index + indexOfFirstPhoto)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default PhotoGallery;
