import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      gsap.to('.loader-container', {
        opacity: 0,
        duration: 1,
        onComplete,
      });
    }, 2000);

    // Animación de entrada y efectos profesionales con GSAP
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 16, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
    );

    // Brillo/shimmer que recorre el relleno repetidamente
    if (sheenRef.current) {
      gsap.fromTo(
        sheenRef.current,
        { x: '-20%' },
        { x: '120%', duration: 1.4, ease: 'power2.inOut', repeat: -1 }
      );
    }

    // Glow sutil respirando en el relleno
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        filter: 'drop-shadow(0 0 18px rgba(0,255,136,0.35))',
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(sheenRef.current);
      gsap.killTweensOf(fillRef.current);
    };
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 bg-dark z-[10000] flex items-center justify-center flex-col">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="relative select-none"
        ref={containerRef}
      >
        <div className="relative mx-auto">
          {/* Capa base tenue */}
          <div className="inline-block text-center text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.45rem] md:tracking-[0.5rem] text-white/15">
            WAVEFRAME STUDIO
          </div>
          {/* Capa de relleno con gradiente que crece como barra */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
            ref={fillRef}
          >
            <div className="inline-block text-center text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.45rem] md:tracking-[0.5rem] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,136,0.25)]">
              WAVEFRAME STUDIO
            </div>
            {/* Sheen dinámico */}
            <div
              ref={sheenRef}
              className="pointer-events-none absolute top-0 -left-[15%] h-full w-[30%]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0) 100%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
