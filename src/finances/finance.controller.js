const express= require(`express`)
const db= require(`../db`)
const router= express.Router()
const financeService= require(`./finance.service`)

router.get(``, financeService.findAll)
router.get(`/:idConcept`, financeService.findOne )
router.post(``, financeService.create)
router.put(`/:idConcept`, financeService.update )
router.delete(`:idConcept`, financeService.delete)

module.exports= router