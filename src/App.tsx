import { useState } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <ScrollParticles />
          <Navigation />
          <main className="relative z-10">
            <Hero />
            <About />
            <Servicios />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
