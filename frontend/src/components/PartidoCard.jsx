import { useState } from 'react'
import { MapPin, Users, Clock, Zap, Heart, X } from 'lucide-react'

export default function PartidoCard({ partido, onLike, onDislike }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLike = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onLike(partido.id)
      setIsAnimating(false)
    }, 300)
  }

  const handleDislike = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onDislike(partido.id)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 transition-all duration-300 ${
        isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
      }`}
    >
      {/* Imagen del partido/cancha */}
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-orange-400/20 overflow-hidden">
        <img
          src={partido.imagen || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop'}
          alt={partido.nombre}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        {/* Info en la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-2xl font-bold text-white mb-1">{partido.nombre}</h2>
          <p className="text-gray-200 text-sm">{partido.organizador}</p>
        </div>

        {/* Badge tipo de partido */}
        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-sm font-semibold">Fútbol {partido.tamaño}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-4">
        {/* Ubicación */}
        <div className="flex items-start gap-3">
          <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="text-gray-300 text-sm font-medium">{partido.ubicacion}</p>
            <p className="text-gray-500 text-xs">Cancha de Posadas</p>
          </div>
        </div>

        {/* Horario */}
        <div className="flex items-center gap-3">
          <Clock className="text-success flex-shrink-0" size={20} />
          <div>
            <p className="text-gray-300 text-sm font-medium">{partido.hora}</p>
            <p className="text-gray-500 text-xs">{partido.fecha}</p>
          </div>
        </div>

        {/* Jugadores */}
        <div className="flex items-center gap-3">
          <Users className="text-warning flex-shrink-0" size={20} />
          <p className="text-gray-300 text-sm">
            <span className="font-semibold">{partido.jugadoresAnotados}/{partido.jugadoresTotales}</span> jugadores anotados
          </p>
        </div>

        {/* Posiciones disponibles */}
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <p className="text-gray-400 text-xs font-semibold mb-2">POSICIONES LIBRES:</p>
          <div className="flex flex-wrap gap-2">
            {partido.posicionesLibres.map((pos) => (
              <span
                key={pos}
                className="bg-primary/20 text-primary text-xs px-2 py-1 rounded border border-primary/30 font-medium"
              >
                {pos}
              </span>
            ))}
          </div>
        </div>

        {/* Descripción adicional */}
        {partido.descripcion && (
          <p className="text-gray-400 text-sm leading-relaxed">
            {partido.descripcion}
          </p>
        )}

        {/* Stats rapidas */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700">
          <div className="bg-gray-800/30 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs">Nivel</p>
            <p className="text-primary font-semibold">{partido.nivel || 'Mixto'}</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-2 text-center">
            <p className="text-gray-500 text-xs">Duración</p>
            <p className="text-primary font-semibold">{partido.duracion || '90 min'}</p>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="p-4 border-t border-gray-700 flex gap-3">
        <button
          onClick={handleDislike}
          className="flex-1 bg-gray-800 hover:bg-red-900/30 text-gray-300 hover:text-danger border border-gray-700 hover:border-danger/50 py-3 rounded-xl transition flex items-center justify-center gap-2 font-semibold"
        >
          <X size={20} />
          <span className="hidden sm:inline">Pasar</span>
        </button>
        <button
          onClick={handleLike}
          className="flex-1 bg-gradient-to-r from-primary to-orange-400 hover:from-orange-500 hover:to-orange-500 text-white py-3 rounded-xl transition flex items-center justify-center gap-2 font-semibold"
        >
          <Heart size={20} className="fill-current" />
          <span className="hidden sm:inline">Apuntarme</span>
        </button>
      </div>
    </div>
  )
}
