import React from 'react';
 
const Banner = () => {
  return (
    <div className="footer2-bottom">
      <div className="contact-info">
        <div className="contact-item">
          <i className="fas fa-envelope contact-icon"></i>
          <a href="mailto:info@glamstone.co.uk" className="contact-link">info@glamstone.co.uk</a>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone contact-icon"></i>
          <a href="tel:+1234567890" className="contact-link">+1234567890</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
