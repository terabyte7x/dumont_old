import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Dumont is alive!' });
});

routes.post('/usuario', UsuarioController.store);

export default routes;
