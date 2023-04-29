const mysql= require("mysql")


const db= mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "1234",
    database: "tienda"
})

 db.connect()


//exportar un objeto a otro archivo
    module.exports = db