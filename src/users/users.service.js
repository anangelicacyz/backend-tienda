const db = require("../db")

const userService={

    findAll: (req,res)=>{
        
        db.query(`SELECT * FROM users`, (error, result, fields)=>{

            res.json({
                result
            })
        })
        
    },
    findOne: (req, res) =>{
        const idUser= Number(req.params.idUser)

        db.query(`SELECT * FROM users WHERE id= ${idUser}`, (error, result, fields)=>{
            if(result.length ===0){
                res.status(404).json({
                    message: "ID not found"
                })
                return
            }
            res.json({
                user: result[0]
            })
        
        })
        
    },
    delete: (req, res) =>{
        const idUser = Number(req.params.idUser)

        db.query(`DELETE FROM users WHERE id= ${idUser}`, (error, result, fields)=>{
                res.json({
                    success: result.affectedRows>0
                })
        })
    
    },
    create: (req, res) =>{
        const {name, lastname, email, phone} = req.body
        
            if(!name || !lastname || !email){
                res.status(400).json({
                    message: "Todos los campos son requeridos"
                })
            } 
            else{
        let newUser = { name, lastname, email, phone }
        db.query(`INSERT INTO users set ?`, newUser, (error, result, fields)=>{
            console.log(error)
            res.json({
                success: result.affectedRows !== 0
            })
        
        })
        }
    },
    update: (req, res) =>{
        const idUser= Number(req.params.idUser)
    

    const name= req.body.name
    const lastname= req.body.lastname
    const email= req.body.email
    const phone=req.body.phone


        db.query(
            `UPDATE users SEt name=?, lastname=?, email=?, phone=? WHERE id=?`,
            [name, lastname, email, phone, idUser],
            (error, result, fields)=>{
                console.log(error)
                if(result.affectedRows === 0){
                    res.status(400).json({
                        message: "We cannot update because the ID was not found",
                    })
                    return
                }
                res.json({
                    result
                })
            }
        )
    }

} 

module.exports= userService