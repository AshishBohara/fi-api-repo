import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const CustomerLoanInstallmentPayments = sequelize.define('customer_loan_installment_payments', {
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    customerLoanId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    customerLoanInstallmentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    receivedAmount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isDeleted: {
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
  return CustomerLoanInstallmentPayments;
};
