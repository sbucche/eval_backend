const jwt = require("jsonwebtoken");

const Authenticate = (req, res ,next )=>{
   
      console.log(req.headers.authorization)
      const token = req.headers.authorization?.split(" ")[1]
     jwt.verify(token, 'secret', function(err, decoded) {

         if(err){
             return res.send({message : "Login first"})
         }
         console.log(decoded) 
         req.UserID = decoded.UserID
         next();
      })
}

module.exports = {Authenticate}