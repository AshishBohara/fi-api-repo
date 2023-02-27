import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const MasterLoanCharges = sequelize.define('master_loan_charges', {
    chargesName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    amount: {
      type: Sequelize.INTEGER(30),
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
  return MasterLoanCharges;
};
