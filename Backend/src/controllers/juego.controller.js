import { json } from 'express';
import { pool } from '../database/conexion.js';

export const listarJuegos = async(req,res)=> {

    const [result] = await pool.query('select * from juegos');
    res.status(200).json(result);

};

export const RegistrarJuego = async(req, res)=> {
    try {
    let {idjuego, nombre, descripcion, imagen, precio} =req.body;
    let sql = `insert into juegos (idjuego, nombre, descripcion, imagen, precio)
               values ('${idjuego}', '${nombre}', '${descripcion}', '${imagen}', '${precio}')`;

               let [rows] = await pool.query(sql);
               if(rows.affectedRows>0) {
                    return res.status(200).json({"message": "Se registró con éxito el juego"});
               } else {
                    return res.status(403).json({"message": "Juego no resgistrado" });
               }
               
    }catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const EliminarJuego = async(req, res) => {

    try {
        let id = req.params.id;
        let sql = `delete from juegos where idjuego = ${id}`;
        let [rows] = await pool.query(sql);

            if(rows.affectedRows > 0) {
                return res.status(200),json({"message": "El juego ha sido elminado"});
            } else {
                return res.status(404).json({"Message": "Juego no elminado"});
            }
    } catch (e){ 
        return res.status(500).json({"message": e.message});     
    }

};

export const ActualizarJuego = async(req, res) => {

    try{
        let id = req.params.id;
        let {nombre, descripcion, imagen, precio} = req.body;
        let sql = `UPDATE juegos SET nombre = ?, descripcion = ?, imagen = ?, precio = ? WHERE idjuego = ?`;
        let [rows] = await pool.query(sql, [nombre, descripcion, imagen, precio, id]);

            if(rows.affectedRows > 0) {
                return res.status(200).json({"message": "El juego ha sido actualizado"});
            } else {
                return res.status(404).json({ "message": "Juego no encontrado" });
            } 
    }catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};
 