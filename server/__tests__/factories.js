import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import Aircraft from '../src/app/models/Aircraft';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'teacher',
});

factory.define('NotAuthorizedUser', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'student',
});

factory.define('Aircraft', Aircraft, {
  registration: faker.hacker.abbreviation(),
  manufacturer: faker.hacker.abbreviation(),
  year_of_manufacture: faker.date.future(),
  model: faker.hacker.abbreviation(),
  serial_number: faker.hacker.abbreviation(),
  icao_type: faker.hacker.abbreviation(),
  type_of_pilot_license: faker.hacker.abbreviation(),
  mtow: faker.random.number(),
  mlw: faker.random.number(),
  maximum_of_passengers: faker.random.number(),
  record_category: faker.hacker.abbreviation(),
  operation_status: faker.hacker.abbreviation(),
  date_of_acquisition: faker.date.future(),
});

export default factory;
