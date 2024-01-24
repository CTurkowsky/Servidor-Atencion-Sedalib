const Usuario = require('./usuario')
const Atencion = require('./atencion')

Usuario.hasMany(Atencion, { as: 'atenciones', foreignKey: 'id_usuario' })
Atencion.belongsTo(Usuario, { as: 'usuario', foreignKey: 'id_usuario' })

module.exports = { Usuario, Atencion }
