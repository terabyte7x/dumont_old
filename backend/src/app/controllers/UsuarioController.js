/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const {
      id,
      nome,
      codigo_anac,
      email,
      usuario_ativo,
      admin,
    } = await Usuario.create(req.body);

    return res.json({ id, nome, codigo_anac, email });
  }
}

export default new UsuarioController();
