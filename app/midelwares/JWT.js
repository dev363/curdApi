const JWT= require('jsonwebtoken')
const _= require('../config/config')

exports.sign=(data)=>{
  const options = { expiresIn: '7d'};
  const token = JWT.sign(data, _.JWT_SECERT, options);
  return token;
}

exports.validateToken= (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;

    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '7d'
      };

      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = JWT.verify(token, _.JWT_SECRET, options);
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        res.status(401).send({message:err.message});
      }
    } else {
      result = {
        error: `Authentication error. Token required.`
      };
      res.status(401).send(result);
    }
  }
