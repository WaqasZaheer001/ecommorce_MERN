const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('Token received:', token);

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET); // Remove 'Bearer ' from the token
    console.log('Decoded token:', decoded);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }

    next();
  } catch (err) {
    console.error('Token verification error:', err);

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { isAdmin, JWT_SECRET };
