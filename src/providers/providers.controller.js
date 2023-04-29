const express = require("express")
const db = require("../db")
const router= express.Router()
const providerService= require(`./providers.service`)



router.get("", providerService.findAll)
router.get("/:idprovider", providerService.findOne)
router.post("", providerService.create)
router.put("/:idprovider", providerService.update)
router.delete("/:idprovider", providerService.delete)

module.exports= router