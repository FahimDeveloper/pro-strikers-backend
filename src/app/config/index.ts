import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_local_url: process.env.DATABASE_LOCAL_URL,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
};
