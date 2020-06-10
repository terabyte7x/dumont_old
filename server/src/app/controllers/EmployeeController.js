/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 *
 * Funcionários
 * @description  Controller de Funcionários.
 * @author Felipe Duque <felipe@duque.dev>
 * @version 1.0.0
 *
 */
import Employee from '../models/Employee';
import User from '../models/User';

class EmployeeController {
  async store(req, res) {
    try {
      const {
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
      } = await Employee.create(req.body);
      return res.json(`O funcionário foi criado com sucesso`);
    } catch (err) {
      return res.json({
        error: `Houve um erro na criação do funcionário.`,
      });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const employees = await Employee.findAll({
        attributes: [
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
      return res.json(employees);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      // const { id } = await User.findByPk(req.userId);
      const showEmployee = await Employee.findOne({
        attributes: [
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
      if (showEmployee === null) {
        return res.status(404).json({ error: 'Funcionário não encontrado!' });
      }
      return res.json(showEmployee);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const employee = await Employee.findOne({ where: { id } });

      if (!employee) {
        return res
          .status(404)
          .json({ error: 'Este funcionário não existe no sistema' });
      }

      await employee.update(req.body);

      return res.status(201).json(`Funcionário alterado com sucesso!`);
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
      const employeeExists = await Employee.findByPk(id);

      if (!employeeExists) {
        return res
          .status(404)
          .json({ error: 'Este funcionário não existe no sistema' });
      }

      await Employee.destroy({ where: { id } });

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }
}

export default new EmployeeController();
