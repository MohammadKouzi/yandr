import React, { useState , useEffect} from 'react';
import { Row, Col, Pagination, Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import all kitchen images
 import kitchen2 from '../Images/kitchens/kitchen2.jpg';
import kitchen3 from '../Images/kitchens/kitchen3.jpg';
import kitchen4 from '../Images/kitchens/kitchen4.jpg';
import kitchen5 from '../Images/kitchens/kitchen5.jpg';
import kitchen6 from '../Images/kitchens/kitchen6.jpg';
import kitchen7 from '../Images/kitchens/kitchen7.jpg';
import kitchen8 from '../Images/kitchens/kitchen8.jpg';
import kitchen9 from '../Images/kitchens/kitchen9.jpg';
 import kitchen11 from '../Images/kitchens/kitchen11.jpg';
import kitchen12 from '../Images/kitchens/kitchen12.jpg';
import kitchen13 from '../Images/kitchens/kitchen13.jpg';
 import kitchen15 from '../Images/kitchens/kitchen15.jpg';
import kitchen16 from '../Images/kitchens/kitchen16.jpg';
import kitchen17 from '../Images/kitchens/kitchen17.jpg';
import kitchen18 from '../Images/kitchens/kitchen18.jpg';
import kitchen19 from '../Images/kitchens/kitchen19.jpg';
 import kitchen23 from '../Images/kitchens/kitchen23.jpg';
import kitchen24 from '../Images/kitchens/kitchen24.jpg';
import kitchen25 from '../Images/kitchens/kitchen25.jpg';
import kitchen26 from '../Images/kitchens/kitchen26.jpg';
import kitchen27 from '../Images/kitchens/kitchen27.jpg';
import kitchen28 from '../Images/kitchens/kitchen28.jpg';
import kitchen29 from '../Images/kitchens/kitchen29.jpg';
import kitchen30 from '../Images/kitchens/kitchen30.jpg';

// Create an array with all imported images
const imageList = [
  
  kitchen2,
  kitchen3,
  kitchen4,
  kitchen5,
  kitchen6,
  kitchen7,
  kitchen8,
  kitchen9,
   kitchen11,
  kitchen12,
  kitchen13,
   kitchen15,
  kitchen16,
  kitchen17,
  kitchen18,
  kitchen19,
  
  kitchen23,
  kitchen24,
  kitchen25,
  kitchen26,
  kitchen27,
  kitchen28,
  kitchen29,
  kitchen30
];


const getPhotosPerPage = () => {
  // Function to determine photos per page based on screen width
  const width = window.innerWidth;
  if (width < 576) return 8; // Extra small screens
  if (width < 768) return 8; // Small screens
  if (width < 992) return 12; // Medium screens
  return 12; // Large and extra-large screens
};

const Kitchen = ({ title }) => {
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

 
  

export default Kitchen;
