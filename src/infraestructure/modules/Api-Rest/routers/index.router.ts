import Express from "express"
import { vehiculoRoutes } from "./vehiculos.router";
import { usuarioRoutes } from "./usuarios.router";
import { reservaRoutes } from "./reservas.router";

export const routes = () => {
    const router = Express.Router();
    router.get("/", (req, res) => {

    });
    router.use(usuarioRoutes());
    router.use(reservaRoutes());
    router.use(vehiculoRoutes());

 return router;
}
