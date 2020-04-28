import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import FlightInstructorController from './app/controllers/FlightInstructorController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import EmployeeController from './app/controllers/EmployeeController';
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

// Employee
routes.post(
  '/employees',
  Role.grantAccess('createAny', 'employee'),
  EmployeeController.store
);
routes.get(
  '/employees',
  Role.grantAccess('readAny', 'employees'),
  EmployeeController.index
);
routes.get(
  '/employees/:id',
  Role.grantAccess('readOwn', 'employee'),
  EmployeeController.show
);
routes.put(
  '/employees/:id',
  Role.grantAccess('updateAny', 'employee'),
  EmployeeController.update
);
routes.delete(
  '/employees/:id',
  Role.grantAccess('deleteAny', 'employee'),
  EmployeeController.delete
);

// Flight Instructors
routes.post(
  '/flightinstructors',
  Role.grantAccess('createAny', 'flightinstructors'),
  FlightInstructorController.store
);
routes.get(
  '/flightinstructors',
  Role.grantAccess('readAny', 'flightinstructors'),
  FlightInstructorController.index
);
routes.get(
  '/flightinstructors/:id',
  Role.grantAccess('readOwn', 'flightinstructor'),
  FlightInstructorController.show
);
routes.put(
  '/flightinstructors/:id',
  Role.grantAccess('updateAny', 'flightinstructor'),
  FlightInstructorController.update
);
routes.delete(
  '/flightinstructors/:id',
  Role.grantAccess('deleteAny', 'flightinstructor'),
  FlightInstructorController.delete
);

// Students
routes.post(
  '/students',
  Role.grantAccess('createOwn', 'students'),
  StudentController.store
);
routes.get(
  '/students',
  Role.grantAccess('readAny', 'students'),
  StudentController.index
);
routes.get(
  '/students/:id',
  Role.grantAccess('readOwn', 'students'),
  StudentController.show
);
routes.put(
  '/students/:id',
  Role.grantAccess('updateOwn', 'students'),
  StudentController.update
);
routes.delete(
  '/students/:id',
  Role.grantAccess('deleteOwn', 'students'),
  StudentController.delete
);

export default routes;
