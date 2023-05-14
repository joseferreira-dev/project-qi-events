const Sequelize = require('sequelize');
const database = require('../database/database');

const Ponto = database.define('ponto',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    geometria:{
        type: Sequelize.GEOMETRY('GEOMETRY'),
        allowNull: false
    }
});

module.exports = Ponto;