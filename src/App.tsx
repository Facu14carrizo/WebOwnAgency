import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Servicios from './components/Servicios';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollParticles from './components/ScrollParticles';
import Privacy from './components/Privacy';
import Legales from './components/Legales';

function HomePage() {
  const location = useLocation();
  useEffect(() => {
    const scrollToPending = () => {
      const pending = localStorage.getItem('scrollTarget');
      if (pending) {
        const el = document.getElementById(pending);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
        localStorage.removeItem('scrollTarget');
      }
    };
    scrollToPending();
  }, [location.pathname]);

  return (
    <>
      <main className="relative z-10">
        <Hero />
        <About />
        <Servicios />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <ScrollParticles />
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/legales" element={<Legales />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
