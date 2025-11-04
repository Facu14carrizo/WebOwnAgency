import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpaceScene from './SpaceScene';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.5'
      );

    gsap.to(sectionRef.current, {
      yPercent: 30,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="home" className="h-screen relative flex items-center justify-center overflow-hidden pt-24 md:pt-0">
      <SpaceScene />
      <div className="relative z-2 text-center px-8 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-6 md:mb-8 opacity-0 translate-y-12"
        >
          Creamos
          <br />
          Experiencias
          <br />
          Digitales
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 opacity-0 translate-y-8"
        >
          Diseño innovador y desarrollo web de vanguardia
        </p>
        <a
          ref={ctaRef}
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            scrollToProjects();
          }}
          className="inline-block px-12 py-4 bg-gradient-to-r from-primary to-secondary text-dark font-semibold rounded-full opacity-0 translate-y-8 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-[0_20px_40px_rgba(0,255,136,0.3)]"
        >
          Ver Proyectos
        </a>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-2">
        <div className="w-[30px] h-[50px] border-2 border-primary rounded-[20px] relative">
          <div className="w-1 h-2.5 bg-primary rounded-sm absolute top-2.5 left-1/2 transform -translate-x-1/2 animate-scroll" />
        </div>
      </div>
    </section>
  );
}
