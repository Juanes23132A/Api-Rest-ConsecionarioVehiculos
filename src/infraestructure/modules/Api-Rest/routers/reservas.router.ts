import Express from "express";
import { ReservasControllers } from "../../../../application/reservas.constroller";

export const reservaRoutes = () => {
    const router = Express.Router();
  
    const reservaCtrl = new ReservasControllers();
  
    router.post("/reservas", (req, res) => {
      const payload = req.body;
      reservaCtrl
        .agregar(payload)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }); 

    router.put("/reservas", (req, res) => {
        const payload = req.body;
        reservaCtrl
          .actualizar(payload)
          .then((result) => {
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
    });

    router.get("/reservas", async (_, res) => {
        try {
          const result = await reservaCtrl.obtener();
          res.send(result);
        } catch (error) {
          res.send({
            message: "Ha ocurrido un error al consultar las reservas",
          });
        }
    });

    router.delete("/reservas/:id", async (req, res) => {
        try {
          const id = req.params.id;
          if (Number.isNaN(id)) {
            res.status(400).send({ ok: false, message: "Error en el id enviado" });
            return;
          }
          const result = await reservaCtrl.eliminar(id);
          const status = result.ok === true ? 200 : 400;
          res.status(status).send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      });
    
      return router;
}