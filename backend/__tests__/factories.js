import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'manager'
});

export default factory;


