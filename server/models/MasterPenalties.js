import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const MasterPenalties = sequelize.define('master_penalties', {
    amount: {
      type: Sequelize.NUMBER,
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
  return MasterPenalties;
};
