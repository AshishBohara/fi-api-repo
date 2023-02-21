import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const Users = sequelize.define('users', {
    email: {
      type: Sequelize.STRING(30),
      allowNull: true,
    },
    mobileNumber: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(30),
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
  return Users;
};
