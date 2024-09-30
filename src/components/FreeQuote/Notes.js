import React from 'react';
import { Form } from 'react-bootstrap';

const Notes = ({ formData = {}, handleChange }) => {
  return (
    <section className='quoteSection'>
      <Form.Group controlId="additionalNotes">
        <h2>Additional Notes</h2>
        <Form.Control
          as="textarea"  // Use a textarea for additional notes
          rows={3}
          value={formData.additionalNotes}  // Correctly access additionalNotes from formData
          onChange={handleChange}  // Call handleChange to update state
          name="additionalNotes"  // Ensure name matches the state property
          placeholder="Enter any additional notes here"
        />
      </Form.Group>
    </section>
  );
};

export default Notes;
