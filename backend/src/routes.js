import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './app/middlewares/auth';
import UsuarioValidator from './app/validators/UsuarioValidator';

const routes = new Router();

routes.post('/usuario', UsuarioValidator, UsuarioController.store);
routes.post('/session', SessionController.store);
routes.use(AuthMiddleware);
routes.get('/', (req, res) => {
  res.json({ message: 'Dumont is alive!' });
});

export default routes;
