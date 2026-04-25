import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'tu_secret_key_aqui'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' })
  }

  req.user = decoded
  next()
}

export default { generateToken, verifyToken, authMiddleware }
