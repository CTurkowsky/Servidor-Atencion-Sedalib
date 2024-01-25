const { DataTypes } = require('sequelize')
const db = require('../database/config')

const Atencion = db.define('Atencion', {
  id_atencion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo_suministro: {
    type: DataTypes.NUMBER
  },
  departamento: {
    type: DataTypes.STRING
  },
  provincia: {
    type: DataTypes.STRING
  },
  distrito: {
    type: DataTypes.STRING
  },
  direccion: {
    type: DataTypes.STRING
  },
  nombre_cliente: {
    type: DataTypes.STRING
  },
  celular: {
    type: DataTypes.NUMBER
  },
  doc_identidad: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  modalidad: {
    type: DataTypes.STRING
  },
  categoria: {
    type: DataTypes.STRING
  },
  sub_categoria: {
    type: DataTypes.STRING
  },
  petitorio: {
    type: DataTypes.STRING
  },
  numero_atencion: {
    type: DataTypes.STRING
  },
  fecha: {
    type: DataTypes.DATE
  },
  id_usuario: {
    type: DataTypes.INTEGER
  },
  estado: {
    type: DataTypes.BOOLEAN
  }
},
{
  tableName: 'Atenciones'
}
)

module.exports = Atencion
