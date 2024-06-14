const mongoose=require("mongoose");
const moment=require("moment")
const validator=require("validator")
const borrowBook= mongoose.Schema({
    bookId:{
        type:String
    },
    userId:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    returnAt:{
        type:Date,
        default:function(){
            return moment().add(3,'days').toDate();
        }
    },
    book:[
        {
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
                }
        }
    ],
    user:[{
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
            
        },
        role:{
            type :String,
            require:true,
            enum:['admin','user'],
            default:'user'
        }
    }
    ]
}
)
module.exports=mongoose.model('borrowbook',borrowBook)