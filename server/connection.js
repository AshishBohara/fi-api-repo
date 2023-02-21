import { Sequelize } from 'sequelize';

import config from '../config';

import Users from './models/Users';

const db = {};

const { dbHost, dbDatabaseName, dbAdmin, dbPassword } = config;

export default async () => {
  // Establish DB Connection

  return new Promise((resolve, reject) => {
    const sequelize = new Sequelize(dbDatabaseName, dbAdmin, dbPassword, {
      dialect: 'mysql',
      host: dbHost,
      port: 3306,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    try {
      sequelize.authenticate();
      // Bootstrap Models
      db.User = Users(sequelize);

      // Define relationship among diffrent tables

      sequelize.sync({ force: false });
      console.log('Database -> Connected');
      db.sequelize = sequelize;
      resolve(db);
    } catch (err) {
      console.error('Database ->', err.message);
      reject(err);
    }
  });
};
