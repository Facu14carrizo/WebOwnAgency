import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-8 md:px-16 border-t border-white/10 text-center">
      <div className="flex justify-center gap-8 mb-8">
        <a
          href="#"
          className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:border-primary hover:text-primary hover:translate-y-[-3px]"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:border-primary hover:text-primary hover:translate-y-[-3px]"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:border-primary hover:text-primary hover:translate-y-[-3px]"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
      <p className="text-gray-400">&copy; 2025 WaveFrame Studio. Todos los derechos reservados.</p>
    </footer>
  );
}
