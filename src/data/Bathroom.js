import React, { useState , useEffect } from 'react';
import { Row, Col, Pagination, Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import all bathroom images
import bathroom1 from '../Images/bathrooms/bathroom1.jpg';
import bathroom2 from '../Images/bathrooms/bathroom2.jpg';
import bathroom3 from '../Images/bathrooms/bathroom3.jpg';
import bathroom4 from '../Images/bathrooms/bathroom4.jpg';
import bathroom5 from '../Images/bathrooms/bathroom5.jpg';
import bathroom6 from '../Images/bathrooms/bathroom6.jpg';
import bathroom7 from '../Images/bathrooms/bathroom7.jpg';
import bathroom8 from '../Images/bathrooms/bathroom8.jpg';
import bathroom9 from '../Images/bathrooms/bathroom9.jpg';
import bathroom10 from '../Images/bathrooms/bathroom10.jpg';
import bathroom11 from '../Images/bathrooms/bathroom11.jpg';
import bathroom12 from '../Images/bathrooms/bathroom12.jpg';
import bathroom13 from '../Images/bathrooms/bathroom13.jpg';
import bathroom14 from '../Images/bathrooms/bathroom14.jpg';
import bathroom15 from '../Images/bathrooms/bathroom15.jpg';
import bathroom16 from '../Images/bathrooms/bathroom16.jpg';
import bathroom17 from '../Images/bathrooms/bathroom17.jpg';
import bathroom18 from '../Images/bathrooms/bathroom18.jpg';
import bathroom19 from '../Images/bathrooms/bathroom19.jpg';
import bathroom20 from '../Images/bathrooms/bathroom20.jpg';
import bathroom21 from '../Images/bathrooms/bathroom21.jpg';
import bathroom22 from '../Images/bathrooms/bathroom22.jpg';
import bathroom23 from '../Images/bathrooms/bathroom23.jpg';
import bathroom24 from '../Images/bathrooms/bathroom24.jpg';
import bathroom25 from '../Images/bathrooms/bathroom25.jpg';
import bathroom26 from '../Images/bathrooms/bathroom26.jpg';
import bathroom27 from '../Images/bathrooms/bathroom27.jpg';
 import bathroom29 from '../Images/bathrooms/bathroom29.jpg';
import bathroom30 from '../Images/bathrooms/bathroom30.jpg';
// Create an array with all the imported images
const imageList = [
  bathroom1,
  bathroom2,
  bathroom3,
  bathroom4,
  bathroom5,
  bathroom6,
  bathroom7,
  bathroom8,
  bathroom9,
  bathroom10,
  bathroom11,
  bathroom12,
  bathroom13,
  bathroom14,
  bathroom15,
  bathroom16,
  bathroom17,
  bathroom18,
  bathroom19,
  bathroom20,
  bathroom21,
  bathroom22,
  bathroom23,
  bathroom24,
  bathroom25,
  bathroom26,
  bathroom27,
   bathroom29,
  bathroom30, ];

  const getPhotosPerPage = () => {
    // Function to determine photos per page based on screen width
    const width = window.innerWidth;
    if (width < 576) return 8; // Extra small screens
    if (width < 768) return 8; // Small screens
    if (width < 992) return 12; // Medium screens
    return 12; // Large and extra-large screens
  };
  
  const Bathroom = ({ title }) => {
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
  
  export default Bathroom;