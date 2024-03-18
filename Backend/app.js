import express from 'express';
import bodyParser from "body-parser";
import usuario from './src/routers/usuario.router.js'; 
import juego from './src/routers/juego.router.js';
import validar from './src/routers/validator.router.js';
import cors from 'cors';

const servidor = express();
servidor.use(cors());

//configuración
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));

//rutas
servidor.use('/usuario',usuario);
servidor.use('/juego',juego);
servidor.use('/validate',validar);




servidor.set('view engine', 'ejs');
servidor.set('views', './src/views');
servidor.use(express.static('./src/public'));

servidor.get('/documents', (req, res) => {
    res.render('documentacion.ejs');
});


servidor.listen(3000,()=>{
    console.log('El servidor se esta ejecutando en el puerto 3000');
});