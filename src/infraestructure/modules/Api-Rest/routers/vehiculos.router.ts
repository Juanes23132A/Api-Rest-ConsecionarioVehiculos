import Express from "express";
import { VehiculosControllers } from "../../../../application/vehiculos.controller";

export const vehiculoRoutes = () => {
    const router = Express.Router();
  
    const vehiculoCtrl = new VehiculosControllers();
  
    router.post("/vehiculos", (req, res) => {
      const payload = req.body;
      vehiculoCtrl
        .agregar(payload)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }); 

    router.put("/vehiculos", (req, res) => {
        const payload = req.body;
        vehiculoCtrl
          .actualizar(payload)
          .then((result) => {
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
    });

    router.get("/vehiculos", async (_, res) => {
        try {
          const result = await vehiculoCtrl.obtener();
          res.send(result);
        } catch (error) {
          res.send({
            message: "Ha ocurrido un error al consultar los vehiculos",
          });
        }
    });

    router.delete("/vehiculos/:id", async (req, res) => {
        try {
          const id = req.params.id;
          if (Number.isNaN(id)) {
            res.status(400).send({ ok: false, message: "Error en el id enviado" });
            return;
          }
          const result = await vehiculoCtrl.eliminar(id);
          const status = result.ok === true ? 200 : 400;
          res.status(status).send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      });
    
      return router;
}