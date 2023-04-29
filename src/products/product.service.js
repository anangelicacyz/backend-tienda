//archivo de la conexion con database
const db = require("../db")

const productService = {

    findAll :(req, res)=>{

        db.query(`select * from products`, (error, result, fields)=> {
            console.log( result)
            
            res.json({
                products: result 
            })
        })
    },
    findOne:(req, res)=>{
        //obtener variable id
        const idProduct = req.params.id
        
        db.query(`select * from products where id = ${idProduct}`, (error, result, fields)=>{
            if(result.length=== 0){
                res.status(404).json( {
                    message: `ID not found`
                })
                return
            }
            res.json({ product: result[0] })
        })
    },
    delete:(req, res)=>{
        //obtener variable id
        const idProduct = req.params.id
        
        db.query(`delete from products where id= ${idProduct}`, (error, result, fields)=>{
    
        
            res.json({
    
                success: result.affectedRows>0
            })
        })
    },
    create:(req, res)=>{

        const {name, description, value, units, createdByUserId, providerId} = req.body
        const createdAt= new Date()
    
            if(!name || !value || !units || !createdByUserId || !providerId){
                res.status(400).json({
                    message: "Todos los campos son obligatorios"
                })
            }
            let productoNuevo = {
                 name , description, units, value, createdAt, createdByUserId, providerId
            }   
            //INSERT INTO products (name, description, units, value) VALUES (`${name}`, `${description}`, ${units}, ${value})
            connection.query(`insert into products set ?`, productoNuevo, (error, result, fields)=>{
                console.log(result)
                res.json({
                    success: result.affectedRows !==0
                })
                
            } )
    
    
    },
    update: (req, res)=>{
        const idProduct= Number(req.params.idProduct)
        const updatedAt= new Date()
        const {name, description, units, value, updatedByUserId, providerId} = req.body
    
        db.query(
            `update products set name= ?, description=?, units=?, value=?, updatedAt=?, updatedByUserId=?, providerId=? where id=?`,
            [name, description, units, value, updatedAt, updatedByUserId, providerId, idProduct], 
            (error, result, fields)=>{
                console.log(result)
                if(result.affectedRows===0){
                res.status(404).json({
                    message: "We cannot update because the ID was not found",
                })
                return
                }
                res.json({
                    result
                })
        })
            
    }

}

module.exports = productService