//db/conn.js

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('docepets', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
})


try {
    sequelize.authenticate()
    console.log('Conectado ao banco!!!!!!')
} catch (error) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize