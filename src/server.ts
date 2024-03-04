import app from "./app";
import { ENV_CONFIGS } from "./config/envConfigs";
import SwaggerDocs from "./utils/doc/swagger.api";


SwaggerDocs(app, ENV_CONFIGS.port);

app.listen(ENV_CONFIGS.port, () => {
  console.info(`Server Started, Listening on PORT: ${ENV_CONFIGS.port}`);
});
