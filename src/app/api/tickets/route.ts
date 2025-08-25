import { NextRequest, NextResponse } from 'next/server'

interface Ticket {
  id: number
  title: string
  description: string
  status: 'abierto' | 'en_progreso' | 'resuelto' | 'cerrado'
  priority: 'baja' | 'media' | 'alta' | 'urgente'
  createdAt: string
  updatedAt: string
}

// Simulación de base de datos en memoria (en producción usarías una base de datos real)
let tickets: Ticket[] = [
  {
    id: 1,
    title: 'Problema con la integración del chatbot',
    description: 'El chatbot no responde correctamente a las consultas sobre precios. Necesito ayuda para configurar las respuestas automáticas.',
    status: 'en_progreso',
    priority: 'alta',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
    updatedAt: new Date(Date.now() - 3600000).toISOString()   // 1 hora atrás
  },
  {
    id: 2,
    title: 'Consulta sobre planes enterprise',
    description: 'Necesito información detallada sobre los planes enterprise para una empresa de 500+ empleados. ¿Incluyen soporte dedicado?',
    status: 'resuelto',
    priority: 'media',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 días atrás
    updatedAt: new Date(Date.now() - 86400000).toISOString()   // 1 día atrás
  },
  {
    id: 3,
    title: 'Error en el dashboard de analytics',
    description: 'Las métricas no se están actualizando en tiempo real. Los datos mostrados son de hace 3 horas.',
    status: 'abierto',
    priority: 'urgente',
    createdAt: new Date(Date.now() - 7200000).toISOString(),  // 2 horas atrás
    updatedAt: new Date(Date.now() - 7200000).toISOString()   // 2 horas atrás
  },
  {
    id: 4,
    title: 'Solicitud de capacitación del equipo',
    description: 'Queremos programar una sesión de capacitación para nuestro equipo de soporte sobre el uso avanzado de la plataforma.',
    status: 'abierto',
    priority: 'baja',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 días atrás
    updatedAt: new Date(Date.now() - 259200000).toISOString()  // 3 días atrás
  }
]

let nextId = 5

// Función para validar datos del ticket
function validateTicketData(data: any) {
  const errors: string[] = []

  if (!data.title || typeof data.title !== 'string') {
    errors.push('El título es requerido y debe ser un texto válido')
  } else if (data.title.trim().length === 0) {
    errors.push('El título no puede estar vacío')
  } else if (data.title.length > 100) {
    errors.push('El título no puede exceder 100 caracteres')
  }

  if (!data.description || typeof data.description !== 'string') {
    errors.push('La descripción es requerida y debe ser un texto válido')
  } else if (data.description.trim().length === 0) {
    errors.push('La descripción no puede estar vacía')
  } else if (data.description.length > 500) {
    errors.push('La descripción no puede exceder 500 caracteres')
  }

  if (data.priority && !['baja', 'media', 'alta', 'urgente'].includes(data.priority)) {
    errors.push('La prioridad debe ser: baja, media, alta o urgente')
  }

  return errors
}

// Función para determinar el estado inicial basado en la prioridad
function getInitialStatus(priority: string): 'abierto' | 'en_progreso' {
  return priority === 'urgente' ? 'en_progreso' : 'abierto'
}

// GET - Obtener todos los tickets
export async function GET(request: NextRequest) {
  try {
    // Simular latencia de base de datos
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500))

    // Obtener parámetros de consulta para filtrado (opcional)
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let filteredTickets = [...tickets]

    // Filtrar por estado si se proporciona
    if (status && ['abierto', 'en_progreso', 'resuelto', 'cerrado'].includes(status)) {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === status)
    }

    // Filtrar por prioridad si se proporciona
    if (priority && ['baja', 'media', 'alta', 'urgente'].includes(priority)) {
      filteredTickets = filteredTickets.filter(ticket => ticket.priority === priority)
    }

    // Ordenar por fecha de creación (más recientes primero)
    filteredTickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Paginación
    const paginatedTickets = filteredTickets.slice(offset, offset + limit)

    // Log para monitoreo
    console.log(`[Tickets API] GET - Returned ${paginatedTickets.length} tickets | Filters: status=${status}, priority=${priority} | Timestamp: ${new Date().toISOString()}`)

    return NextResponse.json({
      tickets: paginatedTickets,
      total: filteredTickets.length,
      limit,
      offset,
      hasMore: offset + limit < filteredTickets.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error en GET /api/tickets:', error)
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor al obtener tickets',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo ticket
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos de entrada
    const validationErrors = validateTicketData(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Datos de entrada inválidos',
          details: validationErrors,
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      )
    }

    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

    // Crear nuevo ticket
    const newTicket: Ticket = {
      id: nextId++,
      title: body.title.trim(),
      description: body.description.trim(),
      priority: body.priority || 'media',
      status: getInitialStatus(body.priority || 'media'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Agregar a la "base de datos"
    tickets.unshift(newTicket) // Agregar al inicio para que aparezca primero

    // Log para monitoreo
    console.log(`[Tickets API] POST - Created ticket #${newTicket.id} | Priority: ${newTicket.priority} | Status: ${newTicket.status} | Timestamp: ${new Date().toISOString()}`)

    // Simular notificación automática (en producción enviarías emails reales)
    console.log(`[Notification] New ticket created: "${newTicket.title}" - Priority: ${newTicket.priority}`)

    return NextResponse.json({
      ticket: newTicket,
      message: 'Ticket creado exitosamente',
      timestamp: new Date().toISOString()
    }, { status: 201 })

  } catch (error) {
    console.error('Error en POST /api/tickets:', error)
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor al crear ticket',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un ticket existente (para uso futuro)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, priority } = body

    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'ID de ticket requerido y debe ser un número' },
        { status: 400 }
      )
    }

    const ticketIndex = tickets.findIndex(ticket => ticket.id === id)
    if (ticketIndex === -1) {
      return NextResponse.json(
        { error: 'Ticket no encontrado' },
        { status: 404 }
      )
    }

    // Actualizar campos permitidos
    if (status && ['abierto', 'en_progreso', 'resuelto', 'cerrado'].includes(status)) {
      tickets[ticketIndex].status = status
    }

    if (priority && ['baja', 'media', 'alta', 'urgente'].includes(priority)) {
      tickets[ticketIndex].priority = priority
    }

    tickets[ticketIndex].updatedAt = new Date().toISOString()

    console.log(`[Tickets API] PUT - Updated ticket #${id} | New status: ${tickets[ticketIndex].status} | Timestamp: ${new Date().toISOString()}`)

    return NextResponse.json({
      ticket: tickets[ticketIndex],
      message: 'Ticket actualizado exitosamente',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error en PUT /api/tickets:', error)
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor al actualizar ticket',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un ticket (para uso administrativo)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')

    if (!id) {
      return NextResponse.json(
        { error: 'ID de ticket requerido' },
        { status: 400 }
      )
    }

    const ticketIndex = tickets.findIndex(ticket => ticket.id === id)
    if (ticketIndex === -1) {
      return NextResponse.json(
        { error: 'Ticket no encontrado' },
        { status: 404 }
      )
    }

    const deletedTicket = tickets.splice(ticketIndex, 1)[0]

    console.log(`[Tickets API] DELETE - Deleted ticket #${id} | Timestamp: ${new Date().toISOString()}`)

    return NextResponse.json({
      message: 'Ticket eliminado exitosamente',
      deletedTicket,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error en DELETE /api/tickets:', error)
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor al eliminar ticket',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
