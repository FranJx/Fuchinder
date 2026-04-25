import { useState } from 'react'
import { Edit2, Upload, MapPin, Zap, Trophy } from 'lucide-react'

export default function PerfilPage({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [perfil, setPerfil] = useState({
    nombre: 'Juan Pérez',
    edad: 28,
    email: 'juan@example.com',
    descripcion: 'Amante del fútbol, mediocampista versátil',
    posiciones: ['Mediocampista', 'Defensa'],
    tamaños: ['Fútbol 5', 'Fútbol 11'],
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ubicacion: 'Posadas, Misiones'
  })

  const [stats] = useState({
    partidosJugados: 12,
    victorias: 8,
    goles: 15,
    raiting: 4.8
  })

  const handleChange = (field, value) => {
    setPerfil({
      ...perfil,
      [field]: value
    })
  }

  const handleTogglePosition = (pos) => {
    if (perfil.posiciones.includes(pos)) {
      setPerfil({
        ...perfil,
        posiciones: perfil.posiciones.filter(p => p !== pos)
      })
    } else {
      setPerfil({
        ...perfil,
        posiciones: [...perfil.posiciones, pos]
      })
    }
  }

  const handleToggleTamaño = (tam) => {
    if (perfil.tamaños.includes(tam)) {
      setPerfil({
        ...perfil,
        tamaños: perfil.tamaños.filter(t => t !== tam)
      })
    } else {
      setPerfil({
        ...perfil,
        tamaños: [...perfil.tamaños, tam]
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent p-6">
        <div className="max-w-md mx-auto flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Mi Perfil</h1>
            <p className="text-gray-400 text-sm">Gestiona tu información</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700"
          >
            <Edit2 className="text-primary" size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Foto de Perfil */}
        <div className="text-center">
          <div className="w-28 h-28 mx-auto mb-4 relative">
            <img
              src={perfil.foto}
              alt={perfil.nombre}
              className="w-full h-full rounded-full object-cover border-4 border-primary"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-white hover:bg-orange-500 transition">
                <Upload size={16} />
              </button>
            )}
          </div>
          {isEditing && (
            <input
              type="text"
              value={perfil.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              className="w-full text-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-bold mb-2 focus:outline-none focus:border-primary transition"
            />
          )}
          {!isEditing && (
            <h2 className="text-2xl font-bold text-white">{perfil.nombre}</h2>
          )}
          <p className="text-gray-400 text-sm">{perfil.edad} años • {perfil.ubicacion}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <Trophy className="mx-auto text-primary mb-1" size={20} />
            <p className="text-gray-400 text-xs">Partidos</p>
            <p className="text-white font-bold">{stats.partidosJugados}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <Zap className="mx-auto text-success mb-1" size={20} />
            <p className="text-gray-400 text-xs">Victorias</p>
            <p className="text-white font-bold">{stats.victorias}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <p className="text-gray-400 text-xs">Goles</p>
            <p className="text-white font-bold text-lg">{stats.goles}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <p className="text-gray-400 text-xs">Rating</p>
            <p className="text-primary font-bold">{stats.raiting}⭐</p>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sobre ti
          </label>
          {isEditing ? (
            <textarea
              value={perfil.descripcion}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              rows="3"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none"
            />
          ) : (
            <p className="text-gray-300">{perfil.descripcion}</p>
          )}
        </div>

        {/* Posiciones */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Posiciones de Juego
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Portero', 'Defensa', 'Mediocampista', 'Delantero'].map((pos) => (
              <button
                key={pos}
                onClick={() => isEditing && handleTogglePosition(pos)}
                disabled={!isEditing}
                className={`p-3 rounded-lg border transition ${
                  perfil.posiciones.includes(pos)
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                } ${!isEditing && 'cursor-default'}`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Tamaños de Partido */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Tamaños de Partido Preferidos
          </label>
          <div className="flex gap-2 flex-wrap">
            {['Fútbol 5', 'Fútbol 8', 'Fútbol 11'].map((tam) => (
              <button
                key={tam}
                onClick={() => isEditing && handleToggleTamaño(tam)}
                disabled={!isEditing}
                className={`px-4 py-2 rounded-full border transition ${
                  perfil.tamaños.includes(tam)
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                } ${!isEditing && 'cursor-default'}`}
              >
                {tam}
              </button>
            ))}
          </div>
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ubicación
          </label>
          {isEditing ? (
            <input
              type="text"
              value={perfil.ubicacion}
              onChange={(e) => handleChange('ubicacion', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition"
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin size={16} className="text-primary" />
              {perfil.ubicacion}
            </div>
          )}
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="w-full bg-gradient-to-r from-primary to-orange-400 hover:from-orange-500 hover:to-orange-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Guardar cambios
          </button>
        )}
      </div>
    </div>
  )
}
