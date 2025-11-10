import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -200, rotation: -5 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
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
        const direction = index % 2 === 0 ? -100 : 100;

        gsap.fromTo(
          card,
          { opacity: 0, x: direction, scale: 0.5, rotation: direction > 0 ? 15 : -15 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.to(card, {
          y: (index % 2 === 0 ? -30 : 30),
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        });

        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }
      }
    });
  }, []);

  const projects = [
    {
      video: 'MiGustoCrunchyDemo.mp4',
      title: 'Web de Lanzamiento',
      category: 'Desarrollo y diseño Web',
    },
    {
      video: 'WaveBarberDemo.mp4',
      title: 'App de gestión de turnos',
      category: 'Desarrollo FrontEnd/BackEnd',
    },
    {
      video: 'QrGenProDemo.mp4',
      title: 'App Web',
      category: 'Desarrollo Web',
    },
    {
      video: 'MassiveMailSenderDemo.mp4',
      title: 'App de escritorio',
      category: 'Desarrollo BackEnd',
    },
  ];

  return (
    <section id="projects" className="py-32 px-8 md:px-16 bg-white/[0.02] overflow-hidden">
      <div ref={containerRef} className="max-w-[1400px] mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-12 opacity-0 translate-y-8"
        >
          Proyectos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12" style={{ perspective: '1500px' }}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="group relative h-[400px] rounded-3xl overflow-hidden opacity-0 scale-90 cursor-pointer"
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
