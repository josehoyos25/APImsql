import { Router } from "express";
import { listarUsuario ,RegistrarUsuario, EliminarUsuario, ActualizarUsuario, consultarUsuario} from '../controllers/usuario.controller.js'; 
import { validarToken } from "../controllers/validator.controller.js";
import { validar_datos_usuario } from "./validator/validate.usuario.js";

const route = Router();

route.get('/listar', listarUsuario);
route.post('/registrar', validar_datos_usuario, RegistrarUsuario);
route.delete('/eliminar/:id',EliminarUsuario);
route.put('/actualizar/:id',ActualizarUsuario);
route.get('/consultar/:id', consultarUsuario);


export default route;