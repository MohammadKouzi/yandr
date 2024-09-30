import React from 'react';
import CarouselPage from './HomeComponents/CarouselPage';
import WhyUsPage from './HomeComponents/WhyUsPage';
import OurWorkPage from './HomeComponents/OurWorkPage';
import GoogleReviews from './HomeComponents/GoogleReviews';

 
const HomePage = () => {
  return (
    <div className="body">
      <div className="SiteContainer">
        <CarouselPage />
        <WhyUsPage />
        <OurWorkPage />
        <GoogleReviews/>
 
      </div>
    </div>
  );
};

export default HomePage;
