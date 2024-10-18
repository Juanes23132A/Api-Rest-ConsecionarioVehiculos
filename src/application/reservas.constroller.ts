import { ResultSetHeader } from "mysql2";
import { Reservas } from "../domain/models/reservas";
import { ReservasRepositorie } from "../infraestructure/repositories/reservas-Repositorie";

export class ReservasControllers {
    private repositorio: ReservasRepositorie;

    constructor() {
        this.repositorio = new ReservasRepositorie();
    }

    async agregar(payload: {
        usuario_id: number;
        vehiculo_id: number;
        fecha_reserva: Date;
    }) {
        try {
            const reservas = new Reservas({
                usuario_id: payload.usuario_id,
                vehiculo_id: payload.vehiculo_id,
                fecha_reserva: payload.fecha_reserva
            });
            const result = await this.repositorio.agregarReserva(reservas);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, message: "No se agrego la reserva" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al guardar la reserva.", error?.message);
            throw error;
        }
    }

    async obtener() {
        try {
            const result = await this.repositorio.obtenerReservas();
            return result;
        } catch (error) {
            return error;
        }
    }

    async actualizar(payload: {
        id: number;
        usuario_id: number;
        vehiculo_id: number;
        fecha_reserva: Date;
    }) {
        try {
            const reservas = new Reservas({
                id: payload.id,
                usuario_id: payload.usuario_id,
                vehiculo_id: payload.vehiculo_id,
                fecha_reserva: payload.fecha_reserva
            });
            const result = await this.repositorio.actualizarReserva(reservas);
            if (result.affectedRows === 1) {
                return { ok: true, message: "Reserva actualizada" };
            } else {
                return { ok: false, message: "No se pudo actualizar la reserva" };
            }
        } catch (error) {
            console.log("Ha ocurrido un error actualizando el usuario");
            throw error;
        }
    }

    async eliminar(id: string) {
        const result: ResultSetHeader = await this.repositorio.eliminarReserva(id)
        if (result.affectedRows == 1) {
            return { ok: true, message: `Reserva eliminada correctamente` };
        } else {
            return { ok: false, message: `No se pudo eliminar la reserva` };
        }
    }
}