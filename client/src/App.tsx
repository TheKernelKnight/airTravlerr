import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import Stats from './components/sections/Stats';
import Testimonials from './components/sections/Testimonials';
import Newsletter from './components/sections/Newsletter';
import Footer from './components/layout/Footer';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <HowItWorks />
                <Stats />
                <Testimonials />
                <Newsletter />
              </>
            } />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;