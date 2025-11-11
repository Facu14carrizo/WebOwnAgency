import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Cerrar menú móvil al cambiar el tamaño de la ventana
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Cerrar menú móvil después de hacer clic
    }
  };

  const menuItems = [
    { label: 'Inicio', id: 'home' },
    { label: 'Sobre Nosotros', id: 'about' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 w-full pr-4 md:pr-8 lg:pr-16 py-2 md:py-3 z-[1000] transition-all duration-300"
      >
        <button
          onClick={() => scrollToSection('home')}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer absolute left-4 md:left-6 lg:left-8 z-10"
        >
          <span
            className={`inline-block transition-all duration-500 ease-in-out ${
              scrolled ? 'w-[50px] md:w-[60px]' : 'w-[150px] md:w-[170px]'
            }`}
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              height: '1.5em',
              lineHeight: '1.5em'
            }}
          >
            {scrolled ? 'WF' : 'WaveFrame'}
          </span>
        </button>
        
        <div className="max-w-[1400px] mx-auto relative flex items-center justify-center">
          {/* Menú desktop - Centrado con blur */}
          <div className="hidden md:block mx-auto relative">
            <div className="absolute inset-0 bg-dark/30 backdrop-blur-lg rounded-full -z-10" style={{ padding: '0.5rem 2rem' }}></div>
            <ul className="flex gap-8 lg:gap-12 list-none px-6 py-2 relative">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white text-sm tracking-wider transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white p-2 hover:text-primary transition-colors absolute right-0"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-dark/95 backdrop-blur-lg z-[1001] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-full max-w-[320px] h-full bg-dark border-l border-white/10 shadow-2xl animate-slide-in-right pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del menú móvil con botón X */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                WaveFrame
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:text-primary hover:bg-white/10 rounded-lg transition-colors active:scale-95 z-10"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items del menú */}
            <ul className="flex flex-col p-4 gap-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left text-white py-4 px-4 rounded-lg hover:bg-white/10 hover:text-primary active:bg-white/20 transition-all duration-300 text-lg"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Estilos CSS para animación */}
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        @keyframes logo-fade {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-logo-transition {
          animation: logo-fade 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
