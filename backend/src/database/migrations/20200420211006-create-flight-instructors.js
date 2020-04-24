module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('flight_instructors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      flightschool_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'flight_schools' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      anac: { type: Sequelize.STRING, allowNull: false },
      birthday: { type: Sequelize.DATEONLY, allowNull: false },
      nationality: { type: Sequelize.STRING, allowNull: true },
      sex: { type: Sequelize.STRING, allowNull: true },
      passport: { type: Sequelize.STRING, allowNull: true },
      rg: { type: Sequelize.STRING, allowNull: true },
      rg_emitter: { type: Sequelize.STRING, allowNull: true },
      uf_rg_emitter: { type: Sequelize.STRING, allowNull: true },
      cpf: { type: Sequelize.STRING, allowNull: true },
      voter_ident: { type: Sequelize.STRING, allowNull: true },
      uf_voter_ident: { type: Sequelize.STRING, allowNull: true },
      military_certificate: { type: Sequelize.STRING, allowNull: true },
      military_certificate_emitter: { type: Sequelize.STRING, allowNull: true },
      military_certificate_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number_cpts: { type: Sequelize.STRING, allowNull: true },
      serial_cpts: { type: Sequelize.STRING, allowNull: true },
      admission_date: { type: Sequelize.DATEONLY, allowNull: true },
      resignation_date: { type: Sequelize.DATEONLY, allowNull: true },
      schooling: { type: Sequelize.STRING, allowNull: true },
      phone_1: { type: Sequelize.STRING, allowNull: true },
      phone_2: { type: Sequelize.STRING, allowNull: true },
      cellphone_1: { type: Sequelize.STRING, allowNull: true },
      cellphone_2: { type: Sequelize.STRING, allowNull: true },
      emergency_phone: { type: Sequelize.STRING, allowNull: true },
      emergency_contact: { type: Sequelize.STRING, allowNull: true },
      cep: { type: Sequelize.STRING, allowNull: true },
      street_address: { type: Sequelize.STRING, allowNull: true },
      number: { type: Sequelize.STRING, allowNull: true },
      complement: { type: Sequelize.STRING, allowNull: true },
      neighborhood: { type: Sequelize.STRING, allowNull: true },
      locality: { type: Sequelize.STRING, allowNull: true },
      uf: { type: Sequelize.STRING, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      pdf_rg_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      pdf_cpf_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      pdf_military_certificate_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      pdf_voter_ident_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      pdf_cpts_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      birth_certificate_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      proof_of_schooling_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      proof_of_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'files' },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      wedding_certificate_id: {
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
    return queryInterface.dropTable('flight_instructors');
  },
};
