import { config } from 'dotenv';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const ENV_ERROR_PREFIX = '[env]' as const;

const ERRORS = {
  MISSING_ENV: (key: string, env: string) =>
    `${ENV_ERROR_PREFIX} Environment variable "${key}" is not set (.env.${env})`,

  LOAD_FAILED: (env: string, message: string) =>
    `${ENV_ERROR_PREFIX} Failed to load .env.${env}: ${message}`,
} as const;

const result = config({ path: `.env.${NODE_ENV}` });

if (result.error) {
  throw new Error(ERRORS.LOAD_FAILED(NODE_ENV, String(result.error)));
}

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(ERRORS.MISSING_ENV(key, NODE_ENV));
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
