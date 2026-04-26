const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST;

if (!NEXT_PUBLIC_API_HOST) {
  throw new Error('[env] 環境変数 "NEXT_PUBLIC_API_HOST" が設定されていません');
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  NEXT_PUBLIC_API_HOST,
} as const;
