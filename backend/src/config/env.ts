import { config } from 'dotenv';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const result = config({ path: `.env.${NODE_ENV}` });

if (result.error) {
  throw new Error(
    `[env] .env.${NODE_ENV} の読み込みに失敗しました: ${result.error.message}`,
  );
}

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[env] 環境変数 "${key}" が設定されていません (.env.${NODE_ENV})`,
    );
  }
  return value;
};

export const env = {
  // Env
  NODE_ENV,

  // MySQL
  MYSQL_HOST: getEnv('MYSQL_HOST'),
  MYSQL_USER: getEnv('MYSQL_USER'),
  MYSQL_PASSWORD: getEnv('MYSQL_PASSWORD'),
  MYSQL_DATABASE: getEnv('MYSQL_DATABASE'),
  MYSQL_PORT: Number(getEnv('MYSQL_PORT')),
  MYSQL_CONNECTION_LIMIT: Number(getEnv('MYSQL_CONNECTION_LIMIT')),

  // Server
  FRONTEND_URL: getEnv('FRONTEND_URL'),
  PORT: Number(getEnv('PORT')),
} as const;
