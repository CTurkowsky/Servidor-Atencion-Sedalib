const { Router } = require('express')
const { getAtenciones, getAtencion, postAtenciones, putAtenciones, deleteAtenciones } = require('../controllers/atenciones.js')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos.js')
const { validarJWT } = require('../middlewares/validar-jwt.js')
const router = Router()

router.use(validarJWT)
router.get('/', getAtenciones)
router.get('/:id', getAtencion)
router.post('/', [
  check('nombre_cliente', 'El nombre es obligatorio').not().isEmpty(),
  check('departamento', 'El departamento es obligatorio').not().isEmpty(),
  check('provincia', 'La provincia es obligatoria').not().isEmpty(),
  check('distrito', 'El distrito es obligatorio').not().isEmpty(),
  check('direccion', 'La dirección es obligatoria').not().isEmpty(),
  check('celular', 'El celular es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').optional({ checkFalsy: true }).isEmail(),
  check('modalidad', 'La modalidad es obligatoria').not().isEmpty(),
  check('categoria', 'La categoría es obligatoria').not().isEmpty(),
  check('petitorio', 'El petitorio es obligatorio').not().isEmpty(),
  check('id_usuario', 'El id del usuario es obligatorio').not().isEmpty(),
  check('sub_categoria', 'El tipo de categoría es obligatorio').not().isEmpty(),
  check('codigo_suministro', 'El número de suministro es obligatorio')
    .not().isEmpty()
    .isLength({ min: 6, max: 12 }),
  check('numero_atencion', 'El número de atención es obligatorio y debe tener 11 dígitos')
    .not().isEmpty()
    .isLength({ min: 11, max: 11 }),
  validarCampos
], postAtenciones)
router.put('/:id', putAtenciones)
router.delete('/:id', deleteAtenciones)

module.exports = router
