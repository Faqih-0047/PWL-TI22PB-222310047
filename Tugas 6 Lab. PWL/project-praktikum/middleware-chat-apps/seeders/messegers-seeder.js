'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messegers', [
      {
        from_id: 1,
        to_user_id: 2,
        messeges: 'Halo, apa kabar?',
        submited_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        from_id: 2,
        to_user_id: 1,
        messeges: 'Baik, terima kasih!',
        submited_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messegers', null, {});
  }
};
