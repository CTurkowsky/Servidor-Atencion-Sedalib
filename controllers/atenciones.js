const { Usuario, Atencion } = require('../models/associations')

const { Op } = require('sequelize') // Importa el operador de Sequelize

const getAtenciones = async (req, res) => {
  const page = Number(req.query.page) || 1 // Obtiene el número de página de la consulta, por defecto es 1
  const pageSize = Number(req.query.pageSize) || 50 // Obtiene el tamaño de página de la consulta, por defecto es 10
  const fromDate = req.query.fromDate // Obtiene la fecha de inicio de la consulta
  const toDate = req.query.toDate // Obtiene la fecha de fin de la consulta

  const where = {}
  if (fromDate && toDate) {
    where.fecha = {
      [Op.between]: [new Date(fromDate), new Date(toDate)] // Filtra por fecha si se proporcionan fromDate y toDate
    }
  }

  const total = await Atencion.count({ where }) // Cuenta el total de registros que cumplen con el criterio de búsqueda

  let atenciones = await Atencion.findAll({
    where,
    limit: pageSize, // Limita el número de resultados
    offset: (page - 1) * pageSize, // Se salta los resultados de las páginas anteriores
    include: [{
      model: Usuario,
      as: 'usuario',
      attributes: ['email']
    }]
  })

  atenciones = atenciones.map(atencion => {
    const plainAtencion = atencion.get({ plain: true })
    plainAtencion.id_usuario = atencion.usuario.email
    delete plainAtencion.usuario
    return plainAtencion
  }) // Mapea la respuesta para que el email del usuario esté en id_usuario

  const hasMore = total > page * pageSize // Comprueba si hay más registros por recuperar

  res.json({ atenciones, hasMore }) // Devuelve los registros y la bandera hasMore
}
const getAtencion = async (req, res) => {
  const { id } = req.params
  const atencion = await Atencion.findByPk(id)
  if (!atencion) {
    return res.status(404).json({
      ok: false,
      msg: 'No existe una atención con el id ' + id
    })
  }
  res.json({
    ok: true,
    atencion
  })
}

const postAtenciones = async (req, res) => {
  const { body } = req
  const atencion = Atencion.build(body)

  const existeAtencion = await Atencion.findOne({
    where: {
      numero_atencion: body.numero_atencion
    }
  })
  if (existeAtencion) {
    return res.status(400).json({
      ok: false,
      msg: 'Ya existe una atención con el número ' + body.numero_atencion
    })
  }
  await atencion.save()

  res.json({
    ok: true,
    atencion
  })
}

const putAtenciones = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    const atencion = await Atencion.findByPk(id)
    if (!atencion) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una atención con el id ' + id
      })
    }
    await atencion.update(body)
    res.json({
      ok: true,
      atencion
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const deleteAtenciones = async (req, res) => {
  const { id } = req.params
  try {
    const atencion = await Atencion.findByPk(id)
    if (!atencion) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe atencion con el id ' + id
      })
    }

    await atencion.destroy()

    res.json({
      ok: true,
      msg: 'Atencion eliminada correctamente'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  getAtenciones,
  postAtenciones,
  putAtenciones,
  deleteAtenciones,
  getAtencion
}
