import { check } from "express-validator";


export const validar_datos_usuario = [
    check('nombres', 'Nombre es obligatorio')
    .not().isEmpty().isLength({max:50,min:3}),
    check('correo', '"correo invalido').isEmail(),
    check('telefono', "Telefono es obligatorio")
    .not().isEmpty().isLength({max:11,min:10})
]