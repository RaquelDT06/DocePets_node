const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('../Model/User')

const Pet = db.define('Pet', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNascimento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    weight:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    raca:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

Pet.belongsTo(User)
User.hasMany(Pet)

module.exports = Pet