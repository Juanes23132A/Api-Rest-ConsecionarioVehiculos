import Express from "express";
import { UsuariosControllers } from "../../../../application/usuarios.controller";

export const usuarioRoutes = () => {
    const router = Express.Router();

    const usuarioCtrl = new UsuariosControllers();

    router.post("/usuarios", (req, res) => {
        const payload = req.body;
        usuarioCtrl
            .agregar(payload)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.put("/usuarios", (req, res) => {
        const payload = req.body;
        usuarioCtrl
            .actualizar(payload)
            .then((result) => {
                const status = result.ok === true ? 200 : 400;
                res.status(status).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.get("/usuarios", async (_, res) => {
        try {
            const result = await usuarioCtrl.obtener();
            res.send(result);
        } catch (error) {
            res.send({
                message: "Ha ocurrido un error al consultar los usuarios",
            });
        }
    });

    router.delete("/usuarios/:id", async (req, res) => {
        try {
            const id = req.params.id;
            if (Number.isNaN(id)) {
                res.status(400).send({ ok: false, message: "Error en el id enviado" });
                return;
            }
            const result = await usuarioCtrl.eliminar(id);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    return router;
}