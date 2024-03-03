require('dotenv').config();

export const ENV_CONFIGS = {
  port: process.env.PORT,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY as string,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY as string,
  accessTokenKeyExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  refreshTokenKeyExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  customCookieName: process.env.CUSTOM_COOKIE_NAME as string,
  sessionEncryptionKey: process.env.SESSION_ENCRYPTION_KEY as string,
  postgresConfig: {
    host: process.env.HOST as string,
    port: parseInt(process.env.DB_PORT ?? '') as number,
    user: process.env.USER as string,
    password: process.env.PASSWORD as string,
    database: process.env.DATABASE as string,
  }
};
