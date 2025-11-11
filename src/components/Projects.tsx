import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación del título igual que Servicios
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animaciones de las cards - todas alineadas, sin movimiento vertical diferente
    const hoverHandlers: Array<{ card: HTMLDivElement; enter: () => void; leave: () => void }> = [];

    cardsRef.current.forEach((card, index) => {
      if (card) {
        // Configurar estado inicial
        gsap.set(card, {
          opacity: 0,
          y: 50,
          scale: 0.9,
        });

        // Animación de entrada suave y alineada
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
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

        // Efecto hover mejorado
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.02,
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

    // Cleanup
    return () => {
      hoverHandlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      video: 'MiGustoCrunchyDemo.mp4',
      title: 'Lanzamiento de CRUNCHY, Mi Gusto x Flamin\' Hot',
      category: 'Desarrollo y Diseño Web',
    },
    {
      video: 'WaveBarberDemo.mp4',
      title: 'Wave Barbershop App',
      category: 'Desarrollo FrontEnd/BackEnd',
    },
    {
      video: 'QrGenProDemo.mp4',
      title: 'QR Generator Pro',
      category: 'Desarrollo Web',
    },
    {
      video: 'MassiveMailSenderDemo.mp4',
      title: 'Enviador Masivo de Emails',
      category: 'Desarrollo BackEnd',
    },
  ];

  return (
    <section id="projects" className="py-32 px-8 md:px-16 bg-white/[0.02] overflow-hidden">
      <div ref={containerRef} className="max-w-[1400px] mx-auto">
        <div className="relative mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            Proyectos Destacados
          </h2>
          <div className="after:absolute after:content-[''] after:w-24 after:h-1 after:bg-primary after:rounded-lg after:mx-auto after:left-1/2 after:-translate-x-1/2 after:top-full after:mt-3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              style={{ 
                willChange: 'transform, opacity',
                transformOrigin: 'center center'
              }}
            >
              <video
                src={`/Demos/${project.video}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  const msg = document.createElement('div');
                  msg.innerHTML = `<span style='color:white;'>No se puede cargar el video:<br/><b>/Demos/${project.video}</b></span>`;
                  msg.className = 'absolute inset-0 flex items-center justify-center text-white text-center bg-black/70 font-bold';
                  e.currentTarget.parentNode?.appendChild(msg);
                  // Debug link para abrir en otra pestaña
                  const a = document.createElement('a');
                  a.href = `/Demos/${project.video}`;
                  a.innerText = `/Demos/${project.video}`;
                  a.target = '_blank';
                  a.style.color = '#88ffee';
                  a.style.display = 'block';
                  a.style.fontSize = '1.1em';
                  msg.appendChild(a);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-primary text-sm">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
