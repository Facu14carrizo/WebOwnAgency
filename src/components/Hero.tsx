import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpaceScene from './SpaceScene';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
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
    <section ref={sectionRef} id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 md:pt-0 pb-12 md:pb-0">
      <div className="absolute inset-0 z-0"><SpaceScene /></div>
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8"
        >
          <span style={{ color: '#00ff88' }}>Creamos</span>
          <br />
          Experiencias
          <br />
          Digitales
        </h1>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 md:mb-12 px-4"
        >
          Diseño y desarrollo web innovador y de alto valor
        </p>
        <a
          ref={ctaRef}
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            scrollToProjects();
          }}
          className="inline-block px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:translate-y-[-3px] hover:shadow-[0_20px_40px_rgba(0,255,136,0.3)] text-sm sm:text-base active:scale-95"
        >
          Ver Proyectos
        </a>
      </div>
    </section>
  );
}
