import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const MasterInterestRates = sequelize.define('master_interest_rates', {
    interestRate: {
      type: Sequelize.FLOAT,
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
  return MasterInterestRates;
};
