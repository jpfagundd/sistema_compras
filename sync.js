require('dotenv').config()
const conn = require('./db/conn')
const Usuario = require('./model/Usuario')
const Produto = require('./model/Produto')
const Compra = require('./model/Compra')

async function syncDataBase() {
    try{
        await Usuario.sync({ force: true })
        await Produto.sync({ force: true })
        await Compra.sync({ force: true })
        console.log('Tabelas criadas e Banco de dados sincronizado!')
    }catch(err){
        console.error('Não foi possível criar as tabelas e sincronizar o BD!',err)
    }finally{
        await conn.close()
        console.log('Banco de dados fechado!')
    }
}

syncDataBase()