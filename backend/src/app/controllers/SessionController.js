/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import Usuario from '../models/Usuario';

class SessionController {
  async store(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Tripulante não encontrado.' });
    }

    if (!(await usuario.checkSenha(senha))) {
      return res.status(401).json({ error: `Senha não reconhecida.` });
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: { id, nome, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
