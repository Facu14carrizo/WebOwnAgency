import React from 'react';
import { Globe, Smartphone, Monitor, ShoppingCart, FileText, Zap } from 'lucide-react';

const servicios = [
  {
    icon: <Globe className="w-10 h-10 text-primary mb-4" />,  
    title: 'Aplicaciones Web',
    desc: 'Apps modernas y seguras para tu empresa o producto.',
    bullets: [
      'Single Page Apps', 'PWA', 'SEO friendly', 'Admin panel', 'Escalables'
    ]
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary mb-4" />,  
    title: 'Aplicaciones Móviles',
    desc: 'Apps iOS y Android nativas o híbridas.',
    bullets: [
      'Android & iOS', 'Notificaciones', 'APIs', 'Interfaz intuitiva', 'Push & cámara'
    ]
  },
  {
    icon: <Monitor className="w-10 h-10 text-primary mb-4" />,  
    title: 'Aplicaciones de Escritorio',
    desc: 'Software para escritorio multiplataforma.',
    bullets: [
      'Windows/Mac/Linux', 'Bases de datos', 'Reportes', 'UI moderna', 'Multiusuario'
    ]
  },
  {
    icon: <ShoppingCart className="w-10 h-10 text-primary mb-4" />,  
    title: 'Ecommerce',
    desc: 'Tiendas online, catálogos y gestión de pagos.',
    bullets: [
      'Pagos integrados', 'Inventario', 'Admin fácil', 'Checkout seguro', 'Multi-idioma'
    ]
  },
  {
    icon: <FileText className="w-10 h-10 text-primary mb-4" />,  
    title: 'Landing Pages',
    desc: 'Páginas ideales para campañas y generación de leads.',
    bullets: [
      'Carga rápida', 'Optimización', 'Formulario', 'Copywriting', 'Diseño visual'
    ]
  },
  {
    icon: <Zap className="w-10 h-10 text-primary mb-4" />,  
    title: 'Automatizaciones Avanzadas',
    desc: 'Soluciones inteligentes: intégralo y olvídate.',
    bullets: [
      'Bots', 'Scraping', 'Flujos', 'Integraciones', 'Reportes auto'
    ]
  }
];

export default function Servicios() {
  return (
    <section className="py-20 px-4 md:px-8" id="servicios">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center">Servicios</h2>
          <div className="after:absolute after:content-[''] after:w-24 after:h-1 after:bg-primary after:rounded-lg after:mx-auto after:left-1/2 after:-translate-x-1/2 after:top-full after:mt-3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((serv, i) => (
            <div
              key={serv.title}
              className="flex flex-col bg-black/70 border border-white/10 rounded-2xl p-8 min-h-[320px] shadow-[0_0_20px_0_rgba(0,255,136,0.12)] relative"
            >
              <div className='h-1 w-14 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6'></div>
              {serv.icon}
              <h3 className="text-xl font-bold mb-2 text-white">{serv.title}</h3>
              <p className="text-gray-300 mb-5 text-sm leading-snug">{serv.desc}</p>
              <ul className="mb-4 flex-1 text-sm space-y-1 text-gray-400">
                {serv.bullets.map(b => (
                  <li key={b} className="flex items-center gap-2 before:content-['•'] before:text-primary before:mr-1">
                    {b}
                  </li>
                ))}
              </ul>
              <a
                tabIndex={0} 
                role="button"
                className="mt-auto text-primary text-sm font-medium flex gap-1 items-center hover:underline group cursor-pointer"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Saber más <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
