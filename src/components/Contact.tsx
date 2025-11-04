import { useState, FormEvent, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-group');
      formElements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotationY: index % 2 === 0 ? -20 : 20 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            delay: 0.5 + index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const btn = e.currentTarget.querySelector('button');

    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        const successMsg = document.createElement('div');
        successMsg.textContent = '¡Mensaje enviado con éxito!';
        successMsg.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(45deg, #00ff88, #ff00ff);
          color: #0a0a0a;
          padding: 2rem 3rem;
          border-radius: 10px;
          font-weight: 600;
          z-index: 10000;
        `;
        document.body.appendChild(successMsg);

        gsap.fromTo(
          successMsg,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3 }
        );

        setTimeout(() => {
          gsap.to(successMsg, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => successMsg.remove(),
          });
        }, 3000);

        setFormData({ name: '', email: '', message: '' });
      },
    });
  };

  return (
    <section id="contact" className="py-32 px-8 md:px-16 max-w-[800px] mx-auto text-center">
      <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-8">Hablemos</h2>
      <p ref={subtitleRef} className="text-xl text-gray-400 mb-12">
        ¿Tienes un proyecto en mente? Nos encantaría saber de ti.
      </p>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
        <div className="form-group text-left">
          <label htmlFor="name" className="block mb-2 text-gray-400">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="email" className="block mb-2 text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="message" className="block mb-2 text-gray-400">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-12 py-4 bg-gradient-to-r from-primary to-secondary text-dark font-semibold rounded-full transition-all duration-300 hover:translate-y-[-3px] hover:shadow-[0_20px_40px_rgba(0,255,136,0.3)] self-center"
        >
          Enviar Mensaje
        </button>
      </form>
    </section>
  );
}
