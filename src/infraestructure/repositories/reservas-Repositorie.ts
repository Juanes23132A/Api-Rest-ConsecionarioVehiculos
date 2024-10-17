import { FieldPacket, ResultSetHeader } from "mysql2";
import { getPoolConection } from "../../../config/data-source";
import { Reservas } from "../../domain/models/reservas";

export class ReservasRepositorie {

    async agregarReserva(reservas: Reservas) {
        const connection = await getPoolConection();
        const querySql = `INSERT INTO reservas (usuario_id, vehiculo_id, fecha_reserva)  VALUES (?, ?, ?)`;
        const values = [reservas.usuario_id, reservas.vehiculo_id, reservas.fecha_reserva]
        const  result = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerReservas() {
        const connection  = getPoolConection();
        const querySql = `SELECT * FROM reservas`;
        const result = await connection.query(querySql);
        return result[0];
    }

    async actualizarReserva(reservas: Reservas) {
        const connection = getPoolConection();
        const querySql = `UPDATE reservas SET usuario_id = ?, vehiculo_id = ?, fecha_reserva = ? WHERE id = ?`;
        const values = [reservas.usuario_id, reservas.vehiculo_id, reservas.fecha_reserva, reservas.id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async eliminarReserva(id: string) {
        const connection  = getPoolConection();
        const querySql = `DELETE FROM reservas WHERE id = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}