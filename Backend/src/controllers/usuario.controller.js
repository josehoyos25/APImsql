import { json } from 'express';
import { pool } from '../database/conexion.js';

export const listarUsuario = async(req,res)=> {

        try{
            const [result] = await pool.query('select * from usuarios');
            
            if(result.length>0){
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({'message': 'No se econtraron usuarios'});
            }
            
        }catch(e){
            return res.status(500).json({'message': 'error' + e});
        }

};

export const RegistrarUsuario = async(req,res)=> {
    try {
    let {idusuario, nombres, direccion, telefono, correo, rol, password} =req.body;
    let sql = `insert into usuarios (idusuario,nombres, direccion, telefono, correo, rol, password)
               values ('${idusuario}','${nombres}', '${direccion}', '${telefono}', '${correo}', '${rol}','${password}')`;

        let [rows] = await pool.query(sql);
        if(rows.affectedRows>0){
            return res.status(200).json({"status":200, "message": "Se registró con éxito el usuario"});
        }else {
            return res.status(403).json({"status":403,"message": "Usuario no registrado"});
        }
    }catch(e){
        return res.status(500).json({ "message": e.message });
    }    
};

export const EliminarUsuario = async(req, res) => {

    try {
    let id = req.params.id;
    let sql = `delete from usuarios where idusuario = ${id}`;
    let[rows] = await pool.query(sql);

        if(rows.affectedRows > 0) {
            return res.status(200).json({"status":200, "message": "Usuario elminado con éxito"});
        } else {
            return res.status(403).json({"status":403, "message": "Usuario no eliminado"});
        }
    }catch(e) {
        return res.status(500).json({"message": e.message});
    }
};

export const ActualizarUsuario = async(req, res) => {

    try {
        let id = req.params.id;
        let {nombres, direccion, telefono, correo, rol, password} =req.body;
        let sql = `
            UPDATE usuarios
            set nombres = ?,
                direccion = ?,
                telefono = ?,
                correo = ?,
                rol = ?,
                password = ?
            WHERE idusuario = ?
        `;
        let [rows] = await pool.query(sql, [nombres, direccion, telefono, correo, rol, password, id]);

            if (rows.affectedRows > 0) {
                return res.status(200).json({"status":200, "message": "Usuario actualizado con éxito" });
            } else {
                return res.status(404).json({"status":403, "message": "Usuario no actualizado" });
            }
    }catch (e) {
        return res.status(500).json({ "message": e.message });
    }

};

export const consultarUsuario = async(req, res) =>{
  try {
    let id = req.params.id;
    let sql = `select * from usuarios where idusuario = ${id}`;
    let [rows] = await pool.query(sql);
    
    if(rows.length > 0) return res.status(200).json(rows);
    else return res.status(404).json({ "message": "usuario no encontrado"});
  } catch (e) {
    return res.status(500).json({ "message": e.message });
  }

};



