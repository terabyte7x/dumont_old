/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 *
 * Alunos
 * @description  Controller de Alunos.
 * @author Felipe Duque <felipe@duque.dev>
 * @version 1.0.0
 *
 */
import Student from '../models/Student';
import User from '../models/User';

class StudentController {
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
      } = await Student.create(req.body);
      return res.json(`O aluno foi cadastrado com sucesso`);
    } catch (err) {
      return res.json({
        error: `Houve um erro na criação do aluno.`,
      });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const student = await Student.findAll({
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
      return res.json(student);
    } catch (err) {
      // 'Houve um erro. Por favor, tente novamente.'
      return res.status(500).json(err);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      // const { id } = await User.findByPk(req.userId);
      const student = await Student.findOne({
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
      if (student === null) {
        return res.status(404).json({ error: 'Aluno não encontrado!' });
      }
      return res.json(student);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const student = await Student.findOne({
        where: { id },
      });

      if (!student) {
        return res
          .status(404)
          .json({ error: 'Este aluno não existe no sistema' });
      }

      await student.update(req.body);

      return res.status(201).json(`Aluno alterado com sucesso!`);
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
      const student = await Student.findByPk(id);

      if (!student) {
        return res
          .status(404)
          .json({ error: 'Este aluno não existe no sistema' });
      }

      await Student.destroy({ where: { id } });

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }
}

export default new StudentController();
