import mysql from 'mysql2/promise';
import { env } from '../config/env';

const pool = mysql.createPool({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  port: env.MYSQL_PORT,
  connectionLimit: env.MYSQL_CONNECTION_LIMIT,
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
