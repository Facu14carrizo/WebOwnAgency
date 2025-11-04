import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 10}px`;
      cursor.style.top = `${e.clientY - 10}px`;

      setTimeout(() => {
        follower.style.left = `${e.clientX - 20}px`;
        follower.style.top = `${e.clientY - 20}px`;
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
        className="fixed w-5 h-5 border-2 border-primary rounded-full pointer-events-none z-[9999] transition-transform duration-100 mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed w-10 h-10 bg-primary/10 rounded-full pointer-events-none z-[9998] transition-transform duration-300 hidden md:block"
      />
    </>
  );
}
