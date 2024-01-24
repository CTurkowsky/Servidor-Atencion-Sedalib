const jwt = require('jsonwebtoken')

const validarJWT = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    req.uid = uid
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token no valido'
    })
  }
  next()
}

module.exports = {
  validarJWT
}
