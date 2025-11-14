export default function Privacy() {
  return (
    <div className="min-h-screen bg-dark text-white relative">
      {/* Fondo con blur - solo cubre el contenido de esta página */}
      <div className="absolute inset-0 bg-dark/30 backdrop-blur-sm pointer-events-none" style={{ minHeight: '100vh' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Columna izquierda - Título fijo manteniendo posición original del grid */}
          <div className="md:sticky md:top-20 md:h-fit md:flex md:flex-col md:justify-start relative">
            <div className="md:-ml-16 md:pr-8 md:overflow-visible">
              {/* Título fijo que se superpone en la misma posición */}
              <div className="hidden md:block md:fixed md:top-24" style={{ left: 'calc((100% - 1400px) / 2 + 2rem - 4rem)' }}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 whitespace-nowrap">
                  <span style={{ color: '#00ff88' }}>Política de</span> Privacidad
                </h1>
                <p className="text-gray-400 text-lg mb-1">
                  Tu privacidad es importante para nosotros. Esta política describe cómo
                </p>
                <p className="text-gray-400 text-lg">
                  recopilamos, usamos y protegemos tu información personal.
                </p>
              </div>
              {/* Espaciador invisible para mantener el layout del grid */}
              <div className="md:opacity-0 md:pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 whitespace-nowrap">
                  <span style={{ color: '#00ff88' }}>Política de</span> Privacidad
                </h1>
                <p className="text-gray-400 text-lg mb-1">
                  Tu privacidad es importante para nosotros.
                </p>
                <p className="text-gray-400 text-lg">
                  Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha - Contenido */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                1. Información que Recopilamos
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Recopilamos información que nos proporcionas directamente cuando utilizas nuestros servicios, incluyendo:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Nombre y datos de contacto (email, teléfono)</li>
                <li>Información de la empresa o proyecto</li>
                <li>Mensajes y comunicaciones que nos envías</li>
                <li>Información de navegación y uso de nuestro sitio web</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                2. Cómo Usamos tu Información
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Responder a tus consultas y solicitudes</li>
                <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
                <li>Analizar el uso de nuestro sitio web para mejorar la experiencia del usuario</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                3. Protección de Datos
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                4. Compartir Información
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Con tu consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales</li>
                <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio (bajo acuerdos de confidencialidad)</li>
                <li>En caso de fusión, adquisición o venta de activos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                5. Tus Derechos
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Acceder a tu información personal</li>
                <li>Rectificar datos inexactos o incompletos</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Solicitar la portabilidad de tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                6. Cookies y Tecnologías Similares
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                7. Cambios a esta Política
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                8. Contacto
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Si tienes preguntas o inquietudes sobre esta política de privacidad o sobre cómo manejamos tu información personal, puedes contactarnos en:
              </p>
              <p className="text-gray-300">
                <strong className="text-primary">Email:</strong> wave1frame@gmail.com
                <br />
                <strong className="text-primary">Teléfono:</strong> +54 9 11 6370-4522
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

