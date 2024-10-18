import { ResultSetHeader } from "mysql2";
import { Usuarios } from "../domain/models/usuarios";
import { UsuariosRepositorie } from "../infraestructure/repositories/usuarios-Repositorie";

export class UsuariosControllers {
  private repositorio: UsuariosRepositorie;

  constructor() {
    this.repositorio = new UsuariosRepositorie();
  }

  async agregar(payload: {
    nombre: string;
    email: string;
    telefono: string;
  }) {
    try {
      const usuarios = new Usuarios({
        nombre: payload.nombre,
        email: payload.email,
        telefono: payload.telefono
      });
      const result = await this.repositorio.agregarUsuario(usuarios);
      if (result.affectedRows == 1) {
        return { ok: true, id: result.insertId };
      } else {
        return { ok: false, message: "No se agrego el usuario" };
      }
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar el usuario", error?.message);
      throw error;
    }
  }

  async obtener() {
    try {
      const result = await this.repositorio.obtenerUsuarios();
      return result;
    } catch (error) {
      return error;
    }
  }

  async actualizar(payload: {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
  }) {
    try {
      const usuario = new Usuarios({
        id: payload.id,
        nombre: payload.nombre,
        email: payload.email,
        telefono: payload.telefono
      });
      const result = await this.repositorio.actualizarUsuario(usuario);
      if (result.affectedRows === 1) {
        return { ok: true, message: "Usuario actualizado" };
      } else {
        return { ok: false, message: "No se pudo actualizar el usuario" };
      }
    } catch (error) {
      console.log("Ha ocurrido un error actualizando el usuario");
      throw error;
    }
  }

  async eliminar(id: string) {
    const result: ResultSetHeader = await this.repositorio.eliminarUsuario(id)
    if (result.affectedRows == 1) {
      return { ok: true, message: "Usuario eliminado correctamente" };
    } else {
      return { ok: false, message: "No se pudo eliminar el usuario" };
    }
  }
}