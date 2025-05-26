import { Router } from "express";
import { crearPedido, obtenerPedidos, confirmarPedido, obtenerPedidosPorCorreo} from "../controllers/pedidos.controllers.js";


const router = Router();

router.post("/", crearPedido); // Crear pedido
router.get("/", obtenerPedidos); // Ver todos los pedidos (admin)
router.put("/:id/confirmar", confirmarPedido); // Confirmar pedido
router.get("/correo/:correo", obtenerPedidosPorCorreo);

export default router;