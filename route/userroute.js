const express = require('express');
const router = express.Router();
const validationUserSchema=require("../middelware/validationschema");
const verifyToken=require("../middelware/validationtoken")
const User_Controller = require("../controllers/user_controller");
const checkrole = require('../middelware/checkrole');
const multer = require('multer');
const diskstorage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        const ext = file.mimetype.split('/')[1];
        const filename=`user-${Date.now()}.${ext}`
        cb(null,filename)
    }

})
const filterext= (req,file,cb)=>{
    const image = file.mimetype.split('/')[0];
    if(image==="imgae"){
        return cb(true,'image')
    }
    return cb({status:"error",msg:"type must be image"}, false)

}
const upload = multer({storage:diskstorage,filterext})

router.route("/").get(User_Controller.getuser).post(upload.single('profileImg'),validationUserSchema.validationUserSchema(),User_Controller.registeration);
router.route("/login").get(User_Controller.login);
router.route("/:id").patch(verifyToken,checkrole('admin'),User_Controller.updateUser).delete(User_Controller.deleteUser);

module.exports=router