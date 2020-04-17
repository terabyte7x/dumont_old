module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'own_photo_id', {
      type: Sequelize.INTEGER,
      references: {
        model: { tableName: 'files' },
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'own_photo_id');
  },
};
