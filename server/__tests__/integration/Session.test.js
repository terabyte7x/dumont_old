/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  // Testa se a seção não pode ser aberta com um usuário inexistente
  it('If there is no user with this information the user can not initiate a session', async () => {
    const user = await factory.attrs('User');
    const response = await request(app).post(`/session`).send({
      email: user.email,
      password: user.password,
    });
    expect(response.status).toBe(401);
  });

  // Testa se a seção não pode ser aberta com uma senha errada
  it('If the password is wrong, the user can not initiate a session', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const existentUser = await factory.attrs('NotAuthorizedUser');
    const response = await request(app).post(`/session`).send({
      email: user.email,
      password: existentUser.password,
    });
    expect(response.status).toBe(401);
  });
});
