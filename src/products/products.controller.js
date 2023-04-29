const express = require("express")
//archivo de la conexion con database
const db = require("../db")

const router = express.Router()


const productService = require('./product.service')


router.get("", productService.findAll)
router.get("/:id", productService.findOne)
router.delete("/:id", productService.delete)
router.post("", productService.create)
router.put("/:idProduct" , productService.update)


module.exports = router