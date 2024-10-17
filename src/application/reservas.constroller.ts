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
        const reservas = new Reservas({
            usuario_id: payload.usuario_id,
            vehiculo_id: payload.vehiculo_id,
            fecha_reserva: payload.fecha_reserva
        });
        const result = await this.repositorio.agregarReserva(reservas);
        return result;
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
        const reservas = new Reservas({
            id: payload.id,
            usuario_id: payload.usuario_id,
            vehiculo_id: payload.vehiculo_id,
            fecha_reserva: payload.fecha_reserva
        });
        const result = await this.repositorio.actualizarReserva(reservas);
        return result;
    }

    eliminar(id: number) {
        this.repositorio.eliminarReserva(id)
    }
}