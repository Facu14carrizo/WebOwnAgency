import React, { useEffect, useRef } from 'react';
import { Globe, Smartphone, Monitor, ShoppingCart, FileText, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Configuración de animaciones según la dirección de cada card - MOVIMIENTOS RECTOS CON IMPACTO
    const animations = [
      // 0 - Aplicaciones Web: izquierda a derecha (movimiento recto, impacto fuerte)
      { x: -1500, y: 0, rotation: 0, scale: 0.7 },
      // 1 - Aplicaciones Móviles: arriba a abajo (movimiento recto, impacto fuerte)
      { x: 0, y: -1500, rotation: 0, scale: 0.7 },
      // 2 - Aplicaciones de Escritorio: derecha a izquierda (movimiento recto, impacto fuerte)
      { x: 1500, y: 0, rotation: 0, scale: 0.7 },
      // 3 - Ecommerce: izquierda a derecha (movimiento recto, impacto fuerte)
      { x: -1500, y: 0, rotation: 0, scale: 0.7 },
      // 4 - Landing Pages: abajo a arriba (movimiento recto, impacto fuerte, aparece antes)
      { x: 0, y: 1500, rotation: 0, scale: 0.7 },
      // 5 - Automatizaciones Avanzadas: derecha a izquierda (movimiento recto, impacto fuerte)
      { x: 1500, y: 0, rotation: 0, scale: 0.7 },
    ];

    const hoverHandlers: Array<{ card: HTMLDivElement; enter: () => void; leave: () => void }> = [];

    cardsRef.current.forEach((card, index) => {
      if (card) {
        const animConfig = animations[index];
        const isLandingPages = index === 4;
        
        // Configurar estado inicial fuera de pantalla
        gsap.set(card, {
          x: animConfig.x,
          y: animConfig.y,
          rotation: animConfig.rotation,
          opacity: 0,
          scale: animConfig.scale,
        });

        // Calcular overshoot basado en la dirección del movimiento (en dirección opuesta al movimiento)
        let overshootX = 0;
        let overshootY = 0;
        // Si viene desde izquierda (x negativo), overshoot a la derecha (x positivo)
        if (animConfig.x < 0) overshootX = 40;
        // Si viene desde derecha (x positivo), overshoot a la izquierda (x negativo)
        else if (animConfig.x > 0) overshootX = -40;
        // Si viene desde arriba (y negativo), overshoot abajo (y positivo)
        if (animConfig.y < 0) overshootY = 40;
        // Si viene desde abajo (y positivo), overshoot arriba (y negativo)
        else if (animConfig.y > 0) overshootY = -40;

        // Función de animación reutilizable
        const animateCard = () => {
          const tl = gsap.timeline();
          
          // Landing Pages aparece antes (menos delay)
          const delay = isLandingPages ? 0 : index * 0.1;

          // Fase 1: Movimiento rápido y directo hacia posición final (simula velocidad de choque)
          tl.to(card, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1.15, // Escala grande al impacto
            duration: 0.4,
            delay: delay,
            ease: 'power4.in',
          })
          // Fase 2: Overshoot (pasa un poco más allá de la posición final)
          .to(card, {
            x: overshootX,
            y: overshootY,
            scale: 1.1,
            duration: 0.15,
            ease: 'power2.out',
          })
          // Fase 3: Rebote elástico de vuelta a la posición final
          .to(card, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          });
        };

        // Para Landing Pages: trigger más temprano y más agresivo
        if (isLandingPages) {
          // Trigger muy temprano - cuando la sección apenas entra en vista
          ScrollTrigger.create({
            trigger: sectionRef.current || card,
            start: 'top 95%',
            end: 'bottom 5%',
            onEnter: animateCard,
            onEnterBack: animateCard,
            once: false,
          });

          // Fallback: Si después de 300ms no se ha activado, forzar animación
          setTimeout(() => {
            const currentOpacity = gsap.getProperty(card, 'opacity') as number;
            if (currentOpacity === 0) {
              animateCard();
            }
          }, 300);
        } else {
          // Para las otras cards, usar ScrollTrigger normal
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            onEnter: animateCard,
            toggleActions: 'play none none reverse',
          });
        }

        // Efecto hover mejorado
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        hoverHandlers.push({
          card,
          enter: handleMouseEnter,
          leave: handleMouseLeave,
        });
      }
    });

    // Animación del título
    const titleElement = sectionRef.current?.querySelector('h2');
    if (titleElement) {
      gsap.fromTo(
        titleElement,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Cleanup
    return () => {
      hoverHandlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 overflow-hidden" id="servicios">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center">Servicios</h2>
          <div className="after:absolute after:content-[''] after:w-24 after:h-1 after:bg-primary after:rounded-lg after:mx-auto after:left-1/2 after:-translate-x-1/2 after:top-full after:mt-3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {servicios.map((serv, i) => (
            <div
              key={serv.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="flex flex-col bg-black/70 border border-white/10 rounded-2xl p-8 min-h-[320px] shadow-[0_0_20px_0_rgba(0,255,136,0.12)] relative cursor-pointer overflow-hidden"
              style={{ 
                willChange: 'transform, opacity',
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
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
