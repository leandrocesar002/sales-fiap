const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, 
});

module.exports = sequelize;