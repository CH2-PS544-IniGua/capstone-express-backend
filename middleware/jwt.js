const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function generateAccessToken(body, second){
    return jwt.sign(body, process.env.TOKEN_SECRET, { expiresIn: `${second}s` });
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token == null) return res.status(401).json({message: "Error authenticating: Unauthorized, no token found"});
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  
      if (err) return res.status(401).json({message: "Error authenticating: Unauthorized, invalid token"});
  
      req.user = user;
  
      next();
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}