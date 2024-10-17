import { Vehiculos } from "../domain/models/vehiculos";
import { vehiculosRepositorie } from "../infraestructure/repositories/vehiculos-Repositorie";

export class VehiculosControllers {
    private repositorio: vehiculosRepositorie;

    constructor() {
        this.repositorio = new  vehiculosRepositorie();
    }

    async agregar(payload: {
        marca: string;
        modelo: string;
        anio: number;
    }) {
        const vehiculos = new Vehiculos({
            marca: payload.marca,
            modelo: payload.modelo,
            anio: payload.anio
        });
        const result = await this.repositorio.agregarVehiculo(vehiculos);
        return result;
    }

    async obtener() {
        try{
            const result = await this.repositorio.obtenerVehiculos();
            return result;
        } catch(error){
            return error;
        }
    }

    async actualizar(payload: {
        id: number;
        marca: string;
        modelo: string;
        anio: number;
    }){
        const vehiculos = new Vehiculos({
            id: payload.id,
            marca: payload.marca,
            modelo: payload.modelo,
            anio: payload.anio
        });
        const result = await this.repositorio.actualizarVehiculo(vehiculos);
        return result;
    }

    eliminar(id: number){
        this.repositorio.eliminarVehiculo(id)
    }
}