import { Instagram, Linkedin } from 'lucide-react';

type XLogoProps = {
  className?: string;
};

const XLogo = ({ className = 'w-5 h-5' }: XLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22.162 0H18.06l-6.99 9.51L4.66 0H0l8.15 12.045L.2 24h4.15l6.49-8.67L17.33 24h4.66l-8.6-12.45L22.162 0z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-8 md:px-16 border-t border-white/10">
      <div className="flex flex-col gap-12">
        <div className="flex w-full flex-col items-center gap-4 text-gray-200 text-sm md:-mt-2">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-6 text-center md:grid-cols-3 md:text-left">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="font-semibold uppercase tracking-wide text-gray-300">Nosotros</h4>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Inicio
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Sobre Nosotros
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="font-semibold uppercase tracking-wide text-gray-300">Explorá</h4>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Servicios
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Proyectos
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="font-semibold uppercase tracking-wide text-gray-300">Conectemos</h4>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Contacto
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-gray-400 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <span>&copy; 2025 Todos los derechos reservados.</span>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Privacidad
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Legales
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 md:justify-end">
            <span className="uppercase tracking-wide text-gray-400">Siguenos</span>
            <a href="#" className="transition-transform duration-300 hover:-translate-y-0.5 hover:text-primary">
              <XLogo className="w-4 h-4" />
            </a>
            <a href="#" className="transition-transform duration-300 hover:-translate-y-0.5 hover:text-primary">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="transition-transform duration-300 hover:-translate-y-0.5 hover:text-primary">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
