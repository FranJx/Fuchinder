import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Loader, ArrowLeft } from 'lucide-react'
import axios from 'axios'

export default function RegisterPage({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    edad: '',
    descripcion: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // Registro en 2 pasos

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleStep1 = (e) => {
    e.preventDefault()
    if (formData.email && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden')
        return
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres')
        return
      }
      setError('')
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        edad: parseInt(formData.edad),
        descripcion: formData.descripcion
      })

      localStorage.setItem('token', response.data.token)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <Link
            to="/login"
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <ArrowLeft className="text-primary" size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Únete a Fuchinder</h1>
            <p className="text-gray-400 text-sm">Paso {step} de 2</p>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800 animate-slide-in">
          <form onSubmit={step === 1 ? handleStep1 : handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Nombre Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                      required
                    />
                  </div>
                </div>

                {/* Edad Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    placeholder="18"
                    min="13"
                    max="120"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                    required
                  />
                </div>

                {/* Descripcion */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre ti..."
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none"
                  />
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-danger/20 border border-danger/50 rounded-lg p-3 text-danger text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-orange-400 hover:from-orange-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? 'Registrando...' : step === 1 ? 'Siguiente' : 'Crear cuenta'}
            </button>
          </form>

          {/* Back button for step 2 */}
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-3 text-gray-400 hover:text-primary transition"
            >
              ← Volver
            </button>
          )}

          {/* Login Link */}
          {step === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-500">o</span>
                </div>
              </div>
              <p className="text-center text-gray-400">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-primary hover:text-orange-400 font-semibold transition">
                  Inicia sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
