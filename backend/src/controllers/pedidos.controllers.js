import getConnection from "../db/database.js";

// Crear un pedido
export const crearPedido = async (req, res) => {
  const {
    id_usuario,
    nombre,
    telefono,
    barrio,
    direccion,
    ciudad,
    correo,
    carrito
  } = req.body;

  // Validación de campos
  if (
    !id_usuario ||
    !carrito || !Array.isArray(carrito) || carrito.length === 0 ||
    !nombre || !telefono || !barrio || !direccion || !ciudad || !correo
  ) {
    return res.status(400).json({ message: "Datos incompletos del pedido" });
  }

  try {
    const connection = await getConnection();

    // Insertar en la tabla pedidos con todos los datos
    const [pedidoResult] = await connection.query(
      `INSERT INTO pedidos 
        (id_usuario, Nombre, Telefono, Barrio, Direccion, Ciudad, Correo) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_usuario, nombre, telefono, barrio, direccion, ciudad, correo]
    );

    const id_pedido = pedidoResult.insertId;

    // Insertar productos del carrito en detalle_pedido y actualizar stock
    for (const item of carrito) {
      await connection.query(
        `INSERT INTO detalle_pedido 
          (id_pedido, id_camiseta, cantidad, precio_unitario) 
         VALUES (?, ?, ?, ?)`,
        [id_pedido, item.id_camiseta, item.cantidad, item.precio]
      );

      await connection.query(
        "UPDATE camisetas SET stock = stock - ? WHERE id_camiseta = ?",
        [item.cantidad, item.id_camiseta]
      );
    }

    res.json({ success: true, message: "Pedido realizado correctamente" });

  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener pedidos (admin)
export const obtenerPedidos = async (req, res) => {
  try {
    const connection = await getConnection();
    const [pedidos] = await connection.query(
      `SELECT p.id_pedido, p.fecha, p.estado, 
              p.Nombre, p.Telefono, p.Barrio, p.Direccion, p.Ciudad, p.Correo,
              u.nombre AS usuario
       FROM pedidos p
       JOIN usuarios u ON p.id_usuario = u.id_usuario
       ORDER BY p.fecha DESC`
    );

    // Adjuntar detalles de cada pedido
    for (const pedido of pedidos) {
      const [detalles] = await connection.query(
        `SELECT d.id_detalle, c.talla, c.equipo, d.cantidad, d.precio_unitario
         FROM detalle_pedido d
         JOIN camisetas c ON d.id_camiseta = c.id_camiseta
         WHERE d.id_pedido = ?`,
        [pedido.id_pedido]
      );
      pedido.detalles = detalles;
    }

    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Confirmar pedido (admin)
export const confirmarPedido = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    await connection.query(
      "UPDATE pedidos SET estado='confirmado' WHERE id_pedido=?",
      [id]
    );
    res.json({ success: true, message: "Pedido confirmado" });
  } catch (error) {
    console.error("Error al confirmar pedido:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
export const obtenerPedidosPorCorreo = async (req, res) => {
  const { correo } = req.params;
  try {
    const connection = await getConnection();
    const [pedidos] = await connection.query(
      `SELECT p.id_pedido, p.fecha, p.estado, 
              p.Nombre, p.Telefono, p.Barrio, p.Direccion, p.Ciudad, p.Correo
       FROM pedidos p
       WHERE p.Correo = ?
       ORDER BY p.fecha DESC`,
      [correo]
    );

    for (const pedido of pedidos) {
      const [detalles] = await connection.query(
        `SELECT d.id_detalle, c.equipo, c.talla, d.cantidad, d.precio_unitario
         FROM detalle_pedido d
         JOIN camisetas c ON d.id_camiseta = c.id_camiseta
         WHERE d.id_pedido = ?`,
        [pedido.id_pedido]
      );
      pedido.detalles = detalles;
    }

    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos por correo:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
