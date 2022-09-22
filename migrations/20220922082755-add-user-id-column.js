'use strict';

// creating a new column called userId to set up the relationship between users and spaces

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('spaces', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('spaces', 'userId')
  }
};
