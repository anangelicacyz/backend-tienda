const express = require("express")
const db = require("./db")
const cors= require(`cors`)

const app = express()
app.use(express.json())
app.use(cors())

const productController = require('./products/products.controller')
const providerController= require(`./providers/providers.controller`)
const userController= require(`./users/users.controller`)
const financeController= require(`./finances/finance.controller`)

app.use('/products', productController )

app.use(`/providers`, providerController)

app.use(`/users`, userController)

app.use(`/finances`, financeController)

app.listen(9000, ()=>{
    console.log("corriendo puerto 9000")
} )