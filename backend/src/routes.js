import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.use(AuthMiddleware);
routes.get('/', (req, res) => {
  res.json({ message: 'Dumont is alive!' });
});

routes.post('/usuario', UsuarioController.store);

export default routes;
