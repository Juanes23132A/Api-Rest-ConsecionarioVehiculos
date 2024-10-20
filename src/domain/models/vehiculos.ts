
export class Vehiculos {
    id?: number;
    marca: string;
    modelo: string;
    anio: string

    constructor(infoVehiculo: {
        id?: number,
        marca: string,
        modelo: string,
        anio: string
    }) {
        this.id = infoVehiculo.id
        this.marca = infoVehiculo.marca
        this.modelo = infoVehiculo.modelo
        this.anio = infoVehiculo.anio
    }
}