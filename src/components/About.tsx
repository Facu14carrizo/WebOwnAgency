import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Brain, Palette, Zap, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animación más fluida para las cards con stagger elegante
    const hoverHandlers: Array<{ card: HTMLElement; enter: () => void; leave: () => void }> = [];

    cardsRef.current.forEach((card, index) => {
      if (card) {
        // Inicializar estado inicial
        gsap.set(card, {
          opacity: 0,
          y: 50,
          scale: 0.92,
          rotationX: 8,
          transformPerspective: 1000,
        });

        // Animación de entrada suave y fluida
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        // Parallax sutil y fluido
        gsap.to(card, {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        // Efecto hover mejorado con GSAP
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.03,
            y: -8,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.4,
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

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Cleanup function
    return () => {
      hoverHandlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      key: 'frontend',
      icon: <Code2 className="w-12 h-12" />,
      title: 'Desarrollo Frontend',
      description: 'React, Vite y tecnologías modernas para interfaces rápidas y robustas.',
      technologies: ['React', 'ASTRO', 'Typescript', 'Tailwind', 'Framer Motion'],
    },
    {
      key: 'backend',
      icon: <Brain className="w-12 h-12" />,
      title: 'Desarrollo Backend',
      description: 'APIs y sistemas escalables, optimizados y seguros.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Spring Boot', 'Java'],
    },
    {
      key: 'uxui',
      icon: <Palette className="w-12 h-12" />,
      title: 'UX/UI Design',
      description: 'Diseño de experiencias visuales e interfaces centradas en el usuario.',
      technologies: ['Figma', 'Prototyping', 'Photoshop', 'Illustrator', 'After Effects'],
    },
    {
      key: '3dvisual',
      icon: <Box className="w-12 h-12" />,
      title: (
        <>
          Animaciones 3D<br />& Visuales
        </>
      ),
      description: 'Gráficos, efectos 3D, experiencias AR para destacar tu marca.',
      technologies: ['Three.js', 'React Three Fiber', 'GSAP', 'Modelos 3D' ,'Shaders', 'Efectos', 'Realidad Aumentada'],
    },
    {
      key: 'automatizaciones',
      icon: <Zap className="w-12 h-12" />,
      title: 'Automatizaciones',
      description: 'Automatizamos procesos de negocio con bots y flujos inteligentes.',
      technologies: ['Python', 'APIs', 'Webhooks', 'Integraciones', 'Make', 'Zapier', 'n8n', 'Bots'],
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto relative" style={{ backgroundPosition: '50% 0%' }}>
      <h2
        ref={titleRef}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center"
      >
        Lo Que Hacemos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
        {services.map((service, idx) => (
          <div
            key={service.key}
            ref={el => {
              if (el) cardsRef.current[idx] = el;
            }}
            className="interactive p-8 bg-black/60 border border-white/10 rounded-3xl hover:border-primary cursor-pointer"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-15 h-15 mb-6 text-primary">{service.icon}</div>
            <h3
              className={
                'font-semibold mb-3 text-white leading-tight '
                + (service.title === 'Automatizaciones'
                  ? 'block text-xl md:text-2xl break-words'
                  : 'text-2xl')
              }
            >
              {service.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">{service.description}</p>
            {service.technologies && (
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
