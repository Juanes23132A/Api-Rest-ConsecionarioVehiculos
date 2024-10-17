console.log("Sistema de pedidos");

// @ts-ignore
import * as readline from "readline";
import { UsuariosControllers } from "./src/application/usuarios.controller";
// @ts-ignore
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Es el reemplazo de leer en el pseint
const leerDatos = (mensaje: string): Promise<string> =>
  new Promise((resolve) => rl.question(mensaje, (respuesta: string) => resolve(respuesta)));

const main = async () => {
  const menu = `
  1. Listar productos
  2. Agregar usuario
  3. Modificar producto
  4. Eliminar producto
  5. Consultar un producto
  0. Salir
  `;
  let _opcion = await leerDatos(menu);
  let opcion = Number(_opcion);
  const usuariosCtrl = new UsuariosControllers();
  while (opcion !== 0) {
    switch (opcion) {
      case 1:
        const result = await usuariosCtrl.obtener();
        console.log(result)
        break;
      case 2:
        const nombre = await leerDatos("Ingrese nombre del usuario: ");
        const email = await leerDatos("Ingrese email del usuario: ");
        const telefono = await leerDatos("Ingrese el telefono del usuario: ");
        await usuariosCtrl.agregar({
          nombre,
          email,
          telefono, // Se puede realizar la abreviación dejando solo precio
        });
        break;
    }
    _opcion = await leerDatos(menu);
    opcion = Number(_opcion);
  }
  rl.close();
};
main();