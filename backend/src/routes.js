import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AirportController from './app/controllers/AirportController';
import AuthMiddleware from './app/middlewares/auth';
import UsuarioValidator from './app/validators/UserValidator';
import Role from './app/middlewares/role';

const routes = new Router();
const upload = multer(multerConfig);

// Allow user to Create Own user, and create a Session JWT
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Authenticates the user's token. Each route below pass throw JWT authentication.
routes.use(AuthMiddleware);

// Files
routes.post(
  '/files',
  Role.grantAccess('createAny', 'file'),
  upload.single('file'),
  FileController.store
);

// Users
routes.put(
  '/user/:id',
  Role.grantAccess('updateAny', 'user'),
  UserController.update
);
routes.delete(
  '/user/:id',
  Role.grantAccess('deleteAny', 'user'),
  UserController.delete
);
routes.get(
  '/users',
  Role.grantAccess('readAny', 'users'),
  UserController.index
);
routes.get(
  '/user/:id',
  Role.grantAccess('readAny', 'user'),
  UserController.show
);

// Airports
routes.post(
  '/airports',
  Role.grantAccess('createAny', 'airport'),
  AirportController.store
);

export default routes;
