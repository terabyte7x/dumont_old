import Sequelize, { Model } from 'sequelize';

class Airport extends Model {
  static init(sequelize) {
    super.init(
      {
        icao: Sequelize.STRING,
        name: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        latitute: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
        altitude: Sequelize.INTEGER,
      },
      {
        tableName: 'airports',
        sequelize,
      }
    );
  }
}
export default Airport;
