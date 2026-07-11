const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('motocycle', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;