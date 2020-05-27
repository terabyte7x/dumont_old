import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';

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

export default factory;
