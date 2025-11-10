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
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotationY: -90 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.to(card, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
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
    <section ref={sectionRef} id="about" className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto relative" style={{ backgroundPosition: '50% 0%' }}>
      <h2
        ref={titleRef}
        className="text-5xl md:text-6xl font-bold mb-12 opacity-0 translate-y-8"
      >
        Lo Que Hacemos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {services.map((service, idx) => (
          <div
            key={service.key}
            ref={el => {
              if (el) cardsRef.current[idx] = el;
            }}
            className="interactive p-8 bg-black/60 border border-white/10 rounded-3xl opacity-0 translate-y-12 transition-all duration-300 hover:translate-y-[-10px] hover:border-primary"
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
