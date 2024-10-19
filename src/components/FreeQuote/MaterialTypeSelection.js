import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const MaterialTypeSelection = ({
  selectedMaterialType,
  handleMaterialTypeChange,
  handleCustomMaterialChange,
  error,
  customMaterialError 
}) => {
  const [otherMaterial, setOtherMaterial] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    handleMaterialTypeChange(value);

    if (value !== 'Other') {
      setOtherMaterial(''); 
    }
  };

  const handleOtherChange = (event) => {
    const customValue = event.target.value;
    setOtherMaterial(customValue); 
    handleCustomMaterialChange(customValue); 
  };

  return (
    <section className='quoteSection'>
      <Form.Group controlId="materialType">
        <h2>Material Type</h2>
        <Form.Control 
          as="select" 
          value={selectedMaterialType === 'Other' ? 'Other' : selectedMaterialType} 
          onChange={handleSelectChange}
        >
          <option value="">Select...</option>
          <option value="Glass">Glass</option>
          <option value="Quartz">Quartz</option>
          <option value="Marble">Marble</option>
          <option value="Granite">Granite</option>
          <option value="Porcelain">Porcelain</option>
          <option value="Other">Other</option>
        </Form.Control>

        {selectedMaterialType === 'Other' && (
          <div>
            <Form.Control 
              type="text" 
              placeholder="Enter other material" 
              value={otherMaterial} 
              onChange={handleOtherChange} 
              className="mt-3"
              isInvalid={!!customMaterialError} 
            />
            <Form.Control.Feedback type="invalid">{customMaterialError}</Form.Control.Feedback>
          </div>
        )}

        {error && <small className="text-danger">{error}</small>}
      </Form.Group>
    </section>
  );
};

export default MaterialTypeSelection;
