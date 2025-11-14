import { Mail, Smartphone, MapPin, Calendar, CheckCircle, MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';

const motivos1 = [
  'Consulta inicial gratuita de 30 minutos',
  'Metodología ágil con entregas semanales',
  'Equipo multidisciplinario y certificado',
];
const motivos2 = [
  'Propuesta personalizada en 48 horas',
  'Soporte técnico continuo y personalizado',
  'Garantía de satisfacción 100%'
];

const proyectos = [
  'App web',
  'App móvil',
  'App de escritorio',
  'Landing page',
  'Ecommerce',
  'Automatización',
  'Bots',
];
const tiempos = [
  'Indefinido',
  'Urgente (1-2 semanas)',
  'Normal (1-2 meses)',
  'Flexible (+3 meses)',
];

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    tipoProyecto: '',
    tiempoProyecto: '',
    mensaje: ''
  });
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (showForm) {
      // Animación de overlay (fade)
      if(overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.44, ease: 'power2.out' }
        );
      }
      // Animación sidebar desde LA IZQUIERDA
      if(sidebarRef.current){
        gsap.fromTo(sidebarRef.current, {
          x: -window.innerWidth,
          opacity: 0,
          skewX: 24,
          scale: 0.94,
          filter: 'blur(18px)',
          boxShadow: '0 0 0px #00ff8833'
        }, {
          x: 0,
          opacity: 1,
          skewX: 0,
          scale: 1,
          filter: 'blur(0px)',
          boxShadow: '0 8px 36px 2px #00ff8855',
          duration: 1.15,
          ease: 'elastic.out(1, 0.58)',
        });
        // Animación de hijos escalonada (excluyendo el botón submit para mantener su estilo)
        const childs = gsap.utils.toArray(
          (sidebarRef.current as HTMLDivElement).querySelectorAll(
            'h2, form > *, form > * > *, form > * label, form > * input, form > * select, form > * textarea'
          )
        );
        gsap.from(childs, {
          y: 40,
          opacity: 0,
          scale: 0.94,
          filter: 'blur(10px)',
          stagger: 0.08,
          duration: 0.55,
          delay: 0.18,
          ease: 'power3.out',
          clearProps: 'filter,blur',
        });
        // Animar el botón submit por separado sin limpiar su background
        const submitButton = (sidebarRef.current as HTMLDivElement)?.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton) {
          gsap.from(submitButton, {
            y: 40,
            opacity: 0,
            scale: 0.94,
            filter: 'blur(10px)',
            duration: 0.55,
            delay: 0.18 + (childs.length * 0.08),
            ease: 'power3.out',
            clearProps: 'filter,blur,y,opacity,scale',
          });
        }
      }
    } else {
      // Reset form cuando se cierra
      setFormData({
        nombre: '',
        email: '',
        empresa: '',
        tipoProyecto: '',
        tiempoProyecto: '',
        mensaje: ''
      });
      setSubmitStatus('idle');
    }
  }, [showForm]);

  const handleClose = () => {
    setShowForm(false);
  };

  // Asegurar que el botón de cerrar funcione
  useEffect(() => {
    if (showForm && closeButtonRef.current) {
      const button = closeButtonRef.current;
      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowForm(false);
      };
      button.addEventListener('click', handleClick);
      return () => {
        button.removeEventListener('click', handleClick);
      };
    }
  }, [showForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Configuración de EmailJS desde variables de entorno
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug: verificar variables en desarrollo
      if (import.meta.env.DEV) {
        console.log('EmailJS Config:', {
          serviceId: serviceId ? '✓' : '✗',
          templateId: templateId ? '✓' : '✗',
          publicKey: publicKey ? '✓' : '✗',
        });
      }

      // Validar que las credenciales estén configuradas
      if (!serviceId || !templateId || !publicKey) {
        const missing = [];
        if (!serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
        if (!templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
        throw new Error(`Las credenciales de EmailJS no están configuradas. Faltan: ${missing.join(', ')}`);
      }

      // Preparar los parámetros del template
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        empresa: formData.empresa || 'No especificada',
        tipo_proyecto: formData.tipoProyecto || 'No especificado',
        tiempo_proyecto: formData.tiempoProyecto || 'No especificado',
        message: formData.mensaje,
        to_email: 'wave1frame@gmail.com'
      };

      // Enviar el email
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setSubmitStatus('success');
      // Cerrar el formulario después de 3 segundos
      setTimeout(() => {
        setShowForm(false);
      }, 3000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-[950px] mx-auto px-4 py-20" id="contacto">
      {/* Sidebar Drawer Form */}
      {showForm && (
        <div className="fixed z-[9999] inset-0 flex flex-col md:flex-row">
          {/* Overlay - solo visible en desktop */}
          <div ref={overlayRef} className="hidden md:flex bg-black/60 flex-1" onClick={() => setShowForm(false)} />
          {/* Sidebar - full width en móvil, ancho fijo en desktop */}
          <div ref={sidebarRef} className="w-full md:w-[430px] md:max-w-md h-screen pt-20 md:pt-16 bg-[#15181b] md:border-l border-white/10 shadow-2xl pb-8 px-4 sm:px-7 relative overflow-y-auto">
            <button 
              ref={closeButtonRef}
              className="absolute top-4 right-4 text-white hover:text-primary bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors z-[99999] active:scale-95 cursor-pointer"
              onClick={handleClose}
              aria-label="Cerrar formulario"
              type="button"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 99999,
              }}
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h2 className="text-xl font-bold mb-6">Contanos sobre tu proyecto</h2>
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-300 text-sm">Te contactaremos pronto a través de tu email.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8">
                <div>
                  <label className="text-sm font-medium text-white block mb-1">Nombre Completo <span className="text-primary">*</span></label>
                  <input 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full rounded bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-primary placeholder-gray-400" 
                    placeholder="Tu nombre" 
                    required 
                    autoFocus 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-1">Email <span className="text-primary">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-primary placeholder-gray-400" 
                    placeholder="email@ejemplo.com" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-1">Empresa</label>
                  <input 
                    type="text" 
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full rounded bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-primary placeholder-gray-400" 
                    placeholder="Tu empresa" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-1">Tipo de Proyecto <span className="text-primary">*</span></label>
                  <div className="relative">
                    <select
                      name="tipoProyecto"
                      value={formData.tipoProyecto}
                      onChange={handleInputChange}
                      className="w-full rounded bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white outline-none pr-10 appearance-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 transition-colors"
                      required
                    >
                      <option className='bg-black/90 text-white' value="">Selecciona una opción</option>
                      {proyectos.map(p => <option className='bg-black/90 text-white' key={p} value={p}>{p}</option>)}
                    </select>
                    {/* Flecha custom */}
                    <svg className="pointer-events-none w-4 h-4 text-primary absolute top-1/2 right-4 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-1">Tiempo del Proyecto</label>
                  <div className="relative">
                    <select
                      name="tiempoProyecto"
                      value={formData.tiempoProyecto}
                      onChange={handleInputChange}
                      className="w-full rounded bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white outline-none pr-10 appearance-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 transition-colors"
                    >
                      <option className='bg-black/90 text-white' value="">Selecciona una opción</option>
                      {tiempos.map((t) => <option className='bg-black/90 text-white' key={t} value={t}>{t}</option>)}
                    </select>
                    <svg className="pointer-events-none w-4 h-4 text-primary absolute top-1/2 right-4 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-1">Contanos sobre tu proyecto <span className="text-primary">*</span></label>
                  <textarea 
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    className="w-full min-h-[80px] rounded bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-primary placeholder-gray-400 resize-y" 
                    placeholder="Describe tu proyecto, objetivos y cualquier requisito o contexto especifico..." 
                    required 
                  />
                </div>
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded p-3 text-sm text-red-300">
                    Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente por email.
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex gap-2 items-center text-center mt-4 w-full justify-center text-white py-3 rounded font-semibold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: isSubmitting 
                      ? 'linear-gradient(135deg, #cc00cc 0%, #990099 100%)'
                      : 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 255, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center mb-5">
        <button className="px-4 py-2 border border-white/20 rounded bg-transparent text-xs text-gray-200 hover:bg-primary/10">
          <MessageCircle className="inline w-4 h-4 mr-2" /> CONTACTO
        </button>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        <span style={{ color: '#00ff88' }}>Comencemos</span> Tu Proyecto
      </h2>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        ¿Listo para transformar tu idea en realidad digital? Agenda una consulta gratuita y descubre cómo podemos impulsar tu negocio al siguiente nivel.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Email */}
        <div className="bg-black/70 border border-white/10 rounded-xl p-8 flex flex-col items-center">
          <Mail className="w-10 h-10 mb-3 text-primary" />
          <div className="text-xl font-semibold text-white mb-1">Email</div>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText('wave1frame@gmail.com');
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="text-primary text-sm hover:underline mb-1 relative focus:outline-none focus:ring-2 focus:ring-primary rounded"
            style={{ userSelect: 'all' }}
            type="button"
          >
            wave1frame@gmail.com
            {copied && (
              <span className="ml-2 text-xs text-primary bg-black/80 rounded px-2 py-0.5 shadow transition-all duration-500 animate-fadeInOut absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap z-10">
                ¡Copiado!
              </span>
            )}
          </button>
          <div className="text-gray-400 text-xs">Respuesta en 24 horas</div>
        </div>
        {/* WhatsApp */}
        <div className="bg-black/70 border border-white/10 rounded-xl p-8 flex flex-col items-center">
          <Smartphone className="w-10 h-10 mb-3 text-primary" />
          <div className="text-xl font-semibold text-white mb-1">WhatsApp</div>
          <a href="https://wa.me/5491163704522" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline mb-0.5">
            +54 9 11 6370-4522
          </a>
          <a href="https://wa.me/543876117799" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline mb-1">
            +54 387 611-7799
          </a>
          <div className="text-gray-400 text-xs">Lun a Sab, 8-22hs</div>
        </div>
        {/* Oficina */}
        <div className="bg-black/70 border border-white/10 rounded-xl p-8 flex flex-col items-center">
          <MapPin className="w-10 h-10 mb-3 text-primary" />
          <div className="text-xl font-semibold text-white mb-1">Oficina</div>
          <div className="text-primary text-sm mb-1">Buenos Aires, Argentina</div>
          <div className="text-gray-400 text-xs">Reuniones presenciales o virtuales</div>
        </div>
      </div>
      <div className="bg-black/70 border border-white/10 rounded-xl py-10 px-6 text-center mb-10 flex flex-col items-center">
        <Calendar className="mx-auto w-12 h-12 mb-4" style={{ color: '#ff00ff' }} />
        <div className="text-lg md:text-xl font-semibold text-white mb-2">¿Prefieres hablar directamente?</div>
        <div className="text-gray-300 mb-5">Agenda una videollamada de 30 minutos para discutir tu proyecto en detalle.</div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 rounded font-semibold text-sm transition-colors flex items-center gap-2 justify-center text-white"
          style={{ 
            background: 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Send className="w-5 h-5" /> Agendar reunión gratuita
        </button>
      </div>
      <h3 className="text-xl text-white font-bold text-center mb-6">¿Por qué elegirnos?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto text-[15px]">
        <div>
          {motivos1.map(m => (
            <div key={m} className="flex items-start gap-2 text-gray-200 mb-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
              <span>{m}</span>
            </div>
          ))}
        </div>
        <div>
          {motivos2.map(m => (
            <div key={m} className="flex items-start gap-2 text-gray-200 mb-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
              <span>{m}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
