import { NextRequest, NextResponse } from 'next/server'

// Simulación de base de conocimientos para respuestas del chatbot
const knowledgeBase = {
  saludos: [
    'hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi'
  ],
  servicios: [
    'servicios', 'qué ofrecen', 'productos', 'soluciones', 'automatización'
  ],
  precios: [
    'precio', 'costo', 'cuánto cuesta', 'tarifas', 'planes'
  ],
  soporte: [
    'ayuda', 'soporte', 'problema', 'error', 'no funciona'
  ],
  contacto: [
    'contacto', 'teléfono', 'email', 'dirección', 'ubicación'
  ],
  horarios: [
    'horario', 'horarios', 'cuándo', 'disponibilidad', 'abierto'
  ]
}

const responses = {
  saludos: [
    '¡Hola! Es un placer ayudarte. ¿En qué puedo asistirte hoy?',
    '¡Buenos días! Estoy aquí para resolver todas tus dudas sobre nuestros servicios.',
    '¡Hola! Soy tu asistente de IA. ¿Cómo puedo hacer tu día más fácil?'
  ],
  servicios: [
    'Ofrecemos soluciones completas de automatización con IA para atención al cliente, incluyendo:\n\n• Chatbots inteligentes con procesamiento de lenguaje natural\n• Sistema de tickets automatizado\n• Análisis de datos y métricas en tiempo real\n• Integración con CRM y sistemas existentes\n• Atención 24/7 sin interrupciones',
    'Nuestras soluciones incluyen chatbots avanzados, gestión automatizada de tickets, análisis predictivo de datos y integración completa con tus sistemas actuales. Todo diseñado para mejorar la experiencia del cliente y reducir costos operativos.'
  ],
  precios: [
    'Nuestros planes se adaptan a empresas de todos los tamaños:\n\n• Plan Básico: Ideal para pequeñas empresas\n• Plan Profesional: Para medianas empresas con mayor volumen\n• Plan Enterprise: Soluciones personalizadas para grandes corporaciones\n\nContacta con nuestro equipo comercial para una cotización personalizada según tus necesidades específicas.',
    'Ofrecemos planes flexibles desde $99/mes para pequeñas empresas hasta soluciones enterprise personalizadas. Todos incluyen soporte técnico, actualizaciones automáticas y garantía de disponibilidad del 99.9%.'
  ],
  soporte: [
    'Nuestro equipo de soporte está disponible 24/7 para ayudarte:\n\n• Chat en vivo en nuestra plataforma\n• Email: soporte@automateai.com\n• Teléfono: +1 (555) 123-4567\n• Base de conocimientos completa\n• Videos tutoriales paso a paso\n\n¿Hay algún problema específico que pueda ayudarte a resolver ahora?',
    'Estoy aquí para ayudarte con cualquier problema. También puedes contactar a nuestro equipo técnico especializado a través de soporte@automateai.com o llamando al +1 (555) 123-4567. ¿Cuál es el inconveniente que estás experimentando?'
  ],
  contacto: [
    'Puedes contactarnos a través de:\n\n📧 Email: contacto@automateai.com\n📞 Teléfono: +1 (555) 123-4567\n📍 Dirección: Madrid, España\n🌐 Web: www.automateai.com\n\nNuestro equipo comercial responde en menos de 2 horas durante días laborables.',
    'Estamos ubicados en Madrid, España. Puedes escribirnos a contacto@automateai.com o llamarnos al +1 (555) 123-4567. También ofrecemos reuniones virtuales para demostraciones personalizadas de nuestras soluciones.'
  ],
  horarios: [
    'Nuestros servicios de IA funcionan 24/7, los 365 días del año.\n\nPara soporte humano:\n• Lunes a Viernes: 9:00 - 18:00 (CET)\n• Sábados: 10:00 - 14:00 (CET)\n• Domingos: Solo emergencias\n\nEl chatbot y los sistemas automatizados nunca descansan, garantizando atención continua a tus clientes.',
    'Nuestros sistemas de automatización trabajan sin descanso, 24 horas al día, 7 días a la semana. Para consultas comerciales y soporte técnico especializado, nuestro equipo está disponible de lunes a viernes de 9:00 a 18:00 CET.'
  ],
  default: [
    'Entiendo tu consulta. Aunque no tengo una respuesta específica para eso, puedo ayudarte con información sobre nuestros servicios de automatización, precios, soporte técnico o ponerte en contacto con un especialista humano. ¿Qué te interesa más?',
    'Esa es una pregunta interesante. Te recomiendo contactar directamente con nuestro equipo especializado en contacto@automateai.com o al +1 (555) 123-4567 para obtener información más detallada. ¿Hay algo más en lo que pueda ayudarte?',
    'No estoy seguro de cómo responder a esa consulta específica, pero puedo ayudarte con información sobre nuestros servicios, precios, soporte o contacto. También puedo crear un ticket de soporte para que un especialista te contacte. ¿Qué prefieres?'
  ]
}

function categorizeQuestion(question: string): string {
  const lowerQuestion = question.toLowerCase()
  
  for (const [category, keywords] of Object.entries(knowledgeBase)) {
    if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return category
    }
  }
  
  return 'default'
}

function getRandomResponse(category: string): string {
  const categoryResponses = responses[category as keyof typeof responses] || responses.default
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question } = body

    // Validación de entrada
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'La pregunta es requerida y debe ser un texto válido' },
        { status: 400 }
      )
    }

    if (question.trim().length === 0) {
      return NextResponse.json(
        { error: 'La pregunta no puede estar vacía' },
        { status: 400 }
      )
    }

    if (question.length > 1000) {
      return NextResponse.json(
        { error: 'La pregunta es demasiado larga. Máximo 1000 caracteres.' },
        { status: 400 }
      )
    }

    // Simular tiempo de procesamiento de IA
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))

    // Categorizar la pregunta y obtener respuesta
    const category = categorizeQuestion(question.trim())
    const response = getRandomResponse(category)

    // Log para monitoreo (en producción usarías un sistema de logging real)
    console.log(`[Chatbot] Pregunta: "${question}" | Categoría: ${category} | Timestamp: ${new Date().toISOString()}`)

    return NextResponse.json({
      response,
      category,
      timestamp: new Date().toISOString(),
      confidence: category === 'default' ? 0.3 : 0.85
    })

  } catch (error) {
    console.error('Error en chatbot API:', error)
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor. Por favor, intenta nuevamente.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Método GET para verificar el estado de la API
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Chatbot API funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: 'Enviar pregunta al chatbot',
      GET: 'Verificar estado de la API'
    }
  })
}

// Rechazar otros métodos HTTP
export async function PUT() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  )
}
