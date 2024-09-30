// import pg from 'pg';
import { Sequelize } from 'sequelize';
import { env } from './env.config.js';

// pg.types.setTypeParser(1114, (stringValue) => {
//   return new Date(stringValue + '+0000');
//   // e.g., UTC offset. Use any offset that you would like.
// });

const dbConfig = { // Database configuration object
  database: env.db.database,
  username: env.db.username,
  password: env.db.password,
  host: env.db.host,
  port: env.db.port,
};

// Initialize Sequelize with the connection parameters
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    dialectOptions: {
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false,
      // },
      // keepAlive: true,
      useUTC: true,
      timezone: 'UTC',
    },
    // pool: {
    //   max: 5,
    //   min: 0,
    //   idle: 10000,
    // },
    // ssl: true,
    logging: false,
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err); // throw error incase something goes wrong while trying to establish a connection to the db.
  });

export { sequelize };
