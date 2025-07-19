const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, '123456789'); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
