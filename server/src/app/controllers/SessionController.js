/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not founded.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: `Password doens't match.` });
    }

    const { id, name } = user;

    return res.json({
      usuario: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
