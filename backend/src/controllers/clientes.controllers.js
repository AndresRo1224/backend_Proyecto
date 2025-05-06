import getConnection from "../db/database.js";

const getClientes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM clientes");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).send("Error en el servidor");
  }
};

export const methodHTTP = {
  getClientes,
};