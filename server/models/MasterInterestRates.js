import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const MasterInterestRates = sequelize.define('master_interest_rates', {
    interestRate: {
      type: Sequelize.FLOAT,
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
  return MasterInterestRates;
};
