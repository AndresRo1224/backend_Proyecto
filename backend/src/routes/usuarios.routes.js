import { Router } from "express";
import { methodHTTP } from "../controllers/clientes.controllers.js"; // Importar el controlador

const router = Router();

// Ruta para obtener todos los clientes
router.get("/", methodHTTP.getClientes);

export default router;