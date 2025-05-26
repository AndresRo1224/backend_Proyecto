import getConnection from "../db/database.js";
import bcrypt from "bcryptjs";

// Registro de usuario
export const register = async (req, res) => {
  const { name, email, password, adminKey } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Faltan datos" });
  }
  try {
    const connection = await getConnection();
    // Verifica si el usuario ya existe
    const [users] = await connection.query("SELECT * FROM usuarios WHERE usuario = ?", [email]);
    if (users.length > 0) {
      return res.status(400).json({ success: false, message: "El correo ya está registrado" });
    }
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Determina el rol
    let rol = "vendedor";
    if (adminKey && adminKey === "RangelyBryan2025") {
      rol = "admin";
    }
    await connection.query(
      "INSERT INTO usuarios (nombre, usuario, contrasena, rol) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, rol]
    );
    res.json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Faltan datos" });
  }
  try {
    const connection = await getConnection();
    const [users] = await connection.query("SELECT * FROM usuarios WHERE usuario = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.contrasena);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }
    res.json({
      success: true,
      user: {
        id: user.id_usuario,
        name: user.nombre,
        email: user.usuario,
        role: user.rol
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};