module.exports = (...roles)=>{
    return(req,res,next)=>
        
   { 
    try {
        if(!roles.includes(req.current_user.role))
            {
                return res.status(401).json({msg:"the role must be admin"})
            }
            next();
    } catch (error) {
        return res.status(401).json({status:"error",error:error})
    }
   
}}