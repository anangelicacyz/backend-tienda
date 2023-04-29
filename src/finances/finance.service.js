const db= require(`../db`)

const financeService ={
    findAll: (req, res)=>{
            db.query(`SELECT * FROM finance`, (error, result, fields)=>{
                
                res.json({
                    movements: result
                })
            })
        },
    findOne: (req, res) =>{
        const idConcept= req.params.idConcept

            db.query(`SELECT * FROM finance WHERE id=${idConcept}`, (error, result, fields)=>{
                if(result.length ===o){
                    res.status(404).json({
                        message: `ID not found`
                    })
                    return
                }
                res.json({
                    result: result[0]
                })
            })
        },
    create: (req, res)=>{
            const {concept, type, expenseType, createByUserId, amount} =req.body
            const createAt= new Date()

            if(!concept || !type || !amount){
                res.status(400).json({
                    message: "Concepto, tipo y monto son campos obligatorios"
                })
                return
            }
                let newConcept = {concept, createAt, type, expenseType, createByUserId, amount}

                db.query(`INSERT INTO finance set ?`, newConcept, (error, result, fields)=>{
                    res.json({
                        success: result.affectedRows !== 0
                    })
                })
            
        },
    update: (req, res)=>{
            const idConcept= req.params.idConcept
            const updateAt = new Date()
            const {concept, type, expenseType, updatedByUserId, amount} = req.params

            db.query(`update finance set concept=?, type=?, expenseType=?, updatedByUserId=?, amount=?, updateAt=? where id=?`, 
            [concept, type, expenseType, updatedByUserId, amount, updateAt, idConcept],
            (error, result, fields)=>{
                if(result.affectedRows === 0){
                    res.status(404).json({
                        message: `We cannot updated because the ID was not found`
                    })
                }else{
                    res.json({
                        result
                    })
                }
            })
        },
    delete: (req, res)=>{
        const idConcept= req.params.idConcept
        db.query(`DELETE from finance WHERE id=${idConcept}`, (error, result, fields)=>{
            res.json({
                success: result.affectedRows>0
            })
        })
    }

}
module.exports= financeService
