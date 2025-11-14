const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing auth' });
  const token = auth.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid auth' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
