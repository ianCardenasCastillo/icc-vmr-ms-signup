export type Environment = {
  NODE_ENV: string;
  PORT: number;
  ENABLE_SWAGGER: boolean;
  MONGODB_URL: string;
  MONGODB_DATABASE: string;
  JWT_SECRET: string;
  JWT_PUBLIC: string;
  JWT_EXPIRE_TIME: string;
};
