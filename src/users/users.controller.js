const express = require("express")
const db = require("../db")
const router= express.Router()
const userService= require(`./users.service`)

router.get("", userService.findAll)
router.get("/:idUser", userService.findOne)
router.delete("/:idUser", userService.delete)
router.post("", userService.create)
router.put("/:idUser", userService.update)

module.exports= router