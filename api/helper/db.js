
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

export const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "assignment",
  charset: "utf8mb4_unicode_ci",
});
