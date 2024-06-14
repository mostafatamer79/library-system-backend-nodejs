
require('dotenv').config();
const express = require("express")
const app = express();
const cors = require("cors");
const route_book=require("./route/bookroute")
const route_borrow=require("./route/borrowroute")
const path =require("path")
const mongoose = require("mongoose");
const url =process.env.URL 
const root_user = require("./route/userroute")

mongoose.connect(url).then(()=>{
    console.log("the database is connected")
})
app.use(express.json());
app.use(cors());
app.use('/api/uploads',express.static(path.join(__dirname,'uploads')))
app.use("/api/users",root_user) 
app.use("/api/books",route_book)
app.use("/api/borrow",route_borrow)











app.listen(process.env.PORT,()=>{
    console.log ("listening in port 5001")
})