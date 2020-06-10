/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 *
 * Instrutores de voo
 * @description  Controller de Instrutores de Voo.
 * @author Felipe Duque <felipe@duque.dev>
 * @version 1.0.0
 *
 */
import FlightInstructor from '../models/FlightInstructor';
import User from '../models/User';

class FlightInstructorController {
  async store(req, res) {
    try {
      const {
        anac,
        user_id,
        birthday,
        nationality,
        sex,
        passport,
        rg,
        rg_emitter,
        uf_rg_emitter,
        cpf,
        voter_ident,
        uf_voter_ident,
        military_certificate,
        military_certificate_emitter,
        number_cpts,
        serial_cpts,
        admission_date,
        resignation_date,
        schooling,
        phone_1,
        phone_2,
        cellphone_1,
        cellphone_2,
        emergency_phone,
        emergency_contact,
        cep,
        street_address,
        number,
        complement,
        neighborhood,
        locality,
        uf,
      } = await FlightInstructor.create(req.body);
      return res.json(`O instrutor de voo foi criado com sucesso`);
    } catch (err) {
      return res.json({
        error: `Houve um erro na criação do instrutor de voo.`,
      });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const flightInstructor = await FlightInstructor.findAll({
        attributes: [
          'anac',
          'birthday',
          'nationality',
          'sex',
          'passport',
          'rg',
          'rg_emitter',
          'uf_rg_emitter',
          'cpf',
          'voter_ident',
          'uf_voter_ident',
          'military_certificate',
          'military_certificate_emitter',
          'number_cpts',
          'serial_cpts',
          'admission_date',
          'resignation_date',
          'schooling',
          'phone_1',
          'phone_2',
          'cellphone_1',
          'cellphone_2',
          'emergency_phone',
          'emergency_contact',
          'cep',
          'street_address',
          'number',
          'complement',
          'neighborhood',
          'locality',
          'uf',
        ],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
        limit: 20,
        offset: (page - 1) * 20,
      });
      return res.json(flightInstructor);
    } catch (err) {
      // 'Houve um erro. Por favor, tente novamente.'
      return res.status(500).json(err);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      // const { id } = await User.findByPk(req.userId);
      const showFlightInstructor = await FlightInstructor.findOne({
        attributes: [
          'anac',
          'birthday',
          'nationality',
          'sex',
          'passport',
          'rg',
          'rg_emitter',
          'uf_rg_emitter',
          'cpf',
          'voter_ident',
          'uf_voter_ident',
          'military_certificate',
          'military_certificate_emitter',
          'number_cpts',
          'serial_cpts',
          'admission_date',
          'resignation_date',
          'schooling',
          'phone_1',
          'phone_2',
          'cellphone_1',
          'cellphone_2',
          'emergency_phone',
          'emergency_contact',
          'cep',
          'street_address',
          'number',
          'complement',
          'neighborhood',
          'locality',
          'uf',
        ],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
        where: { id },
      });
      if (showFlightInstructor === null) {
        return res
          .status(404)
          .json({ error: 'Instrutor de voo não encontrado!' });
      }
      return res.json(showFlightInstructor);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const flightInstructor = await FlightInstructor.findOne({
        where: { id },
      });

      if (!flightInstructor) {
        return res
          .status(404)
          .json({ error: 'Este instrutor de voo não existe no sistema' });
      }

      await flightInstructor.update(req.body);

      return res.status(201).json(`Instrutor de voo alterado com sucesso!`);
    } catch (err) {
      return res
        .status(500)
        .json(
          `Houve um erro na atualização do funcionário. Se o erro persistir, contete o administrador do sistema. Obrigado!`
        );
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const flightInstructorExists = await FlightInstructor.findByPk(id);

      if (!flightInstructorExists) {
        return res
          .status(404)
          .json({ error: 'Este instrutor de voo não existe no sistema' });
      }

      await FlightInstructor.destroy({ where: { id } });

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }
}

export default new FlightInstructorController();
