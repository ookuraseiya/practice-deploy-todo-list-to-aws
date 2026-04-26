import dotenvFlow from 'dotenv-flow';
import mysql from 'mysql2/promise';

dotenvFlow.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? 'localhost',
  user: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? '',
  database: process.env.MYSQL_DATABASE ?? 'test',
  connectionLimit: 10,
});

type QueryValue = string | number;

export const runQuery = async (query: string, values: QueryValue[] = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(query, values);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
