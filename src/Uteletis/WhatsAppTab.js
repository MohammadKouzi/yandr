import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importing the WhatsApp icon

const WhatsAppTab = () => {
  const handleWhatsAppClick = () => {
    console.log('WhatsApp icon clicked!');
    window.open("https://wa.me/+442030890107", "_blank", "noopener noreferrer");
  };

  return (
    <div className="whatsapp-tab" onClick={handleWhatsAppClick}>
      <FontAwesomeIcon icon={faWhatsapp} size="2x" className="icon" />
      <h3>How Can I Help You?</h3>
    </div>
  );
}

export default WhatsAppTab;
