export interface ProcessDotEnv {
  BASE_URL: string;
  PORT: number;
  URL_PREFIX: string;

  CORS_ORIGIN: string;

  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;

  TOKEN_KEY: string;
  TOKEN_EXPIRY: string;

  AWS_S3_BUCKET_NAME: string;
  AWS_REGION: string;
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;

  SENTRY_DNS: string;

  CLIENT_ID: string;
  CLIENT_SECRET: string;
}
