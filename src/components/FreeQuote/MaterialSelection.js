import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';

// Custom hook to determine screen size
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

const MaterialSelection = ({ materialPhotos, onMaterialSelect, error }) => {
  const windowWidth = useWindowWidth();
  
  // Determine items per page based on screen width
  let itemsPerPage;
  if (windowWidth < 576) {
    itemsPerPage = 4; // Mobile screens
  } else if (windowWidth >= 576 && windowWidth < 992) {
    itemsPerPage = 6; // Medium screens
  } else {
    itemsPerPage = 8; // Large screens
  }
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(null); // State to track the selected material

  const totalItems = Object.keys(materialPhotos).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = Object.keys(materialPhotos).slice(startIndex, startIndex + itemsPerPage);

  const handleMaterialClick = (materialKey, material) => {
    setSelectedMaterial(materialKey); // Mark the material as selected
    onMaterialSelect(material.name);  // Send the selected material name back to the parent component
    
    // Specify the size and features of the new window
    const windowFeatures = 'width=800,height=600,menubar=no,toolbar=no,location=yes,status=yes,scrollbars=yes,resizable=yes';
    const newWindow = window.open(material.link, 'MaterialWindow', windowFeatures); // Open the link in a new window

    // Optional: Check if the new window was blocked
    if (!newWindow) {
      alert('Please allow popups for this website to view the material link.');
    }
  };

  return (
    <section className="quoteSection">
      <h2>Choose Your Material</h2>
      <p>Please choose your preferred material from Our Suppliers</p>

      <Row className="material-grid">
        {currentItems.map((materialKey) => {
          const material = materialPhotos[materialKey];
          const isSelected = selectedMaterial === materialKey; // Check if the material is selected
          return (
            <Col key={materialKey} xs={6} sm={6} md={4} lg={3} className="material-col">
              <div
                className={`material-item ${isSelected ? 'selected' : ''}`} // Add class if selected
                onClick={() => handleMaterialClick(materialKey, material)}
              >
                <img src={material.photo} alt={material.name} className="material-photo" />
                <h3>{material.name}</h3>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
      {error && <small className="text-danger">{error}</small>}
    </section>
  );
};

export default MaterialSelection;
