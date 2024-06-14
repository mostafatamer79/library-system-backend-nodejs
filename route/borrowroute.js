const express = require('express')
const borrow_controller =require('../controllers/borrow_controller')

const route =express.Router();
route.route('/').post(borrow_controller.createBorrow).get(borrow_controller.readBorrow)
route.route('/:id').delete(borrow_controller.deleteBook)

module.exports=route;