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

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
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
      const { id, name, email, role } = await User.create(req.body);

      return res.json({ id, name, email });
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
    }
  }

  async update(req, res) {
    try {
      const { email, oldPassword } = req.body;
      const user = req.params;
      // const user = await User.findByPk(req.userId);
      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          return res.status(400).json({
            error:
              'Este e-mail já pertence a um tripulante cadastrado no sistema.',
          });
        }
      }

      // Password Check
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'A senha não confere.' });
      }

      const { id, name } = await user.update(req.body);

      return res.json({
        message: `O usuário ${name}, ID ${id} foi alterado com sucesso!`,
      });
    } catch (err) {
      return res.status(500).json('Houve um erro. Por favor, tente novamente.');
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
