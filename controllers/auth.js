const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario / Password no son correctos - correo'
      })
    }
    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario / Password no son correctos - password'
      })
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id_usuario)
    res.json({
      ok: true,
      usuario,
      token
    })
  } catch (error) {
    console.error(error) // Cambiado a console.error para resaltar errores
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
      error: error.message // Devuelve el mensaje de error específico
    })
  }
}
const renewToken = async (req, res) => {
  try {
    const { uid } = req
    const usuario = await Usuario.findByPk(uid)
    const token = await generarJWT(uid)
    res.json({
      ok: true,
      usuario,
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
      error: error.message
    })
  }
}
module.exports = { login, renewToken }
