import express from "express";
import categoriasRoutes from "./routes/categorias.routes.js";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";
import path from "path";

/*Asignar funcionalidad para mi server web*/
const app = express();

app.use(cors());

/*setear puerto a mi server web*/
app.set("port", process.env.PORT || 5000);

// Ruta absoluta al directorio del frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta para servir index.html en la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

/*rutas de la API*/
app.use("/api/camisetas", categoriasRoutes);
app.use("/api/usuarios", usuariosRoutes);

/*hacer disponible a mi server app para toda la aplicacion*/
export default app;