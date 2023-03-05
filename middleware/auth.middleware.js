import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  // Get authorization token from request header
  const authHeader = req.headers.authorization
  if (!authHeader) {
    // If token is not present, return unauthorized error
    return res.status(401).json({ error: 'Token not provided' })
  }
  // Remove 'Bearer ' prefix from token
  const [, token] = authHeader.split(' ')

  try {
    // Verify if token is valid
    jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch {
    // If token is invalid, return unauthorized error
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export default authMiddleware
