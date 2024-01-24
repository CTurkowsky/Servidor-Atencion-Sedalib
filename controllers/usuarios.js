const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll()
  res.json({
    ok: true,
    usuarios
  })
}

const postUsuarios = async (req, res) => {
  const { body } = req

  const usuario = Usuario.build(body)
  const existeEmail = await Usuario.findOne({
    where: {
      email: body.email
    }
  })
  if (existeEmail) {
    return res.status(400).json({
      ok: false,
      msg: 'Ya existe un usuario con el email ' + body.email
    })
  }
  const salt = bcrypt.genSaltSync(10)
  usuario.password = bcrypt.hashSync(body.password, salt)
  await usuario.save()

  res.json({
    ok: true,
    msg: 'post API - usuariosPost',
    usuario
  })
}

const putUsuarios = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con el id ' + id
      })
    }

    // Si la contraseña está presente en el cuerpo de la solicitud, encriptarla
    if (body.password) {
      const salt = bcrypt.genSaltSync()
      body.password = bcrypt.hashSync(body.password, salt)
    }

    await usuario.update(body)
    res.json({
      ok: true,
      usuario
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const deleteUsuarios = async (req, res) => {
  const { id } = req.params
  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con el id ' + id
      })
    }
    await usuario.destroy()
    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const getUsuario = async (req, res) => {
  const { id } = req.params
  const usuario = await Usuario.findByPk(id)
  if (!usuario) {
    return res.status(404).json({
      ok: false,
      msg: 'No existe un usuario con el id ' + id
    })
  }
  res.json({
    ok: true,
    usuario
  })
}

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
  getUsuario
}
