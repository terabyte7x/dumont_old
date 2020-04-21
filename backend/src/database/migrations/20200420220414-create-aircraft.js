module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('aircraft', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      active_acft: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      flight_school_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'flight_schools' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      manufacturer: { type: Sequelize.STRING, allowNull: false },
      year_of_manufacture: { type: Sequelize.STRING, allowNull: false },
      model: { type: Sequelize.STRING, allowNull: false },
      serial_number: { type: Sequelize.STRING, allowNull: false },
      icao_type: { type: Sequelize.STRING, allowNull: false },
      type_of_pilot_license: { type: Sequelize.STRING, allowNull: false },
      aircraft_class: { type: Sequelize.STRING, allowNull: false },
      mtow: { type: Sequelize.FLOAT, allowNull: false },
      mlw: { type: Sequelize.FLOAT, allowNull: false },
      maximum_of_passengers: { type: Sequelize.STRING, allowNull: false },
      authorized_flight_type: { type: Sequelize.STRING, allowNull: false },
      record_category: { type: Sequelize.STRING, allowNull: false },
      operation_status: { type: Sequelize.STRING, allowNull: false },
      date_of_acquisition: { type: Sequelize.DATE, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      acft_photo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('aircraft');
  },
};
