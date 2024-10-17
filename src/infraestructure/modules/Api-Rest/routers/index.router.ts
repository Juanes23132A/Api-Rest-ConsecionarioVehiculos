import Express from "express"
import { UsuariosControllers } from "../../../../application/usuarios.controller";
export const routes = () => {
    const router = Express.Router();
    const usuariosCtrl = new UsuariosControllers();
    router.get("/usuarios", (req, res) => {
        usuariosCtrl.obtener().then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error.message);
        })
    })
    return router;

    
}
