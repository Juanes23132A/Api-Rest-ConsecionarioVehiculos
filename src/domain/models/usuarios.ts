
export class Usuarios {
    id?: number;
    nombre: string;
    email: string;
    telefono: string;

    constructor(infoUsuarios: {
        id?: number,
        nombre: string,
        email: string,
        telefono: string
    }) {
        this.id = infoUsuarios.id
        this.nombre = infoUsuarios.nombre
        this.email = infoUsuarios.email
        this.telefono = infoUsuarios.telefono
    }
}