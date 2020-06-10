import Sequelize, { Model } from 'sequelize';

class FlightSchedule extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        status: Sequelize.ENUM({
          values: ['Sheduled', 'Confirmed', 'Canceled', 'Changed', 'Delayed'],
        }),
        // This is the types of flight in BRA flight schools
        type_of_flight: Sequelize.ENUM({
          values: [
            'Pré-Solo',
            'Aproximações',
            'Navegação',
            'Navegação Solo',
            'Avaliação',
            'Cheque',
            'Recheque',
            'Geral',
            'Panorâmico',
            'Manutenção',
          ],
        }),
        time: Sequelize.FLOAT,
        reason_of_cancellation: Sequelize.ENUM({
          values: [
            'Meteorology',
            'No-Show',
            'Flight Instructor',
            'Medical Reason',
            'Airport',
            'Air Traffic',
            'Other',
          ],
        }),
      },
      {
        tableName: 'flight_schedules',
        sequelize,
      }
    );
  }

  //--------------------------------------------------------------
  // Método que associa os arquivos de usuário a tabela arquivos
  //--------------------------------------------------------------

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'student_id',
      as: 'student',
    });
    this.belongsTo(models.File, {
      foreignKey: 'aircraft_id',
      as: 'aircrafts',
    });
    this.belongsTo(models.File, {
      foreignKey: 'flight_instructor_id',
      as: 'flight_instructor',
    });
    this.belongsTo(models.File, {
      foreignKey: 'airport_destiny_id',
      as: 'airport_destiny',
    });

    this.belongsTo(models.File, {
      foreignKey: 'airport_alternative_id',
      as: 'airport_alternative',
    });
  }
}

export default FlightSchedule;
