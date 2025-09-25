import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

export default pool;

// Quick connection test
pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL!");
    client.release();
  })
  .catch((err) => console.error(" Connection error:", err.message));
