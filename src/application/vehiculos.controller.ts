import { ResultSetHeader } from "mysql2";
import { Vehiculos } from "../domain/models/vehiculos";
import { vehiculosRepositorie } from "../infraestructure/repositories/vehiculos-Repositorie";

export class VehiculosControllers {
    private repositorio: vehiculosRepositorie;

    constructor() {
        this.repositorio = new vehiculosRepositorie();
    }

    async agregar(payload: {
        marca: string;
        modelo: string;
        anio: string;
    }) {
        try {
            const vehiculos = new Vehiculos({
                marca: payload.marca,
                modelo: payload.modelo,
                anio: payload.anio
            });
            const result = await this.repositorio.agregarVehiculo(vehiculos);
            if (result.affectedRows == 1) {
                return { ok: true, id: result.insertId };
            } else {
                return { ok: false, message: "No se agrego el vehiculo" };
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al guardar el vehiculo", error?.message);
            throw error;
        }
    }

    async obtener() {
        try {
            const result = await this.repositorio.obtenerVehiculos();
            return result;
        } catch (error) {
            return error;
        }
    }

    async actualizar(payload: {
        id: number;
        marca: string;
        modelo: string;
        anio: string;
    }) {
        try {
            const vehiculos = new Vehiculos({
                id: payload.id,
                marca: payload.marca,
                modelo: payload.modelo,
                anio: payload.anio
            });
            const result = await this.repositorio.actualizarVehiculo(vehiculos);
            if (result.affectedRows === 1) {
                return { ok: true, message: "Vehiculo actualizado" };
            } else {
                return { ok: false, message: "No se pudo actualizar el vehiculo" };
            }
        } catch (error) {
            console.log("Ha ocurrido un error actualizando el vehiculo");
            throw error;
        }
    }

    async eliminar(id: string) {
        const result: ResultSetHeader = await this.repositorio.eliminarVehiculo(id)
        if (result.affectedRows == 1) {
            return { ok: true, message: "Vehiculo eliminado correctamente" };
        } else {
            return { ok: false, message: "No se pudo eliminar el vehiculo" };
        }
    }
}