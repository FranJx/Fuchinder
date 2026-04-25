import pool from '../config/database.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middleware/auth.js'

export const register = async (req, res) => {
  try {
    const { nombre, email, password, edad, descripcion } = req.body

    // Validar que email no exista
    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    // Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insertar usuario
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash, edad, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, email',
      [nombre, email, hashedPassword, edad, descripcion]
    )

    const user = result.rows[0]
    const token = generateToken(user.id)

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email }
    })
  } catch (error) {
    console.error('Error en register:', error)
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar que email existe
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email o contraseña inválidos' })
    }

    const user = result.rows[0]

    // Validar contraseña
    const passwordValid = await bcrypt.compare(password, user.password_hash)
    if (!passwordValid) {
      return res.status(401).json({ message: 'Email o contraseña inválidos' })
    }

    const token = generateToken(user.id)

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await pool.query('SELECT id, nombre, email, edad, descripcion FROM usuarios WHERE id = $1', [userId])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({ user: result.rows[0] })
  } catch (error) {
    console.error('Error en getProfile:', error)
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message })
  }
}
