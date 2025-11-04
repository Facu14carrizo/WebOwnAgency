import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

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

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 bg-dark z-[10000] flex items-center justify-center flex-col">
      <div className="text-4xl font-light tracking-[0.5rem] text-primary animate-pulse">
        NK STUDIO
      </div>
      <div className="w-[200px] h-[2px] bg-white/10 mt-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
