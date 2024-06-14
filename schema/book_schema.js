const  mongoose = require("mongoose");

bookSchema=mongoose.Schema({
    name:{
    type:String,
    require:true
},
    author:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    rate:{
        type:Number,
        require:true
},
    count:{
        type:Number,
        require:true
    }}
)
module.exports=mongoose.model('book',bookSchema)