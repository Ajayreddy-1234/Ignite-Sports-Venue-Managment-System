const jwt = require('jsonwebtoken');
require('dotenv').config()


function authenticate(req, res, next) {
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.ENV_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err.name);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticate;
