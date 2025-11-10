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
        className={`fixed top-0 w-full px-4 md:px-8 lg:px-16 py-4 md:py-8 z-[1000] backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'bg-dark/80' : 'bg-dark/50'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
          >
            WaveFrame
          </button>
          
          {/* Menú desktop */}
          <ul className="hidden md:flex gap-8 lg:gap-12 list-none">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-400 text-sm tracking-wider transition-colors duration-300 hover:text-white relative group"
                >
                  {item.label}
                  <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white p-2 hover:text-primary transition-colors"
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
              {menuItems.map((item, index) => (
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
      `}</style>
    </>
  );
}
