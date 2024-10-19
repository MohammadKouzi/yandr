import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import materialPhotos from '../../data/materialPhotos'; 

const Suppliers = ({
  selectedSupplier,
  handleSupplierChange,
  handleCustomSupplierChange,
  error,
  customSupplierError 
}) => {
  const [otherSupplier, setOtherSupplier] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    handleSupplierChange(value);

    if (value !== 'Other') {
      setOtherSupplier('');
    }
  };

  const handleOtherChange = (event) => {
    const customValue = event.target.value;
    setOtherSupplier(customValue);
    handleCustomSupplierChange(customValue);
  };

  return (
    <section className="quoteSection">
      <Form.Group controlId="Supplier">
        <h2>Select Supplier</h2>
        <Form.Control
          as="select"
          value={selectedSupplier}
          onChange={handleSelectChange}
        >
          <option value="">Select...</option>
          {Object.keys(materialPhotos).map((material) => (
            <option key={material} value={material}>
              {materialPhotos[material].name}
            </option>
          ))}
          <option value="Other">Other</option>
        </Form.Control>

        {selectedSupplier === 'Other' && (
          <div>
            <Form.Control
              type="text"
              placeholder="Enter other supplier"
              value={otherSupplier}
              onChange={handleOtherChange}
              className="mt-3"
              isInvalid={!!customSupplierError} 
            />
            <Form.Control.Feedback type="invalid">
              {customSupplierError}
            </Form.Control.Feedback>
          </div>
        )}

        {error && <small className="text-danger">{error}</small>}
      </Form.Group>
    </section>
  );
};

export default Suppliers;
