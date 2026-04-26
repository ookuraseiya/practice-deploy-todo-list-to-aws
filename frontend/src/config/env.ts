const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const ERRORS = {
  MISSING_API_HOST: `[env] Environment variable "NEXT_PUBLIC_API_HOST" is not set`,
} as const;

if (!NEXT_PUBLIC_API_HOST) {
  throw new Error(ERRORS.MISSING_API_HOST);
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  NEXT_PUBLIC_API_HOST,
} as const;
