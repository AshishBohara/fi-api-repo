import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const MasterLoanCharges = sequelize.define('master_loan_charges', {
    chargesName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    amount: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return MasterLoanCharges;
};
