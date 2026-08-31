import React from 'react';
import './styles/globals.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import Stats from './components/sections/Stats';
import Testimonials from './components/sections/Testimonials';
import Newsletter from './components/sections/Newsletter';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default App;