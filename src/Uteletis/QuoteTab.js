import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'; // Importing the quote icon
import { useNavigate } from 'react-router-dom';
 
const QuoteTab = () => {
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    console.log('Quote icon clicked!');
    navigate("/quote"); // Redirect to the Free Quote page
  };

  return (
    <div className="quote-tab" onClick={handleQuoteClick}>
      <FontAwesomeIcon icon={faQuoteRight} size="2x" className="icon" />
      <h3>Get a Free Quote</h3>
    </div>
  );
};

export default QuoteTab;
