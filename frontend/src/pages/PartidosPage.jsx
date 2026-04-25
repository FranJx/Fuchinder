import { useState, useEffect } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import PartidoCard from '../components/PartidoCard'

export default function PartidosPage() {
  const [partidos, setPartidos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filtros, setFiltros] = useState({
    tamaño: 'todos',
    fecha: 'todos'
  })
  const [showFiltros, setShowFiltros] = useState(false)

  // Datos de ejemplo (luego vendrán de la API)
  useEffect(() => {
    setPartidos([
      {
        id: 1,
        nombre: 'Partido en Villa Sarita',
        organizador: 'Juan González',
        imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
        ubicacion: 'Cancha Villa Sarita',
        hora: '19:00 hs',
        fecha: 'Sábado 25 de Abril',
        tamaño: 5,
        jugadoresAnotados: 8,
        jugadoresTotales: 10,
        posicionesLibres: ['Portero', 'Delantero'],
        descripcion: 'Partido amistoso, nivel intermedio. Se necesita portero urgente!',
        nivel: 'Intermedio',
        duracion: '60 min'
      },
      {
        id: 2,
        nombre: 'Fútbol 11 - Liga Amateur',
        organizador: 'Carlos López',
        imagen: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=400&h=400&fit=crop',
        ubicacion: 'Cancha Municipal',
        hora: '20:00 hs',
        fecha: 'Domingo 26 de Abril',
        tamaño: 11,
        jugadoresAnotados: 15,
        jugadoresTotales: 22,
        posicionesLibres: ['Mediocampista', 'Delantero', 'Defensa'],
        descripcion: 'Partido oficial de liga. Buscamos jugadores comprometidos.',
        nivel: 'Avanzado',
        duracion: '90 min'
      },
      {
        id: 3,
        nombre: 'Fútbol 5 Casual',
        organizador: 'María Rodríguez',
        imagen: 'https://images.unsplash.com/photo-1569902155303-b3fa6308d4ac?w=400&h=400&fit=crop',
        ubicacion: 'Cancha Centro',
        hora: '18:00 hs',
        fecha: 'Viernes 24 de Abril',
        tamaño: 5,
        jugadoresAnotados: 7,
        jugadoresTotales: 10,
        posicionesLibres: ['Portero', 'Cualquier posición'],
        descripcion: 'Partido casual, sin presión. Bienvenidos todos los niveles!',
        nivel: 'Iniciante',
        duracion: '45 min'
      }
    ])
  }, [])

  const handleLike = (id) => {
    console.log('❤️ Te anotaste en partido:', id)
    nextCard()
  }

  const handleDislike = (id) => {
    console.log('❌ Pasaste partido:', id)
    nextCard()
  }

  const nextCard = () => {
    if (currentIndex < partidos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Reiniciar o mostrar "No hay más partidos"
      setCurrentIndex(0)
    }
  }

  const currentPartido = partidos[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-dark/80 backdrop-blur-md border-b border-gray-700 p-4">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Partidos</h1>
            <p className="text-gray-400 text-xs">{partidos.length} partidos disponibles</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFiltros(!showFiltros)}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700"
            >
              <Filter className="text-primary" size={20} />
            </button>
            <button className="p-2 bg-primary hover:bg-orange-500 rounded-lg transition text-white">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Filtros */}
        {showFiltros && (
          <div className="mt-4 max-w-md mx-auto space-y-3 animate-slide-up">
            <select
              value={filtros.tamaño}
              onChange={(e) => setFiltros({ ...filtros, tamaño: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary transition"
            >
              <option value="todos">Todos los tamaños</option>
              <option value="5">Fútbol 5</option>
              <option value="8">Fútbol 8</option>
              <option value="11">Fútbol 11</option>
            </select>

            <select
              value={filtros.fecha}
              onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary transition"
            >
              <option value="todos">Cualquier día</option>
              <option value="hoy">Hoy</option>
              <option value="mañana">Mañana</option>
              <option value="semana">Esta semana</option>
            </select>

            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition">
              Aplicar filtros
            </button>
          </div>
        )}
      </div>

      {/* Cards Container */}
      <div className="max-w-md mx-auto px-4 py-8 h-screen flex items-center">
        {currentPartido ? (
          <div className="w-full">
            <PartidoCard
              partido={currentPartido}
              onLike={handleLike}
              onDislike={handleDislike}
            />

            {/* Contador */}
            <div className="mt-6 text-center text-gray-500">
              <p className="text-sm">
                {currentIndex + 1} de {partidos.length}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full text-center">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-2">No hay más partidos</h2>
              <p className="text-gray-400 mb-6">Vuelve más tarde para ver nuevos partidos</p>
              <button
                onClick={() => setCurrentIndex(0)}
                className="bg-primary hover:bg-orange-500 text-white px-6 py-2 rounded-lg transition"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
