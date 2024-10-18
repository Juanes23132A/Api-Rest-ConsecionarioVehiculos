import { FieldPacket, ResultSetHeader } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { Vehiculos } from "../../domain/models/vehiculos";

export class vehiculosRepositorie {
    
    async agregarVehiculo(vehiculos: Vehiculos) {
        const connection = getPoolConection();
        const querySql = `INSERT INTO vehiculos (marca, modelo, anio) VALUES (?, ?, ?)`;
        const values = [vehiculos.marca, vehiculos.modelo, vehiculos.anio];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.execute(querySql, values);
        return result[0];
    }

    async obtenerVehiculos() {
        const connection = getPoolConection();
        const querySql = `SELECT * FROM vehiculos`
        const result = await connection.query(querySql);
        return result[0];
    }

    async actualizarVehiculo(vehiculos: Vehiculos) {
        const connection = getPoolConection();
        const querySql = `UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?  WHERE id = ?`;
        const values = [vehiculos.marca, vehiculos.modelo, vehiculos.anio, vehiculos.id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async  eliminarVehiculo(id: string) {
        const connection = getPoolConection();
        const querySql = `DELETE FROM vehiculos WHERE id = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}