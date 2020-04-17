import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AuthMiddleware from './app/middlewares/auth';
import UsuarioValidator from './app/validators/UserValidator';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UsuarioValidator, UserController.store);
routes.post('/session', SessionController.store);
routes.use(AuthMiddleware);
routes.get('/', (req, res) => {
  res.json({ message: 'Dumont is alive!' });
});
routes.post('/files', upload.single('file'), FileController.store);
routes.put('/users', UserController.update);

export default routes;
