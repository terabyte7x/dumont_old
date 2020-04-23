/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import Airport from '../models/Airport';
import User from '../models/User';

class AirportController {
  async store(req, res) {
    try {
      const {
        icao,
        name,
        city,
        state,
        latitute,
        longitude,
        altitude,
      } = await Airport.create(req.body);
      return res.json(`O aeroporto ${icao} foi criado com sucesso`);
    } catch (err) {
      return res.json({
        error: `Houve um erro na criação do aeroporto.`,
      });
    }
  }
}

export default new AirportController();
