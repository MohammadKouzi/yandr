import React from 'react';
import { Form } from 'react-bootstrap';

const MaterialColorInput = ({ materialColor, handleMaterialColorChange, error }) => {
  return (
    <section className='quoteSection'>
      <Form.Group controlId="materialColor">
        <h2>Material Color</h2>
        <Form.Control
          type="text"
          value={materialColor}
          onChange={handleMaterialColorChange}
          placeholder="Enter a Material Color"
        />
        {error && <small className="text-danger">{error}</small>}
      </Form.Group>
    </section>
  );
};

export default MaterialColorInput;
