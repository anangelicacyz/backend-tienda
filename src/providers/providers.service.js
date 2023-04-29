const db = require("../db")

const providerService= {

    findAll: (req, res)=>{
        db.query(`SELECT * FROM providers`, (error, result, fields)=>{
            res.json({
                result
            })
        })
    }, 
    findOne: (req, res) => {
        const idProvider = Number(req.params.idprovider)

        db.query(`SELECT * FROM providers WHERE id=${idProvider}`, (error, result, fields)=>{
            
            if(result.length === 0 ){
                res.status(404).json({
                    message: "ID not found"
                })
                return
            }
                res.json({ provider: result[0] })
        })
    },
    create: (req, res) => {
        const name= req.body.name
        const phone= req.body.phone
        const email= req.body.email

        if (!email || !phone || !name){
            res.status(400).json({
                message: "Todos los datos son requeridos"
            })
        }else{
        let newprovider={
                name, phone, email
        }
            db.query(`INSERT INTO providers set ?`, newprovider, (error, result, fields)=>{
            
                res.json({success: result.affectedRows !== 0})
            })
        }  
    },
    update: (req, res) =>{
        const idprovider= Number(req.params.idprovider)
        const { name, phone, email } = req.body
        
        db.query(`UPDATE providers set name=?, email=?, phone=? WHERE id=?`,
        [name, email, phone, idprovider],
        (error, result, fields)=>{
        
        if(result.affectedRows ===0){
                res.status(404).json({
                    message: "No hay datos para actualizar"
                })
                return
            }
            res.json({
                success: result.affectedRows>0,
                result
            })
        })
    },
    delete: (req, res) => {
    const idProvider= Number(req.params.idprovider)

        db.query(`DELETE FROM providers WHERE id=${idProvider}`, (error, result, fields)=>{
            res.json({ success: result.affectedRows>0 })
        })
    }
}

module.exports = providerService