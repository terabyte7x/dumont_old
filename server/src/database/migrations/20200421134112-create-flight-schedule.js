module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('flight_schedules', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      aircraft_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'aircrafts' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      flight_instructor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'flight_instructors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type_of_flight: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      airport_destiny_id: {
        type: Sequelize.INTEGER,
        references: { model: 'airports', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      airport_alternative_id: {
        type: Sequelize.INTEGER,
        references: { model: 'airports', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      time: { type: Sequelize.FLOAT, allowNull: false },
      reason_of_cancellation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceled_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('flight_schedules');
  },
};
