//User.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})
module.exports = User