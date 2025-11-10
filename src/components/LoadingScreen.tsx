import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutStartedRef = useRef(false);
  const progressRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  // Progreso controlado y estable
  useEffect(() => {
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev >= 100 ? 100 : prev + 2;
        progressRef.current = next;
        if (next >= 100 && progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        return next;
      });
    }, 30);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Animaciones de entrada y efectos visuales
  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 1 });
    }
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 1, y: 10, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Brillo que recorre el relleno
    if (sheenRef.current) {
      gsap.fromTo(
        sheenRef.current,
        { x: '-25%' },
        { x: '125%', duration: 1.4, ease: 'power2.inOut', repeat: -1 }
      );
    }

    // Glow sutil respirando
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        filter: 'drop-shadow(0 0 18px rgba(0,255,136,0.35))',
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }

    // Focos de luz de fondo animados
    if (blobARef.current) {
      gsap.fromTo(
        blobARef.current,
        { opacity: 0.6, xPercent: -15, yPercent: -10 },
        { opacity: 0.9, xPercent: 5, yPercent: 0, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 }
      );
    }
    if (blobBRef.current) {
      gsap.fromTo(
        blobBRef.current,
        { opacity: 0.5, xPercent: 10, yPercent: 5 },
        { opacity: 0.85, xPercent: -5, yPercent: -5, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }
      );
    }

    return () => {
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(sheenRef.current);
      gsap.killTweensOf(fillRef.current);
      gsap.killTweensOf(blobARef.current);
      gsap.killTweensOf(blobBRef.current);
    };
  }, []);

  // Fade-out cuando progreso completo y tiempo mínimo alcanzado
  useEffect(() => {
    const minDisplayTime = 2000; // 2s para poder apreciar la animación
    let checkInterval: NodeJS.Timeout | null = null;
    let fadeTween: gsap.core.Tween | null = null;

    const safeComplete = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
        overlayRef.current.style.pointerEvents = 'none';
      }
      if (checkInterval) clearInterval(checkInterval);
      onComplete();
    };

    const startFade = () => {
      if (fadeOutStartedRef.current || finishedRef.current) return;
      fadeOutStartedRef.current = true;
      if (overlayRef.current) {
        fadeTween = gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          onComplete: safeComplete,
        });
      } else {
        safeComplete();
      }
    };

    checkInterval = setInterval(() => {
      if (fadeOutStartedRef.current || finishedRef.current) {
        if (checkInterval) clearInterval(checkInterval);
        return;
      }
      const elapsed = Date.now() - startTimeRef.current;
      const okTime = elapsed >= minDisplayTime;
      const okProgress = progressRef.current >= 100;
      if (okTime && okProgress) {
        if (checkInterval) clearInterval(checkInterval);
        startFade();
      }
    }, 100);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (fadeTween) fadeTween.kill();
      if (overlayRef.current) gsap.killTweensOf(overlayRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="loader-container fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Focos de luz animados en el fondo */}
      <div
        ref={blobARef}
        className="absolute -z-[1] w-[65vmax] h-[65vmax] rounded-full"
        style={{
          top: '-10%',
          left: '-15%',
          background: 'radial-gradient(closest-side, rgba(0,255,136,0.35), rgba(0,255,136,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        ref={blobBRef}
        className="absolute -z-[1] w-[60vmax] h-[60vmax] rounded-full"
        style={{
          bottom: '-15%',
          right: '-10%',
          background: 'radial-gradient(closest-side, rgba(255,0,255,0.3), rgba(255,0,255,0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Contenido principal */}
      <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="relative select-none" ref={containerRef}>
        <div className="relative mx-auto">
          {/* Texto base tenue */}
          <div className="inline-block text-center text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.45rem] md:tracking-[0.5rem] text-white/15">
            WaveFrame Studio
          </div>
          {/* Capa de relleno con gradiente que crece como barra */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
            ref={fillRef}
          >
            <div className="inline-block text-center text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.45rem] md:tracking-[0.5rem] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,136,0.25)]">
              WaveFrame Studio
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
