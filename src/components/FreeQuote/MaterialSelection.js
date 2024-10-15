import React from 'react';
import { Form } from 'react-bootstrap';
import materialPhotos from '../../data/materialPhotos';

const MaterialSelection = ({
  selectedMaterialType,
  handleMaterialTypeChange,
  error
}) => {
  return (
    <section className='quoteSection'>
      <Form.Group controlId="materialType">
        <h2>Select Supplier</h2>
        <Form.Control as="select" value={selectedMaterialType} onChange={handleMaterialTypeChange}>
          <option value="">Select...</option>
          {Object.keys(materialPhotos).map((material) => (
            <option key={material} value={material}>
              {materialPhotos[material].name}
            </option>
          ))}
        </Form.Control>
        {error && <small className="text-danger">{error}</small>}
      </Form.Group>
    </section>
  );
};

export default MaterialSelection;
