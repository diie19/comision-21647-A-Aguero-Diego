const { DataTypes } = require('sequelize');
const { sequelize} = require('./dataBase.js');

const asado = sequelize.define('asado', {
    imagen: {
        type: DataTypes.STRING,
    },
    titulo: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    tableName: 'asados',
});

module.exports = asado;