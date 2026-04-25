import { useState } from 'react'
import { Plus, Users, Settings, Trash2 } from 'lucide-react'

export default function EquiposPage() {
  const [equipos, setEquipos] = useState([
    {
      id: 1,
      nombre: 'Los Tigres',
      miembros: ['Juan', 'Carlos', 'Miguel', 'Diego'],
      participantesTotales: 4,
      creator: 'Juan',
      estadisticas: {
        victorias: 5,
        derrotas: 2,
        empates: 1
      }
    }
  ])

  const [showCrearEquipo, setShowCrearEquipo] = useState(false)
  const [nuevoEquipo, setNuevoEquipo] = useState({
    nombre: '',
    descripcion: ''
  })

  const handleCrearEquipo = () => {
    if (nuevoEquipo.nombre.trim()) {
      setEquipos([
        ...equipos,
        {
          id: Math.max(...equipos.map(e => e.id), 0) + 1,
          nombre: nuevoEquipo.nombre,
          miembros: ['Tú'],
          participantesTotales: 1,
          creator: 'Tú',
          estadisticas: {
            victorias: 0,
            derrotas: 0,
            empates: 0
          }
        }
      ])
      setNuevoEquipo({ nombre: '', descripcion: '' })
      setShowCrearEquipo(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-dark/80 backdrop-blur-md border-b border-gray-700 p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Equipos</h1>
            <p className="text-gray-400 text-xs">{equipos.length} equipo(s)</p>
          </div>
          <button
            onClick={() => setShowCrearEquipo(true)}
            className="p-2 bg-primary hover:bg-orange-500 rounded-lg transition text-white"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Modal crear equipo */}
        {showCrearEquipo && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
            <div className="w-full bg-gray-900 rounded-t-2xl p-6 border-t border-gray-700 animate-slide-up">
              <h2 className="text-xl font-bold text-white mb-4">Crear nuevo equipo</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del Equipo
                  </label>
                  <input
                    type="text"
                    value={nuevoEquipo.nombre}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, nombre: e.target.value })}
                    placeholder="Ej: Los Defensores"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    value={nuevoEquipo.descripcion}
                    onChange={(e) => setNuevoEquipo({ ...nuevoEquipo, descripcion: e.target.value })}
                    placeholder="Describe tu equipo..."
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCrearEquipo(false)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg transition font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCrearEquipo}
                    className="flex-1 bg-gradient-to-r from-primary to-orange-400 hover:from-orange-500 hover:to-orange-500 text-white py-3 rounded-lg transition font-semibold"
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Equipos */}
        {equipos.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto text-gray-600 mb-3" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Sin equipos</h3>
            <p className="text-gray-400 mb-6">Crea tu primer equipo para empezar a jugar en grupo</p>
            <button
              onClick={() => setShowCrearEquipo(true)}
              className="bg-primary hover:bg-orange-500 text-white px-6 py-2 rounded-lg transition"
            >
              Crear equipo
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {equipos.map((equipo) => (
              <div
                key={equipo.id}
                className="bg-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-primary/50 transition"
              >
                {/* Header del equipo */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{equipo.nombre}</h3>
                    <p className="text-gray-400 text-sm">Creado por: {equipo.creator}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                    <Settings className="text-gray-400 hover:text-primary" size={20} />
                  </button>
                </div>

                {/* Miembros */}
                <div className="mb-4">
                  <p className="text-gray-400 text-xs font-semibold mb-2">MIEMBROS ({equipo.miembros.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {equipo.miembros.map((miembro, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full border border-primary/30"
                      >
                        {miembro}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-gray-700">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Victorias</p>
                    <p className="text-success font-bold">{equipo.estadisticas.victorias}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Derrotas</p>
                    <p className="text-danger font-bold">{equipo.estadisticas.derrotas}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Empates</p>
                    <p className="text-warning font-bold">{equipo.estadisticas.empates}</p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary hover:bg-orange-500 text-white py-2 rounded-lg transition text-sm font-semibold">
                    Inscribir en partido
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                    <Trash2 className="text-danger" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA para crear equipo */}
        {equipos.length > 0 && (
          <button
            onClick={() => setShowCrearEquipo(true)}
            className="w-full mt-6 bg-gray-800 hover:bg-gray-700 border-2 border-dashed border-gray-700 hover:border-primary rounded-2xl py-6 transition flex items-center justify-center gap-2 text-gray-400 hover:text-primary"
          >
            <Plus size={20} />
            <span className="font-semibold">Crear otro equipo</span>
          </button>
        )}
      </div>
    </div>
  )
}
