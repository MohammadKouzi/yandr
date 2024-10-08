import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WhatsAppTab from "./Uteletis/WhatsAppTab";
import QuoteTab from "./Uteletis/QuoteTab"; // Import the QuoteTab component
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
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

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <WhatsAppTab />
        <QuoteTab /> {/* Add the floating quote button */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-suppliers" element={<OurSuppliers />} />
          <Route path="/quote" element={<FreeQuote />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/livingroom" element={<LivingRoom />} />
          <Route path="/bathroom" element={<Bathroom />} />
          <Route path="/request-call-back" element={<RequestCallBack />} />
          <Route path="/home-assistance" element={<HomeAssistance />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
