import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function HomePage() {
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
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
