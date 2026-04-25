import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PartidosPage from './pages/PartidosPage'
import PerfilPage from './pages/PerfilPage'
import EquiposPage from './pages/EquiposPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Verificar si hay token guardado
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      // Aquí cargaríamos los datos del usuario
    }
  }, [])

  return (
    <Router>
      {isAuthenticated && <Navigation />}
      <main className="flex-1">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
              <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/partidos" element={<PartidosPage />} />
              <Route path="/perfil" element={<PerfilPage user={user} />} />
              <Route path="/equipos" element={<EquiposPage />} />
              <Route path="*" element={<Navigate to="/partidos" />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  )
}

export default App
