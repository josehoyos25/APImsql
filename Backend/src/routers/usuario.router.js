import { Router } from "express";
import { listarUsuario ,RegistrarUsuario, EliminarUsuario, ActualizarUsuario, consultarUsuario} from '../controllers/usuario.controller.js'; 
import { validarToken } from "../controllers/validator.controller.js";

const route = Router();

route.get('/listar', listarUsuario);
route.post('/registrar', RegistrarUsuario);
route.delete('/eliminar/:id',EliminarUsuario);
route.put('/actualizar/:id',ActualizarUsuario);
route.get('/consultar/:id', consultarUsuario);


export default route;