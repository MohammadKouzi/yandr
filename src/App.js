import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WhatsAppTab from "./Uteletis/WhatsAppTab";
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Services from './components/Services';
import FreeQuote from './components/FreeQuote';
import Kitchen from './data/Kitchen';
import LivingRoom from './data/LivingRoom';
import Bathroom from './data/Bathroom';
import Header from './Uteletis/Header';
import Footer from './Uteletis/Footer';
import RequestCallBack from './components/RequestCallBack';
import HomeAssistance from './components/HomeAssistance'; // Import HomeAssistance component
import OurSuppliers from './components/OurSuppliers';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <WhatsAppTab />
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
          <Route path="/home-assistance" element={<HomeAssistance />} /> {/* Add this route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
