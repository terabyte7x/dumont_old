import Sequelize, { Model } from 'sequelize';

class Flightschool extends Model {
  static init(sequelize) {
    super.init(
      {
        active_flightschool: Sequelize.BOOLEAN,
        anac: Sequelize.STRING,
        email: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        fantasy_name: Sequelize.STRING,
        company_name: Sequelize.STRING,
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
        sequelize,
      }
    );
    return this;
  }
}

export default Flightschool;
