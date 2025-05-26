import { Router } from "express";
import { methodHTTP } from "../controllers/categorias.controllers.js";

const router = Router();

router.get("/", methodHTTP.getCamisetas);
router.post("/", methodHTTP.createCamiseta);
router.put("/:id", methodHTTP.updateCamiseta);
router.delete("/:id", methodHTTP.deleteCamiseta);

export default router;