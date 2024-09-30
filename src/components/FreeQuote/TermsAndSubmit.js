import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const TermsAndSubmit = ({ termsAgreed, setTermsAgreed, loading, submitStatus, errorRef }) => {
  const getButtonText = () => {
    if (loading) return 'Submitting...'; // While loading
    if (submitStatus === 'success') return 'Submitted Successfully!'; // On success
    if (submitStatus === 'error') return 'Error! Try Again'; // On error
    return 'Get a Quote'; // Default text
  };

  const renderAlert = () => {
    if (submitStatus === 'success') {
      return <Alert variant="success">Your quote has been submitted successfully!</Alert>;
    }
    if (submitStatus === 'error') {
      return <Alert variant="danger" ref={errorRef}>There was an error submitting your quote. Please try again.</Alert>;
    }
    return null; // No alert to show if no status
  };

  return (
    <>
      {renderAlert()} {/* Conditionally render success or error alerts */}

      <div>
        <Form.Group controlId="formTerms">
          <Form.Check 
            type="checkbox" 
            label="I agree to the terms and conditions" 
            onChange={(e) => setTermsAgreed(e.target.checked)}
            checked={termsAgreed}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: 'darkgoldenrod',
            color: 'white',
            padding: '12px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          disabled={!termsAgreed || loading} // Disable if not agreed or loading
        >
          {getButtonText()} {/* Change button text based on state */}
        </Button>
      </div>
      <br />
    </>
  );
};

export default TermsAndSubmit;
