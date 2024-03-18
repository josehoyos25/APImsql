import { createPool } from 'mysql2/promise';

//validar usuario en la DB
//VARIABLES DE ENTORNO ...

import dotenv from "dotenv"; // importar módulo
  //importar el archivo de conexión
  dotenv.config({path:'./src/env/.env'});

export const pool = createPool(
    {
        //agregar los datos de nuestro archivo .env a las variables
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
); 
//VARIABLES DE ENTORNO ...