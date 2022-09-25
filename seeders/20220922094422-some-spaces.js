'use strict';

// creating data for spaces in the db. 

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('spaces', [{
      title: 'space1',
      description: "this is a description",
      backgroundColor: "#ffffff",
      color: "#000000",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1,
     },
     {
      title: 'space2',
      description: "this is a another description",
      backgroundColor: "#cccccc",
      color: "#c97d60",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3,
     }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('spaces', null, {});
  }
};
