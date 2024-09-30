import React from 'react';

const SuccessErrorMessages = ({ successMessage, errorMessage }) => (
  <>
    {successMessage && <div className="success-message">{successMessage}</div>}
    {errorMessage && <div className="error-message">{errorMessage}</div>}
  </>
);

export default SuccessErrorMessages;