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
    const { page = 1, limit = 10 } = req.query;
    const users = await User.findAndCountAll({
      attributes: ['id', 'name', 'email'],
      limit: JSON.parse(limit),
      offset: (page - 1) * limit,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(users);
  }

  async show(req, res) {
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
  }

  async store(req, res) {
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

    // await Queue.add('RegistrationMail', { user });

    return res.status(200).json({ name, email, role });
  }

  async update(req, res) {
    const { id } = req.params;
    const { email, oldPassword } = req.body;
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
    await user.update(req.body);
    return res.status(200).json(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res
        .status(404)
        .json({ error: 'Este tripulante não existe no sistema' });
    }

    await User.destroy({ where: { id } });

    return res.sendStatus(200);
  }
}

export default new UserController();
