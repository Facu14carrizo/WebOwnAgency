import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full px-8 md:px-16 py-8 z-[1000] backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-dark/80' : 'bg-dark/50'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <button
          onClick={() => scrollToSection('home')}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
        >
          WaveFrame
        </button>
        <ul className="hidden md:flex gap-12 list-none">
          {['Inicio', 'Sobre Nosotros', 'Proyectos', 'Contacto'].map((item, index) => (
            <li key={item}>
              <button
                onClick={() =>
                  scrollToSection(
                    ['home', 'about', 'projects', 'contacto'][index] // Cambia 'contact' a 'contacto'
                  )
                }
                className="text-gray-400 text-sm tracking-wider transition-colors duration-300 hover:text-white relative group"
              >
                {item}
                <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
