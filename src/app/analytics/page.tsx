'use client'

import { useState, useEffect, useRef } from 'react'

interface AnalyticsData {
  totalInteractions: number
  totalTickets: number
  avgResponseTime: number
  customerSatisfaction: number
  monthlyInteractions: number[]
  ticketsByStatus: {
    abierto: number
    en_progreso: number
    resuelto: number
    cerrado: number
  }
  topQuestions: Array<{
    question: string
    count: number
    category: string
  }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  useEffect(() => {
    if (data && chartRef.current) {
      drawChart()
    }
  }, [data])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Simular carga de datos de analytics
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Datos simulados (en producción vendrían de una API real)
      const mockData: AnalyticsData = {
        totalInteractions: 15847,
        totalTickets: 342,
        avgResponseTime: 1.8,
        customerSatisfaction: 94.2,
        monthlyInteractions: [8500, 9200, 10100, 11300, 12800, 13900, 14200, 15100, 15847],
        ticketsByStatus: {
          abierto: 23,
          en_progreso: 15,
          resuelto: 287,
          cerrado: 17
        },
        topQuestions: [
          { question: '¿Cuáles son sus precios?', count: 1247, category: 'precios' },
          { question: '¿Cómo funciona el chatbot?', count: 892, category: 'servicios' },
          { question: '¿Tienen soporte 24/7?', count: 743, category: 'soporte' },
          { question: '¿Qué incluye el plan enterprise?', count: 634, category: 'precios' },
          { question: 'Problemas con la integración', count: 521, category: 'soporte' }
        ]
      }

      setData(mockData)
    } catch (err) {
      setError('Error al cargar los datos de analytics. Por favor, intenta nuevamente.')
      console.error('Analytics error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const drawChart = () => {
    const canvas = chartRef.current
    if (!canvas || !data) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height)

    // Configurar estilos
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, width, height)

    // Datos del gráfico
    const monthlyData = data.monthlyInteractions
    const maxValue = Math.max(...monthlyData)
    const minValue = Math.min(...monthlyData)
    const valueRange = maxValue - minValue

    // Dibujar ejes
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.beginPath()
    
    // Eje Y
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    
    // Eje X
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Dibujar líneas de cuadrícula
    ctx.strokeStyle = '#f1f5f9'
    ctx.lineWidth = 0.5
    
    for (let i = 1; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Dibujar línea del gráfico
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.beginPath()

    monthlyData.forEach((value, index) => {
      const x = padding + (chartWidth / (monthlyData.length - 1)) * index
      const y = height - padding - ((value - minValue) / valueRange) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Dibujar puntos
    ctx.fillStyle = '#3b82f6'
    monthlyData.forEach((value, index) => {
      const x = padding + (chartWidth / (monthlyData.length - 1)) * index
      const y = height - padding - ((value - minValue) / valueRange) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Dibujar área bajo la curva
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    
    monthlyData.forEach((value, index) => {
      const x = padding + (chartWidth / (monthlyData.length - 1)) * index
      const y = height - padding - ((value - minValue) / valueRange) * chartHeight
      ctx.lineTo(x, y)
    })
    
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()

    // Etiquetas del eje Y
    ctx.fillStyle = '#64748b'
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'right'
    
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange / 5) * (5 - i)
      const y = padding + (chartHeight / 5) * i
      ctx.fillText(Math.round(value).toLocaleString(), padding - 10, y + 4)
    }

    // Etiquetas del eje X (meses)
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']
    ctx.textAlign = 'center'
    
    monthlyData.forEach((_, index) => {
      const x = padding + (chartWidth / (monthlyData.length - 1)) * index
      ctx.fillText(months[index] || `M${index + 1}`, x, height - padding + 20)
    })

    // Título del gráfico
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 16px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Interacciones Mensuales', width / 2, 25)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'abierto': return 'text-blue-600'
      case 'en_progreso': return 'text-yellow-600'
      case 'resuelto': return 'text-green-600'
      case 'cerrado': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Cargando datos de analytics...</p>
          <p className="text-sm text-gray-500 mt-2">Procesando métricas en tiempo real</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al Cargar Datos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadAnalyticsData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Análisis de Datos
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Insights profundos sobre las interacciones de tus clientes para 
            optimizar continuamente el servicio y mejorar la experiencia del usuario.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Interacciones</p>
                <p className="text-3xl font-bold text-blue-600">{formatNumber(data?.totalInteractions || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">💬</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+12.5% vs mes anterior</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-3xl font-bold text-green-600">{formatNumber(data?.totalTickets || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">🎫</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">-8.3% vs mes anterior</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo Respuesta</p>
                <p className="text-3xl font-bold text-purple-600">{data?.avgResponseTime || 0}h</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">⚡</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">-15.2% vs mes anterior</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfacción</p>
                <p className="text-3xl font-bold text-orange-600">{data?.customerSatisfaction || 0}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">⭐</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+3.1% vs mes anterior</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Tendencia de Interacciones
                </h2>
                <button
                  onClick={loadAnalyticsData}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  Actualizar
                </button>
              </div>
              <canvas
                ref={chartRef}
                width={600}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Tickets by Status */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Estado de Tickets
              </h2>
              <div className="space-y-4">
                {data && Object.entries(data.ticketsByStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className={`font-medium capitalize ${getStatusColor(status)}`}>
                      {status.replace('_', ' ')}
                    </span>
                    <span className="text-gray-900 font-semibold">{count}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Tasa de Resolución</p>
                  <p className="text-2xl font-bold text-green-600">
                    {data ? Math.round((data.ticketsByStatus.resuelto / data.totalTickets) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Questions */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Consultas Más Frecuentes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Pregunta</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Categoría</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.topQuestions.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.question}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">
                        {formatNumber(item.count)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Crecimiento Sostenido</h3>
            <p className="text-gray-700 text-sm">
              Las interacciones han aumentado consistentemente, indicando mayor 
              adopción y confianza en el sistema automatizado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Alta Eficiencia</h3>
            <p className="text-gray-700 text-sm">
              El 84% de los tickets se resuelven exitosamente, demostrando la 
              efectividad del sistema de automatización.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimización Continua</h3>
            <p className="text-gray-700 text-sm">
              Los tiempos de respuesta mejoran constantemente gracias al 
              aprendizaje automático del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
