import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const CustomerLoanCharges = sequelize.define('customer_loan_charges', {
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    customerLoanId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    chargesName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    amount: {
      type: Sequelize.INTEGER(30),
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return CustomerLoanCharges;
};
