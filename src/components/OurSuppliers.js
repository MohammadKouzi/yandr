import React from 'react';
import { Container } from 'react-bootstrap';
import PhotoSlider from '../Uteletis/PhotoSlider';
import { Helmet } from 'react-helmet'; // Import Helmet

const OurSuppliers = () => {
  return (
    <div className="body">
      <Helmet>
        <title>GlamStone - Our Suppliers </title>
        <meta name="description" content="Explore our suppliers for high-quality materials including London Quartz Stone, NeoLith, SileStone, and more." />
        <meta name="keywords" content="London Quartz Stone, NeoLith, SileStone, Nile, CimeStone, UniStone, Dekton, Brachot, Sensa, Ersten, ArenaStone, Compac, CRL Stone, Classic Quartz Stone, Nobel Stone, Ceasar Stone, Granite Granite Limited, Southern Counties Glass, Jack Of Glass, Artemistone, Stone World London, Arts Cut, Technistone, Inter Stone, New Age Stone" />
      </Helmet>
      <Container style={{ paddingTop: '56px' }}>
        <Container className="text-center">
          <h1 className='hstyle'>Our Suppliers</h1>
          <p className="pstyle">
            Schedule a consultation, request a quote online, arrange a home visit, or have samples delivered to your door. 
            Let us help you bring your vision to life, at a time that suits you best. We look forward to working with you!
          </p>
        </Container>
        <PhotoSlider />
      </Container>
    </div>
  );
};

export default OurSuppliers;
