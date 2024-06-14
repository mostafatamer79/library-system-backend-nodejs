const mongoose = require("mongoose")

const validator = require("validator")
const user_schema=mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
     password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate:[validator.isEmail,"field of email must be correct"]
        ,unique:true
    },
    role:{
        type :String,
        require:true,
        enum:['admin','user'],
        default:'user'
    },
    token:{
        type :String
    },  
    profileImg:{
        type: String
    }

})
module.exports=mongoose.model('user',user_schema)