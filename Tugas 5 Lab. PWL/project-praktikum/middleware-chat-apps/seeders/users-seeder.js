const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedUserPassword = await bcrypt.hash('password1', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: hashedAdminPassword,
        fullname: 'Admin User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        password: hashedUserPassword,
        fullname: 'User Satu',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
