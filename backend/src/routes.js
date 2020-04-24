import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AirportController from './app/controllers/AirportController';
import AircraftController from './app/controllers/AircraftController';
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
routes.get(
  '/users',
  Role.grantAccess('readAny', 'users'),
  UserController.index
);
routes.get(
  '/users/:id',
  Role.grantAccess('readAny', 'user'),
  UserController.show
);
routes.put(
  '/users/:id',
  Role.grantAccess('updateAny', 'user'),
  UserController.update
);
routes.delete(
  '/users/:id',
  Role.grantAccess('deleteAny', 'user'),
  UserController.delete
);

// Airports
routes.post(
  '/airports',
  Role.grantAccess('createAny', 'airports'),
  AirportController.store
);
routes.get(
  '/airports',
  Role.grantAccess('readAny', 'airports'),
  AirportController.index
);
routes.get(
  '/airports/:id',
  Role.grantAccess('readAny', 'airports'),
  AirportController.show
);
routes.put(
  '/airports/:id',
  Role.grantAccess('updateAny', 'airports'),
  AirportController.update
);
routes.delete(
  '/airports/:id',
  Role.grantAccess('deleteAny', 'airports'),
  AirportController.delete
);

// Aircrafts
routes.post(
  '/aircrafts',
  Role.grantAccess('createAny', 'aircrafts'),
  AircraftController.store
);
routes.get(
  '/aircrafts',
  Role.grantAccess('readAny', 'aircrafts'),
  AircraftController.index
);
routes.get(
  '/aircrafts/:id',
  Role.grantAccess('readAny', 'aircrafts'),
  AircraftController.show
);
routes.put(
  '/aircrafts/:id',
  Role.grantAccess('updateAny', 'aircrafts'),
  AircraftController.update
);
routes.delete(
  '/aircrafts/:id',
  Role.grantAccess('deleteAny', 'aircrafts'),
  AircraftController.delete
);

export default routes;
