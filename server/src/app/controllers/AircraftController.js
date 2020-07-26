/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 *
 * Aeronaves
 * @description  Controller de Aeronaves.
 * @author Felipe Duque <felipe@duque.dev>
 * @version 1.0.0
 *
 */
import Aircraft from '../models/Aircraft';
import File from '../models/File';
import Queue from '../lib/Queue';

class AircraftController {
  async store(req, res) {
    const {
      registration,
      manufacturer,
      year_of_manufacture,
      model,
      serial_number,
      icao_type,
      type_of_pilot_license,
      mtow,
      mlw,
      maximum_of_passengers,
      record_category,
      operation_status,
      date_of_acquisition,
    } = await Aircraft.create(req.body);

    const aeroInfo = {
      registration,
      manufacturer,
      model,
      serial_number,
      icao_type,
    };

    await Queue.add('Aerochain', { aeroInfo }); // Abstratir

    return res.status(200).json(aeroInfo);
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const airports = await Aircraft.findAll({
        attributes: [
          'id',
          'registration',
          'manufacturer',
          'year_of_manufacture',
          'model',
          'serial_number',
          'icao_type',
          'type_of_pilot_license',
          'mtow',
          'mlw',
          'maximum_of_passengers',
          'record_category',
          'operation_status',
          'date_of_acquisition',
        ],
        include: [
          {
            model: File,
            as: 'acft_photo',
            attributes: ['name', 'path', 'url'],
          },
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
      const showAircraft = await Aircraft.findOne({
        attributes: [
          'id',
          'registration',
          'manufacturer',
          'year_of_manufacture',
          'model',
          'serial_number',
          'icao_type',
          'type_of_pilot_license',
          'mtow',
          'mlw',
          'maximum_of_passengers',
          'record_category',
          'operation_status',
          'date_of_acquisition',
        ],
        include: [
          {
            model: File,
            as: 'acft_photo',
            attributes: ['name', 'path', 'url'],
          },
        ],
        where: { id },
      });
      if (showAircraft === null) {
        return res.status(404).json({ error: 'Aeronave não encontrada!' });
      }
      return res.json(showAircraft);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const airport = await Aircraft.findOne({ where: { id } });

      if (!airport) {
        return res
          .status(404)
          .json({ error: 'Esta aeronave não existe no sistema' });
      }

      const { registration } = await airport.update(req.body);

      return res.json(`Aeronave ${registration} alterada com sucesso!`);
    } catch (err) {
      // 'Houve um erro. Por favor, tente novamente.'
      return res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const aircraftExists = await Aircraft.findByPk(id);

      if (!aircraftExists) {
        return res
          .status(404)
          .json({ error: 'Esta aeronave não existe no sistema' });
      }

      await Aircraft.destroy({ where: { id } });

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }
}

export default new AircraftController();
