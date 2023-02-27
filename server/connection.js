import { Sequelize } from 'sequelize';

import config from '../config';

import Users from './models/Users';
import MasterInterestRates from './models/MasterInterestRates';
import MasterPenalties from './models/MasterPenalties';
import MasterLoanCharges from './models/MasterLoanCharges';
import Customers from './models/Customers';

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
      db.MasterInterestRate = MasterInterestRates(sequelize);
      db.MasterPenalty = MasterPenalties(sequelize);
      db.MasterLoanCharge = MasterLoanCharges(sequelize);
      db.Customer = Customers(sequelize);
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
