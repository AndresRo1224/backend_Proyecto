/*importamos el framework express*/

import express from "express";
import categoriasRoutes from "./routes/categorias.routes.js";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";

/*Asignar funcionalidad para mi server web*/
const app = express();

app.use(cors());

/*setear puerto a mi server web*/

app.set("port",5000);


/*rutas*/

app.use("/api/camisetas",categoriasRoutes)
app.use("/api/usuarios", usuariosRoutes)

/*hacer disponible a mi server app para toda la aplicacion*/
export default app;
