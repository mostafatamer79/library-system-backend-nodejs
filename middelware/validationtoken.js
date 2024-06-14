const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers["authorization"];
    if (!authHeader){
        return  res.status(400).json({status:"failed",msg:"the token is required"});
    }
    const token = authHeader.split(" ")[1];
    
    try {

        const tokenverfication = jwt.verify(token,process.env.JWT_SECURITY_KEY);
        const current_user=tokenverfication;
        req.current_user=current_user;
        next();
    } catch (error) {
        return  res.status(400).json({status:"failed",msg:"invalid token"});
    }
   
}
module.exports=verifyToken;