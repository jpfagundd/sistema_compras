const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
const PORT = process.env.PORT
const hostname = 'localhost'

const conn = require('./db/conn')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em: http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Não foi possível se conectar com o banco de dados: ', err)
})