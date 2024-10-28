import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WhatsAppTab from "./Uteletis/WhatsAppTab";
import QuoteTab from "./Uteletis/QuoteTab";  
import HomePage from './components/HomePage';
import Galleries from './components/Galleries';
import ContactUs from './components/contacting/ContactUs';
import Services from './components/Services';
import FreeQuote from './components/contacting/FreeQuote';
import Kitchen from './data/Kitchen';
import LivingRoom from './data/LivingRoom';
import Bathroom from './data/Bathroom';
import Header from './Uteletis/Header';
import Footer from './Uteletis/Footer';
import RequestCallBack from './components/contacting/RequestCallBack';
import HomeAssistance from './components/contacting/HomeAssistance'; 
import OurSuppliers from './components/OurSuppliers';

const paths = {
  home: "/",
  galleries: "/galleries", 
   contact: "/contact",
  services: "/services",
  suppliers: "/our-suppliers",
  quote: "/quote",
  kitchen: "/kitchen",
  livingRoom: "/livingroom",
  bathroom: "/bathroom",
  requestCallBack: "/request-call-back",
  homeAssistance: "/home-assistance"
};

const MainContent = () => {
  const location = useLocation();

  const hiddenQuoteTabPaths = [
    paths.contact,
    paths.quote,
    paths.livingRoom,
    paths.bathroom,
    paths.requestCallBack,
    paths.homeAssistance
  ];

  const shouldShowQuoteTab = !hiddenQuoteTabPaths.includes(location.pathname);

  return (
    <>
      <WhatsAppTab />
      {shouldShowQuoteTab && <QuoteTab />}
      <Routes>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.galleries} element={<Galleries />} />
        <Route path={paths.contact} element={<ContactUs />} />
        <Route path={paths.services} element={<Services />} />
        <Route path={paths.suppliers} element={<OurSuppliers />} />
        <Route path={paths.quote} element={<FreeQuote />} />
        <Route path={paths.kitchen} element={<Kitchen />} />
        <Route path={paths.livingRoom} element={<LivingRoom />} />
        <Route path={paths.bathroom} element={<Bathroom />} />
        <Route path={paths.requestCallBack} element={<RequestCallBack />} />
        <Route path={paths.homeAssistance} element={<HomeAssistance />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
