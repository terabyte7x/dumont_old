/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 *
 * Usuário
 * @description  Controller de Usuários.
 * @author Felipe Duque <felipe@duque.dev>
 * @version 1.0.0
 *
 */

import User from '../models/User';
import File from '../models/File';
import Queue from '../lib/Queue';

class UserController {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
        limit: 20,
        offset: (page - 1) * 20,
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });

      return res.json(users);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      // const { id } = await User.findByPk(req.userId);
      const showUser = await User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'avatar_id'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });
      if (showUser === null) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }
      return res.json(showUser);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async store(req, res) {
    try {
      const emailExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (emailExists) {
        return res
          .status(400)
          .json({ error: 'Este tripulante já está cadastrado no sistema' });
      }
      // const { id, name, email, role } = await User.create(req.body);
      const { name, email, password, role } = req.body;

      const user = { name, email, password, role };

      await User.create(user);

      await Queue.add('RegistrationMail', { user });

      return res.json({ name, email, role });
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, oldPassword } = req.body;
      const infouser = await User.findOne({ where: { id } });
      const user = await User.findByPk(id);
      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          return res
            .status(400)
            .json({ error: 'E-mail de tripulante já cadastrado' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'A senha não confere!' });
      }

      const { name } = await user.update(req.body);

      return res.json(`Usuário ${name} alterado com sucesso!`);
    } catch (err) {
      // 'Houve um erro. Por favor, tente novamente.'
      return res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userExists = await User.findByPk(id);

      if (!userExists) {
        return res
          .status(404)
          .json({ error: 'Este tripulante não existe no sistema' });
      }

      await User.destroy({ where: { id } });

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }
}

export default new UserController();
