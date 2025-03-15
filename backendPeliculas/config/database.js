import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0,
});

export default pool;
