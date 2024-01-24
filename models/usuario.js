const { DataTypes } = require('sequelize')
const db = require('../database/config')

const Usuario = db.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  apellidos: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  modalidad: {
    type: DataTypes.STRING
  },
  estado: {
    type: DataTypes.BOOLEAN
  },
  rol: {
    type: DataTypes.STRING
  }
},
{
  tableName: 'Usuarios'
}
)
module.exports = Usuario
