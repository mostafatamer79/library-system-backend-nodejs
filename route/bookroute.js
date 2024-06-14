const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book_controller");
const checkrole = require("../middelware/checkrole");
validationtoken=require("../middelware/validationtoken")
const validationBookschema = require("../middelware/validationschema")
router.route("/")
.post(validationtoken,checkrole("admin"),validationBookschema.validationBookschema(),bookController.addBook)
.get(validationtoken,checkrole("admin"),bookController.viewbook);
router.route("/:id").
patch(validationtoken,checkrole("admin"),bookController.updateBook)
.delete(validationtoken,checkrole("admin"),bookController.deletBook)
.get(validationtoken,checkrole("admin"),bookController.findbook);
module.exports=router