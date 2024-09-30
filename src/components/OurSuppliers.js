import React  from 'react';
import {  Container } from 'react-bootstrap';
import PhotoSlider from '../Uteletis/PhotoSlider';
 
 const OurSppliers = () => {
 
  return (
    <div className="body">
    <div>
      <Container style={{ paddingTop: '56px' }}>
        <Container className="text-center   ">
          <h1 className='hstyle'>Our Suppliers</h1>  
          <p className="pstyle">
            to schedule a consultation, request a quote online, arrange a home visit, or have samples
            delivered to your door. Let us help you bring your vision to life, at a time that suits
            you best. We look forward to working with you!
          </p>
        </Container>
        <PhotoSlider/>
      </Container>
    </div>
    </div>
  );
};

export default OurSppliers;
