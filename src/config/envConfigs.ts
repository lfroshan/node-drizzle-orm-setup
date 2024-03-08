require('dotenv').config();

export const ENV_CONFIGS = {
  port: process.env.PORT,
  environment: process.env.ENVIRONMENT,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY as string,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY as string,
  accessTokenKeyExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  refreshTokenKeyExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  customCookieName: process.env.CUSTOM_COOKIE_NAME as string,
  sessionEncryptionKey: process.env.SESSION_ENCRYPTION_KEY as string,
  useRedisCache: JSON.parse(process.env.USE_REDIS_CACHE ?? '') as boolean,
  redisHOST: process.env.REDIS_HOST as string,
  redisPORT: parseInt(process.env.REDIS_PORT ?? '') as number,
  redisPassword: process.env.REDIS_PASSWORD as string,
  redisCacheDuration: parseInt(process.env.REDIS_CACHE_DURATION ?? '') as number,
  testApi: process.env.TEST_API as string,
  paginationDefaultSize: parseInt(process.env.PAGINATION_DEFAULT_SIZE ?? '') as number,
  paginationDefaultPage: parseInt(process.env.PAGINATION_DEFAULT_SIZE ?? '') as number,
  postgresConfig: {
    host: process.env.HOST as string,
    port: parseInt(process.env.DB_PORT ?? '') as number,
    user: process.env.USER as string,
    password: process.env.PASSWORD as string,
    database: process.env.DATABASE as string,
  }
};
