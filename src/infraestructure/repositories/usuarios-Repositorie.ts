import { getPoolConection } from "../../../config/data-source";
import { Usuarios } from "../../domain/models/usuarios";

export class UsuariosRepositorie {

    async agregarUsuario (usuarios: Usuarios){
        const connection = getPoolConection();
        const querySql = `INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)`;
        const values = [usuarios.nombre, usuarios.email, usuarios.telefono];
        const result = await connection.query(querySql, values);
        return result;
    }

    async obtenerUsuario (){
        const connection = getPoolConection();
        const querySql = `SELECT * FROM usuarios`;
        const result = await connection.query(querySql);
        return result;
    }

}