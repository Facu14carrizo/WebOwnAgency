import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 6}px`;
      cursor.style.top = `${e.clientY - 6}px`;

      setTimeout(() => {
        follower.style.left = `${e.clientX - 14}px`;
        follower.style.top = `${e.clientY - 14}px`;
      }, 100);
    };

    const addHover = () => cursor?.classList.add('scale-[2]', 'bg-primary/30');
    const removeHover = () => cursor?.classList.remove('scale-[2]', 'bg-primary/30');

    document.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 border border-primary/80 rounded-full pointer-events-none z-[9999] transition-transform duration-100 mix-blend-difference hidden md:block"
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="block h-1.5 w-1.5 rounded-full bg-primary/90 blur-[2px]" />
        </span>
      </div>
      <div
        ref={followerRef}
        className="fixed w-7 h-7 bg-primary/8 rounded-full pointer-events-none z-[9998] transition-transform duration-300 hidden md:block"
      />
    </>
  );
}
