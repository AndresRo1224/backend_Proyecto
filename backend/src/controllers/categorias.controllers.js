import getConnection from "../db/database.js";

// Obtener todas las camisetas
const getCamisetas = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM camisetas");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener las camisetas:", error);
    res.status(500).send("Error en el servidor");
  }
};

// Insertar una nueva camiseta
const createCamiseta = async (req, res) => {
  const { equipo, temporada, talla, precio, stock, imagen } = req.body;
  if (!equipo || !temporada || !talla || !precio || !stock) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  try {
    const connection = await getConnection();
    await connection.query(
      "INSERT INTO camisetas (equipo, temporada, talla, precio, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)",
      [equipo, temporada, talla, precio, stock, imagen || "0"]
    );
    res.json({ message: "Camiseta agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar camiseta:", error);
    res.status(500).send("Error en el servidor");
  }
};

// Editar una camiseta
const updateCamiseta = async (req, res) => {
  const { id } = req.params;
  const { equipo, temporada, talla, precio, stock, imagen } = req.body;
  try {
    const connection = await getConnection();
    await connection.query(
      "UPDATE camisetas SET equipo=?, temporada=?, talla=?, precio=?, stock=?, imagen=? WHERE id_camiseta=?",
      [equipo, temporada, talla, precio, stock, imagen || "0", id]
    );
    res.json({ message: "Camiseta actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar camiseta:", error);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar una camiseta
const deleteCamiseta = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    await connection.query("DELETE FROM camisetas WHERE id_camiseta=?", [id]);
    res.json({ message: "Camiseta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar camiseta:", error);
    res.status(500).send("Error en el servidor");
  }
};

export const methodHTTP = {
  getCamisetas,
  createCamiseta,
  updateCamiseta,
  deleteCamiseta,
};