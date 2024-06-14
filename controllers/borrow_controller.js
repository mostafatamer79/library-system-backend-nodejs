const book_schema = require("../schema/book_schema");
const borrow_schema = require("../schema/borrow_schema");
const user_schema = require("../schema/user_schema");
const { getuser } = require("./user_controller");
const createBorrow =async(req,res)=>{
    try {
        const {userId,bookId} = req.body;
        const getUser= await user_schema.findOne({_id:userId})
        if (!getUser){
            return res.status(400).json({status:"failed",msg:"the user is not found"})
        }
        const getBook= await book_schema.findOne({_id:bookId})
        if(!getBook){
            return res.status(400).json({status:"failed",msg:"the book is not found"})

        }
        const new_borrow= new borrow_schema({
            bookId:bookId,
            userId:userId,
            book:[{
                name:getBook.name,
            author:getBook.author,
            genre:getBook.genre,
            rate:getBook.rate,
            count:getBook.count
        }
            ],
            user:[{
                firstName:getUser.firstName,
                lastName:getUser.lastName,
                email:getUser.email,
                password:getUser.hashedpassword,
                role:getUser.role
            }]
        })
        await new_borrow.save();
        res.status(200).json({status:"success",data:new_borrow})
    } catch (error) {
        
    }

}
const readBorrow=async (req,res)=>{
    const data = await borrow_schema.find({},{__v:false});
    res.status(200).json({status:"success",data:data})
}
const deleteBook= async (req,res)=>{
    try {
        const id = req.params.id;
        await borrow_schema.deleteOne({_id:id})
         res.status(200).json({status:"success",data:data})

    } catch (error) {
        res.status(400).json({status:"error",data:error})
    }
}
module.exports={createBorrow,readBorrow,deleteBook}