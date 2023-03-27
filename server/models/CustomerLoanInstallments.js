import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const CustomerLoanInstallments = sequelize.define('customer_loan_installments', {
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    customerLoanId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    installmentAmount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    installmentDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    penaltyAmount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    totalAmount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    dueAmount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    installmentCompleted: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
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
  return CustomerLoanInstallments;
};
