import mysql from "mysql2/promise";

import config from "../config.js";

const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

const getConnection = () => {
  return connection;
};

export default getConnection;