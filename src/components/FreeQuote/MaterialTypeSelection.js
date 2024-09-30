import React from 'react';
import { Form } from 'react-bootstrap';

const MaterialSelectionForm = ({
  selectedMaterialType,
  handleMaterialTypeChange,
  error
}) => {
  return (
    <section className='quoteSection'>
      <Form.Group controlId="materialType">
        <h2>Material Type</h2>
        <Form.Control as="select" value={selectedMaterialType} onChange={handleMaterialTypeChange}>
          <option value="">Select...</option>
          <option value="Glass">Glass</option>
          <option value="Quartz">Quartz</option>
          <option value="Marble">Marble</option>
          <option value="Granite">Granite</option>
          <option value="Porcelain">Porcelain</option>
        </Form.Control>
        {error && <small className="text-danger">{error}</small>}
      </Form.Group>
    </section>
  );
};

export default MaterialSelectionForm;
