import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Pagination, Container, Spinner } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from 'react-helmet'; // Import React Helmet for SEO
import 'react-lazy-load-image-component/src/effects/blur.css';
import { importAll } from '../Uteletis/ImageLoader'; // Correct the path based on your file structure

// Use require.context to import all images from the specified folder
const images = importAll(require.context('../Images/kitchens/', false, /\.(heic|jpg|jpeg|png)$/i));

const getPhotosPerPage = () => {
  const width = window.innerWidth;
  if (width < 576) return 8; // Extra small screens
  if (width < 768) return 8; // Small screens
  if (width < 992) return 12; // Medium screens
  return 12; // Large and extra-large screens
};

const Kitchen = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(getPhotosPerPage());
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const handleResize = () => setPhotosPerPage(getPhotosPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set delay time (e.g., 1000 ms)

    return () => clearTimeout(timer);
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
      const nextIndex = (currentIndex + 1) % images.length;
      setEnlargedImage(images[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setEnlargedImage(images[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  const currentPhotos = useMemo(() => {
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    return images.slice(indexOfFirstPhoto, indexOfLastPhoto);
  }, [currentPage, photosPerPage]);

  const totalPages = Math.ceil(images.length / photosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="body">
      <Helmet>
        <title>Glamstone - Kitchens Gallery</title>
        <meta
          name="description"
          content="Browse our collection of custom kitchen designs, featuring high-quality materials and unique craftsmanship tailored to suit any style."
        />
        <meta
          name="keywords"
          content="kitchen gallery, custom kitchens, kitchen design, bespoke kitchens, modern kitchens, kitchen craftsmanship"
        />
        <meta property="og:title" content=" Glamstone| Kitchens Gallery " />
        <meta
          property="og:description"
          content="Explore our gallery of custom kitchen designs, crafted with care and precision to enhance your home."
        />
        
      </Helmet>

      <Container className="section2">
        <br />
        <h1 className="hstyle text-center">Kitchens</h1>
        <br />
        <div className="image-grid">
          {loading ? (
            <Row className="mb-3">
              {Array.from({ length: photosPerPage }).map((_, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={3}>
                  <div
                    className="grey-placeholder"
                    style={{
                      backgroundColor: '#e0e0e0',
                      height: '150px',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Spinner animation="border" size="sm" />
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              {currentPhotos.map((img, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={3}>
                  <LazyLoadImage
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="photo service-image fade-in"
                    effect="blur"
                    onClick={() => handleImageClick(img, index)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>

        {enlargedImage && (
          <div className="enlarged-image active" onClick={handleCloseImage}>
            <img src={enlargedImage} alt="Enlarged view" />
            <button className="close-button" onClick={handleCloseImage}>
              &times;
            </button>
            <button className="nav-button prev" onClick={handlePrevImage}>
              &lt;
            </button>
            <button className="nav-button next" onClick={handleNextImage}>
              &gt;
            </button>
          </div>
        )}

        <Row className="fixed-pagination">
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
