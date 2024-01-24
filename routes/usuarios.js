const { Router } = require('express')
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, getUsuario } = require('../controllers/usuarios.js')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos.js')
const router = Router()

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
  check('modalidad', 'La modalidad es obligatoria').not().isEmpty(),
  check('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail(),
  validarCampos
],
postUsuarios)
router.put('/:id', putUsuarios)
router.delete('/:id', deleteUsuarios)

module.exports = router
