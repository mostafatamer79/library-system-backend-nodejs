const user_schema= require("../schema/user_schema")
const bcrypt = require('bcrypt')
const jwt = require("../middelware/generatejwt")
const {validationResult} = require('express-validator');

const getuser = async (req,res)=>{
    const user = await user_schema.find({},{'__v':false,'password':false});
    return res.status(200).json({status:"sucess",data:{user}})
}


const login=async(req,res)=>{
    try {
        const {email,password} =req.body;
        if(!email&& !password){
            return  res.status(400).json({status:"failed",msg:"the email and password required"})
    
        }
        const user = await user_schema.findOne({email: email})
        if(!user){
            return res.status(400).json({status:"failed",msg:"the email not found"})
        }
        const decrypt_passowrd= await bcrypt.compare(password,user.password);
        if(user && decrypt_passowrd){
            const token = await jwt({id:user._id,email:user.email,role:user.role})
          return  res.status(200).json({status:"success",data:{token}})
        }
        else{
            return res.status(400).json({status:"failed",msg:"the password is incorrect"})
        }
    
    } catch (error) {
        return  res.status(400).json({status:"failed",msg:error})

    }
   
}



const registeration=async(req,res)=>{
    try {
        const {firstName,lastName,email,password,role}=req.body
        const error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(401).json({status:"failed",msg:error.array()})
        }
        const old_email = await user_schema.findOne({email:email})
        if(!old_email){
            hashedpassword = await bcrypt.hash(password,10)
            const new_user=new user_schema({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashedpassword,
                role:role,
                profileImg:req.file.filename

            })
          
          const token = await jwt({id:new_user.id,email:new_user.email,role:new_user.role})
          new_user.token=token;
          await new_user.save();
           return res.status(200).json({status:"success",data:{new_user}})
        }
        else{
          return  res.status(400).json({status:"failed",msg:"the email is used before"})
        }
    
    } catch (error) {
        return  res.status(400).json({status:"failed",msg:error})

    }
    
}  
const updateUser =async (req,res)=>{
    try {
        const id = req.params.id;
         user = await user_schema.updateOne({_id:id},{$set:{...req.body}});
        return res.status(200).json({status:"success",data:{user}})
    } catch (error) {
        return  res.status(400).json({status:"failed",msg:error})

    }
   


}
const deleteUser = async (req,res)=>{
    const id = req.params.id;
    await user_schema.deleteOne({_id:id});
    return res.status(200).json({status:"success",data:null})

}

module.exports={getuser,login,registeration,updateUser,deleteUser}