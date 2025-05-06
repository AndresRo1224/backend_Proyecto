import { Router } from "express";
import { methodHTTP } from "../controllers/categorias.controllers.js";

const router = Router();

// Ruta para obtener todas las camisetas
router.get("/", methodHTTP.getCamisetas);

export default router;