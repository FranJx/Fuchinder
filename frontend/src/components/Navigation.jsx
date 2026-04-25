import { Link, useLocation } from 'react-router-dom'
import { LogOut, Home, Users, User } from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark border-t border-gray-700 z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/partidos"
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
            isActive('/partidos')
              ? 'text-primary bg-gray-900'
              : 'text-gray-400 hover:text-primary'
          }`}
        >
          <Home size={24} />
          <span className="text-xs">Partidos</span>
        </Link>

        <Link
          to="/equipos"
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
            isActive('/equipos')
              ? 'text-primary bg-gray-900'
              : 'text-gray-400 hover:text-primary'
          }`}
        >
          <Users size={24} />
          <span className="text-xs">Equipos</span>
        </Link>

        <Link
          to="/perfil"
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
            isActive('/perfil')
              ? 'text-primary bg-gray-900'
              : 'text-gray-400 hover:text-primary'
          }`}
        >
          <User size={24} />
          <span className="text-xs">Perfil</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-3 rounded-lg text-gray-400 hover:text-danger transition"
        >
          <LogOut size={24} />
          <span className="text-xs">Salir</span>
        </button>
      </div>
    </nav>
  )
}
