import request from 'supertest';
import app from '../../src/app';
import User from '../../src/app/models/User';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  // Testa cadastro único de usuário
  it('If the user can create himself', async () => {
    const user = await factory.attrs('User');
    const response = await request(app).post('/users').send(user);
    expect(response.body).toHaveProperty('name');
  });

  // Testa cadastro duplicado de usuário
  it('If the e-mail is already in use, he can not create the user', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(400);
  });

  // afterAll(() => setTimeout(() => process.exit(), 1000));
});
