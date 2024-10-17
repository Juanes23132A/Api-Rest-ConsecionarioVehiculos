import { Usuarios } from "../domain/models/usuarios";
import { UsuariosRepositorie } from "../infraestructure/repositories/usuarios-Repositorie";

export class UsuariosControllers{
private repositorio: UsuariosRepositorie;

constructor() {
    this.repositorio = new UsuariosRepositorie();
}

  async agregar(payload: {
    nombre: string;
    email: string;
    telefono: string;
  }) {
    const usuarios = new Usuarios({
        nombre: payload.nombre,
        email: payload.email,
        telefono: payload.telefono
    });
    const result = await this.repositorio.agregarUsuario(usuarios);
    return result;
  }

  async obtener(){
    try {
      const result = await this.repositorio.obtenerUsuario();
      return result;
    } catch (error) {
      return error;
    }
  }
}