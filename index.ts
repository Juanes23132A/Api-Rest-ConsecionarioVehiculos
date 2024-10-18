import Express from "express";
import { routes } from "./src/infraestructure/modules/Api-Rest/routers/index.router";
import middleware404 from "./src/infraestructure/modules/Api-Rest/middleware/middleware";

const createServer = () => {
  const app = Express();

  app.use(Express.json());

  app.get("/api", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });
  
  app.use("/api/v1", routes());

  app.use(middleware404);

  app.use("/api/v1/", routes())
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`)
  })
}
createServer()