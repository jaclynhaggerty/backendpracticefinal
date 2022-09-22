'use strict';


// creating data for stories in the db

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stories', [{
      name: 'story1',
      content: "this is some content",
      imageUrl: "https://localhost:4000",
      createdAt: new Date(),
      updatedAt: new Date(),
      spaceId: 1,
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stories', null, {});
  }
};
