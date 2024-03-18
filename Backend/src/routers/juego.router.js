import { Router } from "express";
import { listarJuegos, RegistrarJuego, EliminarJuego, ActualizarJuego} from "../controllers/juego.controller.js";
import { validarToken } from "../controllers/validator.controller.js";

const router = Router();

router.get('/listar',listarJuegos);
router.post('/registrar', validarToken, RegistrarJuego);
router.delete('/eliminar/:id', validarToken, EliminarJuego);
router.put('/actualizar/:id', validarToken, ActualizarJuego);


export default router;