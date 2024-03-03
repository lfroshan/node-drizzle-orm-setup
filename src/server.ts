import app from "./app";
import { ENV_CONFIGS } from "./config/envConfigs";

app.listen(ENV_CONFIGS.port, () => {
  console.info(`Server Started, Listening on PORT: ${ENV_CONFIGS.port}`);
});
