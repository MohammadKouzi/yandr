import React from 'react';
import { Form } from 'react-bootstrap';

const Notes = ({ formData = {}, handleChange, setFormData }) => {
  const handleNotesChange = (e) => {
    const value = e.target.value;
    const wordCount = value.trim().split(/\s+/).length;

    // Check if word count exceeds 250
    if (wordCount <= 250) {
      handleChange(e);  // Update form data if word count is valid
    }
  };

  return (
    <section className='quoteSection'>
      <Form.Group controlId="additionalNotes">
        <h2>Additional Notes</h2>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.additionalNotes}
          onChange={handleNotesChange}
          name="additionalNotes"
          placeholder="Enter any additional notes here "
        />
        <small>{formData.additionalNotes?.trim().split(/\s+/).length || 0} / 250 words</small>
      </Form.Group>
    </section>
  );
};

export default Notes;
