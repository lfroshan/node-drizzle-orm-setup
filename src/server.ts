import app from "./app";
import redisInstance from "./redis";
import { ENV_CONFIGS } from "./config/envConfigs";
import SwaggerDocs from "./utils/doc/swagger.api";


SwaggerDocs(app, ENV_CONFIGS.port);

if (ENV_CONFIGS.useRedisCache) {
  (async () => redisInstance.initializeRedis())();
}

app.listen(ENV_CONFIGS.port, () => {
  console.info(`Server Started, Listening on PORT: ${ENV_CONFIGS.port}`);
});

