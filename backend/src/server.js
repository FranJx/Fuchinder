import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Fuchinder Backend is running!' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Algo salió mal', error: err.message })
})

app.listen(PORT, () => {
  console.log(`🚀 Fuchinder Backend corriendo en puerto ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
