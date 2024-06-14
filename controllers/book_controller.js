const { validationResult } = require('express-validator');
const book_schema=require('../schema/book_schema')

//add book
const addBook=async (req,res)=>{
    try {
        const {name,author,genre,rate,count}=req.body;
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({Error:error})
        }
        const new_book=new book_schema({
            name:name,
            author:author,
            genre:genre,
            rate:rate,
            count:count,
        })
        new_book.save()
        return res.status(200).json({status:"sucess",data:new_book})
    } catch (error) {
       return res.status(400).json({Error:error})

    }
   
}
//delete book
const deletBook=async(req,res)=>{
    try {
       const  id = req.params.id
    await book_schema.deleteOne({_id:id})
    return res.status(200).json({status:"sucess",data:null})
    } catch (error) {
        return res.status(400).json({Error:error})
    }
}
//update book
const updateBook = async(req,res)=>{
    try {
        const id =  req.params.id;
        new_data = await book_schema.updateOne({_id:id},{$set:{...req.body}})
        return res.status(200).json({status:"sucess",data:{new_data}})

    } catch (error) {
        return res.status(400).json({Error:error})

    }
}
//view book
const viewbook = async(req,res)=>{
    try {
        const data = await book_schema.find()
        return res.status(200).json({status:"sucess",data:data})

    } catch (error) {
        return res.status(400).json({Error:error})

    }
}
//search book by  id
const findbook = async(req,res)=>{
    try {
        const id =  req.params.id;
        const data = await book_schema.findOne({_id:id})
        return res.status(200).json({status:"sucess",data:data})
    } catch (error) {
        return res.status(400).json({Error:error})
    }
}
    module.exports={addBook,deletBook,updateBook,viewbook,findbook}