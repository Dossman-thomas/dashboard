import dotenv from 'dotenv';
dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `.env.${nodeEnv}` });

export const env = {
  nodeEnv: nodeEnv,
  db: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  server: {
    port: process.env.SERVER_PORT,
  },
};
