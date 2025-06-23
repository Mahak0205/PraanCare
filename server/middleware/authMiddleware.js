// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("🔐 Incoming Auth Header:", authHeader);

  if (!authHeader) return res.status(401).json({ msg: 'No token, access denied' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ← this line fails if jwt is not defined
    console.log("✅ Token decoded user:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT verify error:", err.message);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
