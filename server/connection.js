import { Sequelize } from 'sequelize';

import config from '../config';

import Users from './models/Users';
import MasterInterestRates from './models/MasterInterestRates';
import MasterPenalties from './models/MasterPenalties';
import MasterLoanCharges from './models/MasterLoanCharges';
import Customers from './models/Customers';
import CustomerLoans from './models/CustomerLoans';
import CustomerLoanCharges from './models/CustomerLoanCharges';
import CustomerLoanInstallments from './models/CustomerLoanInstallments';
import CustomerLoanInstallmentPayments from './models/CustomerLoanInstallmentPayments';

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
      db.CustomerLoan = CustomerLoans(sequelize);
      db.CustomerLoanCharge = CustomerLoanCharges(sequelize);
      db.CustomerLoanInstallment = CustomerLoanInstallments(sequelize);
      db.CustomerLoanInstallmentPayment = CustomerLoanInstallmentPayments(sequelize);
      // Define relationship among diffrent tables
      db.Customer.hasMany(db.CustomerLoan);

      db.CustomerLoanCharge.belongsTo(db.Customer);
      db.CustomerLoanCharge.belongsTo(db.CustomerLoan);

      db.CustomerLoanInstallment.belongsTo(db.Customer);
      db.CustomerLoanInstallment.belongsTo(db.CustomerLoan);

      db.CustomerLoanInstallmentPayment.belongsTo(db.Customer);
      db.CustomerLoanInstallmentPayment.belongsTo(db.CustomerLoan);
      db.CustomerLoanInstallmentPayment.belongsTo(db.CustomerLoanInstallment);

      db.Customer.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.Customer.belongsTo(db.User, { foreignKey: 'updatedBy' });
      db.CustomerLoan.belongsTo(db.Customer);
      db.CustomerLoan.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.CustomerLoan.belongsTo(db.User, { foreignKey: 'updatedBy' });
      db.CustomerLoanCharge.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.CustomerLoanCharge.belongsTo(db.User, { foreignKey: 'updatedBy' });
      db.CustomerLoanInstallment.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.CustomerLoanInstallment.belongsTo(db.User, { foreignKey: 'updatedBy' });
      db.MasterInterestRate.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.MasterInterestRate.belongsTo(db.User, { foreignKey: 'updatedBy' });
      db.MasterPenalty.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.MasterPenalty.belongsTo(db.User, { foreignKey: 'updatedBy' });
      db.MasterLoanCharge.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.MasterLoanCharge.belongsTo(db.User, { foreignKey: 'updatedBy' });
      db.User.belongsTo(db.User, { foreignKey: 'createdBy' });
      db.User.belongsTo(db.User, { foreignKey: 'updatedBy' });
      //
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
