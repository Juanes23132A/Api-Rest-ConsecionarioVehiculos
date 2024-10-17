import { FieldPacket, ResultSetHeader } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { Usuarios } from "../../domain/models/usuarios";

export class UsuariosRepositorie {

    async agregarUsuario(usuarios: Usuarios) {
        const connection = getPoolConection();
        const querySql = `INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)`;
        const values = [usuarios.nombre, usuarios.email, usuarios.telefono];
        const result = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerUsuarios() {
        const connection = getPoolConection();
        const querySql = `SELECT * FROM usuarios`;
        const result = await connection.query(querySql);
        return result[0];
    }

    async actualizarUsuario(usuarios: Usuarios) {
        const connection = getPoolConection();
        const querySql = `UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id  = ?`;
        const values = [usuarios.nombre, usuarios.email, usuarios.telefono, usuarios.id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async eliminarUsuario(id: string) {
        const connection = getPoolConection();
        const querySql = `DELETE FROM usuarios WHERE id = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}