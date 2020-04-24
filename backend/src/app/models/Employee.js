import Sequelize, { Model } from 'sequelize';

class Employee extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        birthday: Sequelize.DATEONLY,
        nationality: Sequelize.STRING,
        sex: Sequelize.STRING,
        passport: Sequelize.STRING,
        rg: Sequelize.STRING,
        rg_emitter: Sequelize.STRING,
        uf_rg_emitter: Sequelize.STRING,
        cpf: Sequelize.STRING,
        voter_ident: Sequelize.STRING,
        uf_voter_ident: Sequelize.STRING,
        military_certificate: Sequelize.STRING,
        military_certificate_emitter: Sequelize.STRING,
        number_cpts: Sequelize.STRING,
        serial_cpts: Sequelize.STRING,
        admission_date: Sequelize.DATE,
        resignation_date: Sequelize.DATE,
        schooling: Sequelize.STRING,
        phone_1: Sequelize.STRING,
        phone_2: Sequelize.STRING,
        cellphone_1: Sequelize.STRING,
        cellphone_2: Sequelize.STRING,
        emergency_phone: Sequelize.STRING,
        emergency_contact: Sequelize.STRING,
        cep: Sequelize.STRING,
        street_address: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        locality: Sequelize.STRING,
        uf: Sequelize.STRING,
      },
      {
        tableName: 'employees',
        sequelize,
      }
    );
  }
  //--------------------------------------------------------------
  // Método que associa através de map no index.js
  //--------------------------------------------------------------

  static associate(models) {
    this.hasOne(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
    this.hasOne(models.Flightschool, {
      foreignKey: 'id',
      as: 'flightschool',
    });
    this.belongsTo(models.File, {
      foreignKey: 'pdf_rg_id',
      as: 'pdf_rg',
    });
    this.belongsTo(models.File, {
      foreignKey: 'pdf_cpf_id',
      as: 'pdf_cpf',
    });
    this.belongsTo(models.File, {
      foreignKey: 'pdf_military_certificate_id',
      as: 'pdf_military_certificate',
    });
    this.belongsTo(models.File, {
      foreignKey: 'pdf_voter_ident_id',
      as: 'pdf_voter_ident',
    });
    this.belongsTo(models.File, {
      foreignKey: 'pdf_cpts_id',
      as: 'pdf_cpts',
    });
    this.belongsTo(models.File, {
      foreignKey: 'birth_certificate_id',
      as: 'birth_certificate',
    });
    this.belongsTo(models.File, {
      foreignKey: 'proof_of_schooling_id',
      as: 'proof_of_schooling',
    });
    this.belongsTo(models.File, {
      foreignKey: 'proof_of_address_id',
      as: 'proof_of_address',
    });
    this.belongsTo(models.File, {
      foreignKey: 'wedding_certificate_id',
      as: 'wedding_certificate',
    });
  }
}

export default Employee;
