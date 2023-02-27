import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const CustomerLoans = sequelize.define('customer_loans', {
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    loanAmount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    interestRate: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
    },
    noOfInstallment: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    penaltyAmount: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    totalLoanCharges: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    loanCompleted: {
      type: Sequelize.BOOLEAN,
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
  return CustomerLoans;
};
