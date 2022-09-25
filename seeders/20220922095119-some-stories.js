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
     },
     {
      name: "baby goat",
      content: "Look at this cute lil guy",
      imageUrl: "https://a-z-animals.com/media/2021/12/funny-goat-puts-out-its-tongue-picture-id177369626.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      spaceId: 1
     },
     {
      name: "Here's another one",
      content: "Look at em!",
      imageUrl: "https://a-z-animals.com/media/2021/12/baby-goats-playing-together-in-hay-picture-id146731223.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      spaceId: 2
     },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stories', null, {});
  }
};
