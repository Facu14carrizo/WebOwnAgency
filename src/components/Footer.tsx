import { Instagram, Linkedin } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const navToSection = (id: string) => {
    if (location.pathname !== '/') {
      localStorage.setItem('scrollTarget', id);
      navigate('/');
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative z-[1] flex flex-col pt-12 pb-4 px-8 md:px-16 border-t border-white/10">
      <div className="flex flex-col gap-12 md:gap-14 flex-1">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex w-full flex-col items-center gap-2 text-center text-gray-100 md:w-1/2 md:text-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
              WaveFrame
            </span>
            <span className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.35em]">
              Creamos Experiencias Digitales
            </span>
          </div>
          <div className="flex w-full flex-col items-center gap-4 text-gray-200 text-sm md:w-1/2 md:items-center md:justify-center md:pl-6">
            <div className="grid w-full max-w-xl grid-cols-1 gap-5 text-center md:grid-cols-3 md:text-left">
              <div className="flex flex-col items-center gap-1.5 md:items-start">
                <h4 className="font-semibold uppercase tracking-wide text-gray-300">Nosotros</h4>
                <a
                  onClick={() => navToSection('inicio')}
                  className="group relative text-gray-400 cursor-pointer"
                >
                  Inicio
                  <span className="pointer-events-none absolute bottom-[-6px] left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                  onClick={() => navToSection('studio')}
                  className="group relative text-gray-400 cursor-pointer"
                >
                  Studio
                  <span className="pointer-events-none absolute bottom-[-6px] left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
              <div className="flex flex-col items-center gap-1.5 md:items-start">
                <h4 className="font-semibold uppercase tracking-wide text-gray-300">Explorá</h4>
                <a
                  onClick={() => navToSection('servicios')}
                  className="group relative text-gray-400 cursor-pointer"
                >
                  Servicios
                  <span className="pointer-events-none absolute bottom-[-6px] left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
                <a
                  onClick={() => navToSection('proyectos')}
                  className="group relative text-gray-400 cursor-pointer"
                >
                  Proyectos
                  <span className="pointer-events-none absolute bottom-[-6px] left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
              <div className="flex flex-col items-center gap-1.5 md:items-start">
                <h4 className="font-semibold uppercase tracking-wide text-gray-300">Conectemos</h4>
                <a
                  onClick={() => navToSection('contacto')}
                  className="group relative text-gray-400 cursor-pointer"
                >
                  Contacto
                  <span className="pointer-events-none absolute bottom-[-6px] left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-6 text-gray-400 text-sm md:flex-row md:items-center">
          <div className="flex w-full flex-wrap items-center justify-center gap-6 md:w-1/2 md:justify-center">
            <span>&copy; 2025 Todos los derechos reservados.</span>
            <Link
              to="/privacidad"
              className="group relative"
            >
              Privacidad
              <span className="pointer-events-none absolute bottom-[-6px] left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/legales"
              className="group relative"
            >
              Legales
              <span className="pointer-events-none absolute bottom-[-6px] left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
          <div className="flex w-full flex-col items-center gap-3 md:w-1/2 md:items-center">
            <span className="text-xs uppercase tracking-[0.35em] text-gray-500 text-center">
              Diseño y desarrollo web innovador y de alto valor.
            </span>
            <div className="flex items-center justify-center gap-4">
              <span className="uppercase tracking-wide text-gray-400">Siguenos</span>
              <a href="#" className="transition-transform duration-300 hover:-translate-y-0.5 hover:text-primary">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="transition-transform duration-300 hover:-translate-y-0.5 hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
