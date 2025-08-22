const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
const PORT = process.env.PORT
const hostname = 'localhost'

const conn = require('./db/conn')
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const compraController = require('./controller/compra.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/usuario', usuarioController.listar)
app.get('/usuario/listar/:id', usuarioController.listarId)
app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario/grafico', usuarioController.grafico)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)

app.get('/produto', produtoController.listar)
app.get('/produto/listar/:id', produtoController.listarId)
app.post('/produto', produtoController.cadastrar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

app.get('/compra', compraController.listar)
app.post('/compra', compraController.cadastrar)
app.put('/compra/:idCompra', compraController.atualizar)
app.delete('/compra/:idCompra', compraController.apagar)

app.get('/', (req,res)=>{
    res.status(200).json({message: "API rodando!"})
})

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em: http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Não foi possível se conectar com o banco de dados: ', err)
})