//Packages
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Verify Token
let verificarToken = (req,res,next)=>{
  let token = req.get('Authorization');
  jwt.verify(token,process.env.SECRET,(err,decoded)=>{
    if(err){
      return res.status(401).json({
        message : 'Invalid Authorization Header'
      })
    }
    process.env.AUTHORIZATION = token;
    next();
  });
}

module.exports = verificarToken;