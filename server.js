// importar libreria:toda la libreria que se llama express
//se metió en la variable const express
const express = require("express")
//const db = require("./db")
const mysql= require("mysql")
/* ejemplo
const ana = require("ana")*/

//inicializamos express dentro de 
//variable app 
const app = express()
app.use(express.json())

const connection= mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "1234",
    database: "tienda"
})

connection.connect()

//request, response

//endpoint GET /productos
app.get("/productos", (req, res)=>{

    connection.query(`select * from products`, (error, result, fields)=> {
        console.log( result)
        
        res.json({
            products: result 
        })
    })
})
//endpoint buscar por id
app.get("/productos/:id", (req, res)=>{
    //obtener variable id
    const idProduct = req.params.id
    
    connection.query(`select * from products where id = ${idProduct}`, (error, result, fields)=>{
        if(result.length=== 0){
            res.status(404).json( {
                message: `ID not found`
            })
            return
        }
        res.json({ product: result[0] })
    })
})
// endpoint delete
app.delete("/productos/:id", (req, res)=>{
    //obtener variable id
    const idProduct = req.params.id
    
    connection.query(`delete from products where id= ${idProduct}`, (error, result, fields)=>{

    
        res.json({

            success: result.affectedRows>0
        })
    })


})
app.post("/productos", (req, res)=>{

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

            res.json({
                success: result.affectedRows !== 0
            })
            
        } )


}
)
app.put("/productos/:idProducto" , (req, res)=>{
    const idProducto= Number(req.params.idProducto)
    const updatedAt= new Date()
    const {name, description, value, units, updatedByUserId, providerId} = req.body
    connection.query(
        `update products set name= ?, description=?, value=?, units=?, updatedAt=?, updatedByUserId=?, providerId=? where id=?`,
        [name, description, value, units, updatedAt, updatedByUserId, providerId, idProducto], 
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
        
})

app.get("/usuarios", (req,res)=>{
    
    connection.query(`SELECT * FROM usuarios`, (error, result, fields)=>{

        res.json({
            result
        })
    })
    
})
app.get("/usuarios/:idUser", (req, res) =>{
    const idUser= Number(req.params.idUser)

    connection.query(`SELECT * FROM usuarios WHERE id= ${idUser}`, (error, result, fields)=>{
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
    
})
app.delete("/usuarios/:idUser", (req, res) =>{
    const idUser = Number(req.params.idUser)

    connection.query(`DELETE FROM usuarios WHERE id= ${idUser}`, (error, result, fields)=>{
            res.json({
                success: result.affectedRows>0
            })
    })
 
})
app.post("/usuarios", (req, res) =>{
    const name= req.body.name
    const lastname= req.body.lastname
    const email= req.body.email
    const phone= req.body.phone
      
        if(!name || !lastname || !email){
            res.status(400).json({
                message: "Todos los campos son requeridos"
            })
        } 
        else{
    let usuarioNuevo = {
         name, lastname, email, phone
    }
    connection.query(`INSERT INTO usuarios set ?`, usuarioNuevo, (error, result, fields)=>{
        res.json({
            success: result.affectedRows !== 0
        })
    
    })
    }
})
app.put("/usuarios/:idUser", (req, res) =>{
    const idUser= Number(req.params.idUser)
   

const name= req.body.name
const lastname= req.body.lastname
const email= req.body.email
const phone=req.body.phone


    connection.query(
        `UPDATE usuarios SEt name=?, lastname=?, email=?, phone=? WHERE id=?`,
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
})

//traer todos los usuarios
app.get("/providers", (req, res)=>{
    connection.query(`SELECT * FROM providers`, (error, result, fields)=>{
        res.json({
            result
        })
    })
})
//traer un provider por id
app.get("/providers/:idprovider", (req, res) => {
    const idProvider = Number(req.params.idprovider)

    connection.query(`SELECT * FROM providers WHERE id=${idProvider}`, (error, result, fields)=>{
        
        if(result.length === 0 ){
            res.status(404).json({
                message: "ID not found"
            })
            return
        }
            res.json({ provider: result[0] })
    })
    

})
//Create new provider
app.post("/providers", (req, res) => {
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
        connection.query(`INSERT INTO providers set ?`, newprovider, (error, result, fields)=>{
           
            res.json({success: result.affectedRows !== 0})
        })
    }  
})
//update provider
app.put("/providers/:idprovider", (req, res) =>{

    const idprovider= Number(req.params.idprovider)
    const { name, phone, email } = req.body
       
    connection.query(`UPDATE providers set name=?, email=?, phone=? WHERE id=?`,
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
})
app.delete("/providers/:idprovider", (req, res) => {
    const idProvider= Number(req.params.idprovider)

        connection.query(`DELETE FROM providers WHERE id=${idProvider}`, (error, result, fields)=>{
            res.json({ success: result.affectedRows>0 })
        })
})

app.listen(9000, ()=>{
    console.log("corriendo puerto 9000")
} )