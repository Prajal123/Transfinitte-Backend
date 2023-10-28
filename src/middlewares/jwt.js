const jwt = require("jsonwebtoken");

// function to generate a token for each user(etc..) returns the signed token
const createJWTtoken = async (user) => {
  return await jwt.sign(
    {
      mobileNumber: user.mobileNumber,
      id: user._id
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "168h" }
  );
};

var authJWT = (req,res,next)=>{
  var token = req.headers.authorization;
  // console.log(token);
  token = token.split(' ')[1];
   
  jwt.verify(token, process.env.TOKEN_SECRET, function(err,decoded) {
    req.jwt_payload = decoded;
    if(err){
      console.log(err);
      res.send({message : "Invalid Token"})}
    else{
      next();
    }
  })
}
module.exports = {
  createJWTtoken,
  authJWT
};
