import mysql from "mysql2/promise";
import config from "../config.js";

// Crear la conexión a la base de datos
const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Función para obtener la conexión
const getConnection = () => {
  return connection;
};

export default getConnection;