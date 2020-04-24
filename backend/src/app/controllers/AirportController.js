/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 *
 * Aeroportos
 * @description  Controller de Aeroportos.
 * @author Felipe Duque <felipe@duque.dev>
 * @version 1.0.0
 *
 */
import Airport from '../models/Airport';

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

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const airports = await Airport.findAll({
        attributes: [
          'id',
          'icao',
          'name',
          'city',
          'state',
          'latitute',
          'longitude',
          'altitude',
        ],
        limit: 20,
        offset: (page - 1) * 20,
      });
      return res.json(airports);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      // const { id } = await User.findByPk(req.userId);
      const showAirport = await Airport.findOne({
        attributes: [
          'id',
          'icao',
          'name',
          'city',
          'state',
          'latitute',
          'longitude',
          'altitude',
        ],
        where: { id },
      });
      if (showAirport === null) {
        return res.status(404).json({ error: 'Aeroporto não encontrado!' });
      }
      return res.json(showAirport);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const airport = await Airport.findOne({ where: { id } });

      if (!airport) {
        return res
          .status(404)
          .json({ error: 'Este aeroporto não existe no sistema' });
      }

      const { name } = await airport.update(req.body);

      return res.json(`${name} alterado com sucesso!`);
    } catch (err) {
      // 'Houve um erro. Por favor, tente novamente.'
      return res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const airportExists = await Airport.findByPk(id);

      if (!airportExists) {
        return res
          .status(404)
          .json({ error: 'Este aeroporto não existe no sistema' });
      }

      await Airport.destroy({ where: { id } });

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }
}

export default new AirportController();
