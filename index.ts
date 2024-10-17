import Express from "express";
import { routes } from "./src/infraestructure/modules/Api-Rest/routers/index.router";

const createServer = () => {
  const app = Express();
  const PORT = process.env.PORT || 3000;
  app.use("/api/v1/", routes())
  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`)
  })
}
createServer()