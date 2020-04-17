/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Verifica se o e-mail está no banco de dados.
    // eslint-disable-next-line prettier/prettier
    const emailExists = await User.findOne({ where: { email: req.body.email } });
    if (emailExists) {
      return res.status(400).json({ error: 'E-mail already exists.' });
    }

    // Verifica se o código anac está no banco de dados.
    const anacExists = await User.findOne({ where: { anac: req.body.anac } });
    if (anacExists) {
      return res.status(400).json({ error: 'Anac already exists.' });
    }

    // Se as verificações acima estiverem OK, ele permite criar um usuário.
    const { id, name, anac, email, active_user, admin } = await User.create(
      req.body
    );

    return res.json({ id, name, anac, email });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      message: `O usuário ${name}, ID ${id} foi alterado com sucesso!`,
    });
  }
}

export default new UserController();
