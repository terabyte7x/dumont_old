module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('aircrafts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      active_acft: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
      registration: { type: Sequelize.STRING, allowNull: false },
      manufacturer: { type: Sequelize.STRING },
      year_of_manufacture: { type: Sequelize.DATEONLY },
      model: { type: Sequelize.STRING },
      serial_number: { type: Sequelize.STRING },
      icao_type: { type: Sequelize.STRING },
      type_of_pilot_license: { type: Sequelize.STRING },
      aircraft_class: { type: Sequelize.STRING },
      mtow: { type: Sequelize.FLOAT },
      mlw: { type: Sequelize.FLOAT },
      maximum_of_passengers: { type: Sequelize.INTEGER },
      authorized_flight_type: { type: Sequelize.STRING },
      record_category: { type: Sequelize.STRING },
      operation_status: { type: Sequelize.STRING },
      date_of_acquisition: { type: Sequelize.DATEONLY },
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
    return queryInterface.dropTable('aircrafts');
  },
};
