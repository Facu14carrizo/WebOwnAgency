import React from 'react';

export default function Legales() {
  return (
    <div className="min-h-screen bg-dark text-white relative">
      {/* Fondo con blur muy sutil */}
      <div className="absolute inset-0 backdrop-blur pointer-events-none" style={{ minHeight: '100vh' }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Columna izquierda - Título fijo manteniendo posición original del grid */}
          <div className="md:sticky md:top-20 md:h-fit md:flex md:flex-col md:justify-start relative">
            <div className="md:-ml-16 md:pr-8 md:overflow-visible">
              {/* Título fijo que se superpone en la misma posición */}
              <div className="hidden md:block md:fixed md:top-24" style={{ left: 'calc((100% - 1400px) / 2 + 2rem - 4rem)' }}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 whitespace-nowrap">
                  <span style={{ color: '#00ff88' }}>Términos y</span> Condiciones
                </h1>
                <p className="text-gray-400 text-lg mb-1">
                  Por favor, lea detenidamente estos términos antes de usar este sitio web.
                </p>
                <p className="text-gray-400 text-lg">
                  Al acceder o utilizar nuestro sitio, aceptas todos estos términos legales.
                </p>
              </div>
              {/* Espaciador invisible para mantener el layout del grid */}
              <div className="md:opacity-0 md:pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 whitespace-nowrap">
                  <span style={{ color: '#00ff88' }}>Términos y</span> Condiciones
                </h1>
                <p className="text-gray-400 text-lg mb-1">
                  Por favor, lea detenidamente estos términos antes de usar este sitio web.
                </p>
                <p className="text-gray-400 text-lg">
                  Al acceder o utilizar nuestro sitio, aceptas todos estos términos legales.
                </p>
              </div>
            </div>
          </div>
          {/* Columna derecha - Contenido */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">1. Aceptación de los Terminos</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                El uso de este sitio web implica la aceptación plena de los presentes términos y condiciones. Si no está de acuerdo con alguno de ellos, por favor no utilice este sitio.
              </p>
            </section>
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">2. Modificación de los Términos</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor automáticamente una vez publicados en este sitio web.
              </p>
            </section>
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">3. Derechos de Propiedad Intelectual</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Todos los contenidos, logotipos, gráficos, textos y software son propiedad de WaveFrame o de sus licenciatarios. Queda prohibida su reproducción, distribución o modificación sin autorización escrita.
              </p>
            </section>
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">4. Responsabilidades y Garantías</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                No garantizamos la disponibilidad, continuidad ni infalibilidad del funcionamiento de este sitio. Nos reservamos el derecho de suspenderlo sin previo aviso. El uso del sitio es bajo su propia responsabilidad.
              </p>
            </section>
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">5. Enlaces Externos</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Este sitio puede contener enlaces a sitios de terceros. No somos responsables de los contenidos ni de las políticas de privacidad de dichos sitios.
              </p>
            </section>
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">6. Legislación Aplicable y Jurisdicción</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Los presentes términos se rigen por las leyes de la República Argentina. Cualquier disputa derivada del uso de este sitio será sometida a la jurisdicción de los tribunales de Buenos Aires, Argentina.
              </p>
            </section>
            <div className="pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                <strong>Última actualización:</strong> Enero 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
