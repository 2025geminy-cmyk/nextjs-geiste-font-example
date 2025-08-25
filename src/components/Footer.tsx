export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">AutomateAI</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Líder en soluciones de automatización con inteligencia artificial para 
              atención al cliente. Optimizamos tiempos de respuesta y aumentamos la 
              satisfacción del cliente con tecnología de vanguardia.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📧 contacto@automateai.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 Madrid, España</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Chatbot Inteligente
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Sistema de Tickets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Análisis de Datos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Integración CRM
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 AutomateAI. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            🔒 Sitio web seguro con encriptación SSL y medidas de ciberseguridad avanzadas. 
            Sus datos están protegidos bajo los más altos estándares de seguridad.
          </p>
        </div>
      </div>
    </footer>
  )
}
