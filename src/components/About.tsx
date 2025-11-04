import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Code, Box } from 'lucide-react';

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
      icon: <Zap className="w-12 h-12" />,
      title: 'Diseño UX/UI',
      description: 'Creamos interfaces intuitivas y atractivas que proporcionan experiencias de usuario excepcionales.',
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: 'Desarrollo Web',
      description: 'Construimos sitios web rápidos, responsivos y optimizados para los motores de búsqueda.',
    },
    {
      icon: <Box className="w-12 h-12" />,
      title: 'Animaciones 3D',
      description: 'Damos vida a tus ideas con animaciones 3D impresionantes y efectos visuales cautivadores.',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto relative" style={{ backgroundPosition: '50% 0%' }}>
      <h2
        ref={titleRef}
        className="text-5xl md:text-6xl font-bold mb-12 opacity-0 translate-y-8"
      >
        Lo Que Hacemos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div
            key={service.title}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="interactive p-8 bg-white/[0.02] border border-white/10 rounded-3xl opacity-0 translate-y-12 transition-all duration-300 hover:translate-y-[-10px] hover:border-primary"
          >
            <div className="w-15 h-15 mb-6 text-primary">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
