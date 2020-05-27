/**
 * @param secret: Gerar seu próprio MD5
 * http://www.md5.cz
 */
import 'dotenv/config';

export default {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES_IN,
};
