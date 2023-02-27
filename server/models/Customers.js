import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const Cutomers = sequelize.define('customers', {
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    fatherName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    mobileNumber: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
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
  return Cutomers;
};
