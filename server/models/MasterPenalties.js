import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const MasterPenalties = sequelize.define('master_penalties', {
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
  return MasterPenalties;
};
