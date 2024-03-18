import { check } from "express-validator";
import { Router } from "express";
import { CargarImagen, listarJuegos, RegistrarJuego, EliminarJuego, ActualizarJuego} from "../controllers/juego.controller.js";
//import { validarToken } from "../controllers/validator.controller.js";

const router = Router();

router.get('/listar',listarJuegos);
router.post('/registrar', CargarImagen, RegistrarJuego);
router.delete('/eliminar/:id', EliminarJuego);
router.put('/actualizar/:id', ActualizarJuego);


export default router;