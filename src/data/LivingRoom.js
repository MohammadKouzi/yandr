import React, { useState , useEffect } from 'react';
import { Row, Col, Pagination, Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import all living room images
import living1 from '../Images/livingrooms/living1.jpg';
import living2 from '../Images/livingrooms/living2.jpg';
import living3 from '../Images/livingrooms/living3.jpg';
import living4 from '../Images/livingrooms/living4.jpg';
import living5 from '../Images/livingrooms/living5.jpg';
import living7 from '../Images/livingrooms/living7.jpg';
import living8 from '../Images/livingrooms/living8.jpg';
import living9 from '../Images/livingrooms/living9.jpg';
import living10 from '../Images/livingrooms/living10.jpg';
import living11 from '../Images/livingrooms/living11.jpg';
import living12 from '../Images/livingrooms/living12.jpg';
import living13 from '../Images/livingrooms/living13.jpg';
import living14 from '../Images/livingrooms/living14.jpg';
import living15 from '../Images/livingrooms/living15.jpg';
import living16 from '../Images/livingrooms/living16.jpg';
import living17 from '../Images/livingrooms/living17.jpg';
import living18 from '../Images/livingrooms/living18.jpg';
import living19 from '../Images/livingrooms/living19.jpg';
import living20 from '../Images/livingrooms/living20.jpg';
import living21 from '../Images/livingrooms/living21.jpg';
import living23 from '../Images/livingrooms/living23.jpg';
import living24 from '../Images/livingrooms/living24.jpg';
import living25 from '../Images/livingrooms/living25.jpg';
import living26 from '../Images/livingrooms/living26.jpg';
import living27 from '../Images/livingrooms/living27.jpg';
import living28 from '../Images/livingrooms/living28.jpg';
import living29 from '../Images/livingrooms/living29.jpg';

// Create an array with all the imported images
const imageList = [
  living1,
  living2,
  living3,
  living4,
  living5,
  living7,
  living8,
  living9,
  living10,
  living11,
  living12,
  living13,
  living14,
  living15,
  living16,
  living17,
  living18,
  living19,
  living20,
  living21,
  living23,
  living24,
  living25,
  living26,
  living27,
  living28,
  living29,
];

const getPhotosPerPage = () => {
  // Function to determine photos per page based on screen width
  const width = window.innerWidth;
  if (width < 576) return 8; // Extra small screens
  if (width < 768) return 8; // Small screens
  if (width < 992) return 12; // Medium screens
  return 12; // Large and extra-large screens
};

const LivingRoom = ({ title }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(getPhotosPerPage());

  useEffect(() => {
    const handleResize = () => setPhotosPerPage(getPhotosPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (img, index) => {
    setEnlargedImage(img);
    setCurrentIndex(index);
  };

  const handleCloseImage = () => {
    setEnlargedImage(null);
    setCurrentIndex(null);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % imageList.length;
      setEnlargedImage(imageList[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
      setEnlargedImage(imageList[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  // Pagination logic
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = imageList.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(imageList.length / photosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="body">
      <Container>
        <br />
        <h1 className="hstyle text-center">{title}</h1>
        <br />

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

        {/* Enlarged Image */}
        {enlargedImage && (
          <div className="enlarged-image active" onClick={handleCloseImage}>
            <img src={enlargedImage} alt="Enlarged view" />
            <button className="close-button" onClick={handleCloseImage}>&times;</button>
            <button className="nav-button prev" onClick={handlePrevImage}>&lt;</button>
            <button className="nav-button next" onClick={handleNextImage}>&gt;</button>
          </div>
        )}

        {/* Pagination */}
        <Row>
          <Pagination className="d-flex justify-content-center mt-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Row>
      </Container>
    </div>
  );
};

 
export default LivingRoom;
 