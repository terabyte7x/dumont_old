/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('If a not authorized user can create an a aircraft', async () => {
    const user = await factory.attrs('NotAuthorizedUser');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const aircraft = await factory.attrs('Aircraft');
    const response = await request(app)
      .post('/aircrafts')
      .set('Authorization', `bearer ${userToken.body.token}`)
      .send(aircraft);
    expect(response.status).toBe(401);
  });

  it('If an authorized user can create an a aircraft', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const aircraft = await factory.attrs('Aircraft');
    const response = await request(app)
      .post('/aircrafts')
      .set('Authorization', `bearer ${userToken.body.token}`)
      .send(aircraft);
    expect(response.status).toBe(200);
  });
});
