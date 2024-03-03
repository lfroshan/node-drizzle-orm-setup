import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

import { ENV_CONFIGS } from '../../config/envConfigs';

const pool = new Pool(ENV_CONFIGS.postgresConfig);

export default drizzle(pool);
