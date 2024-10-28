import React from 'react';
import { Helmet } from 'react-helmet';  
import CarouselPage from './HomeComponents/CarouselPage';
import WhyUsPage from './HomeComponents/WhyUsPage';
 
import GoldenBanner from './HomeComponents/GoldenBanner';
import AboutUs from './HomeComponents/AboutUs';

const HomePage = () => {
  return (
    <div className="body">
      <Helmet>
        <title>GlamStone Official Website</title>
        <meta name="description" content="Welcome to GlamStone. We specialize in delivering precision-cut worktops, floor tiles, wall tiles, and vanities with expert craftsmanship." />
        <meta name="keywords" content="GlamStone, worktops, floor tiles, wall tiles, vanities" />
      </Helmet>
      <div className="SiteContainer">
        <CarouselPage />
        <GoldenBanner />
        <AboutUs/>
        <WhyUsPage />
        
      </div>
    </div>
  );
};

export default HomePage;
