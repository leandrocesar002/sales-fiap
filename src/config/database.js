const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'username', 'password', {
    host: 'database-1.czmuka4aqktq.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false  
        }
    }
});

module.exports = sequelize;
