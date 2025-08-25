import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revoluciona tu{' '}
              <span className="text-blue-600">Atención al Cliente</span>
              <br />
              con Inteligencia Artificial
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Optimiza tiempos de respuesta, reduce costos operativos y ofrece 
              atención 24/7 con nuestro sistema de automatización inteligente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/chatbot"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                Probar Chatbot IA
              </Link>
              <Link
                href="/tickets"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg border-2 border-blue-600"
              >
                Sistema de Tickets
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-5xl mx-auto">
            <img
              src="https://placehold.co/1920x1080?text=Modern+AI+automation+dashboard+interface+with+customer+service+analytics+and+chatbot+integration"
              alt="Interfaz moderna de automatización con IA mostrando dashboard de atención al cliente, analytics y integración de chatbot"
              className="w-full h-auto rounded-2xl shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro sistema integral de automatización transforma la experiencia 
              de atención al cliente con tecnología de vanguardia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chatbot Inteligente
              </h3>
              <p className="text-gray-600">
                Respuestas automáticas a preguntas frecuentes con procesamiento 
                de lenguaje natural avanzado
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">🎫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sistema de Tickets
              </h3>
              <p className="text-gray-600">
                Gestión organizada de consultas y problemas con seguimiento 
                automático y priorización inteligente
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Análisis de Datos
              </h3>
              <p className="text-gray-600">
                Insights profundos sobre interacciones de clientes para 
                optimizar continuamente el servicio
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors duration-200">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Disponibilidad 24/7
              </h3>
              <p className="text-gray-600">
                Atención ininterrumpida sin necesidad de personal humano, 
                mejorando la satisfacción del cliente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Beneficios para tu Empresa
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Reducción de Costos Operativos
                    </h3>
                    <p className="text-gray-600">
                      Hasta 60% menos gastos en personal de atención al cliente 
                      manteniendo la calidad del servicio
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Mejora en Tiempos de Respuesta
                    </h3>
                    <p className="text-gray-600">
                      Respuestas instantáneas que aumentan la satisfacción 
                      del cliente y reducen la tasa de abandono
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Escalabilidad Automática
                    </h3>
                    <p className="text-gray-600">
                      Maneja miles de consultas simultáneas sin degradación 
                      del servicio o costos adicionales
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://placehold.co/800x600?text=Professional+customer+service+team+working+with+AI+automation+tools+and+analytics+dashboard"
                alt="Equipo profesional de atención al cliente trabajando con herramientas de automatización IA y dashboard de analytics"
                className="w-full h-auto rounded-2xl shadow-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para Transformar tu Atención al Cliente?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a las empresas líderes que ya están revolucionando su 
            servicio al cliente con nuestra tecnología de automatización IA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chatbot"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Comenzar Ahora
            </Link>
            <Link
              href="/analytics"
              className="bg-transparent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 border-2 border-white"
            >
              Ver Análisis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
