import Sequelize, { Model } from 'sequelize';

class Aircraft extends Model {
  static init(sequelize) {
    super.init(
      {
        active_acft: Sequelize.BOOLEAN,
        registration: Sequelize.STRING,
        manufacturer: Sequelize.STRING,
        year_of_manufacture: Sequelize.DATEONLY,
        model: Sequelize.STRING,
        serial_number: Sequelize.STRING,
        icao_type: Sequelize.STRING,
        type_of_pilot_license: Sequelize.STRING,
        mtow: Sequelize.FLOAT,
        mlw: Sequelize.FLOAT,
        maximum_of_passengers: Sequelize.INTEGER,
        record_category: Sequelize.STRING,
        operation_status: Sequelize.STRING,
        date_of_acquisition: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  //--------------------------------------------------------------
  // Método que associa os arquivos de usuário a tabela arquivos
  //--------------------------------------------------------------

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'acft_photo_id',
      as: 'acft_photo',
    });
  }
}

export default Aircraft;
