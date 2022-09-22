'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('stories', 'spaceId', {
      type: Sequelize.INTEGER,
      references: {
        model: "spaces",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('stories', 'spaceId')
  }
};
