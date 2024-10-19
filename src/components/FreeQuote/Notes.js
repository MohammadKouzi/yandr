import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Notes = ({ formData = {}, handleChange }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleNotesChange = (e) => {
    const value = e.target.value;

    // Allow change if character count is valid (250 characters limit)
    if (value.length <= 250) {
      setErrorMessage(''); // Clear error message
      handleChange(e);  // Call handleChange to update form data
    } else {
      setErrorMessage('Maximum limit is 250 characters.'); // Set error message
    }
  };

  // Calculate current character count from formData
  const charCount = formData.additionalNotes ? formData.additionalNotes.length : 0;

  return (
    <section className="quoteSection">
      <Form.Group controlId="additionalNotes">
        <h2>Additional Notes</h2>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.additionalNotes || ''}
          onChange={handleNotesChange}
          name="additionalNotes"
          placeholder="Enter any additional notes here (max 250 characters)"
        />
        <small>{charCount} / 250 characters</small> {/* Display character count */}
        {errorMessage && <div className="text-danger">{errorMessage}</div>} {/* Display error message */}
      </Form.Group>
    </section>
  );
};

export default Notes;
