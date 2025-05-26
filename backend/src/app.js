import express from "express";
import categoriasRoutes from "./routes/categorias.routes.js";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";
import path from "path";
import authRoutes from "./routes/auth.routes.js"; 
import pedidosRoutes from "./routes/pedidos.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.set("port", process.env.PORT || 5000);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend", "index.html"));
});

app.use("/api/camisetas", categoriasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pedidos", pedidosRoutes); 

export default app;