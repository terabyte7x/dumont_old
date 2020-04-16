import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido!' });
  }

  /* O que o authHeader fornece é um Array com o Breader e o JWT token.
   * A variável abaixo descarta a palavra Breader e fica apenas com o token.
   */
  const [, token] = authHeader.split(' ');

  await jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }

    /* Retorna o ID do usuário que será usado em outras requisições. */
    req.userId = decoded.id;
    return next();
  });
};
