module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('flight_schools', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      active_flightschool: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      anac: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      cnpj: { type: Sequelize.STRING, allowNull: false },
      fantasy_name: { type: Sequelize.STRING, allowNull: false },
      company_name: { type: Sequelize.STRING, allowNull: false },
      phone_1: { type: Sequelize.STRING, allowNull: false },
      phone_2: { type: Sequelize.STRING, allowNull: true },
      cellphone_1: { type: Sequelize.STRING, allowNull: true },
      cellphone_2: { type: Sequelize.STRING, allowNull: true },
      emergency_phone: { type: Sequelize.STRING, allowNull: false },
      emergency_contact: { type: Sequelize.STRING, allowNull: false },
      cep: { type: Sequelize.STRING, allowNull: false },
      street_address: { type: Sequelize.STRING, allowNull: false },
      number: { type: Sequelize.STRING, allowNull: false },
      complement: { type: Sequelize.STRING, allowNull: false },
      neighborhood: { type: Sequelize.STRING, allowNull: false },
      locality: { type: Sequelize.STRING, allowNull: false },
      uf: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('flight_schools');
  },
};
