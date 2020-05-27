import request from 'supertest';
import app from '../../src/app';
import Aircraft from '../../src/app/models/Aircraft';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Aircraft', () => {
  beforeEach(async () => {
    await truncate();
  });
  // It test if the system is able to create a aircraft
  it('If the aircraft is created', async () => {
    const aircraft = await factory.attrs('Cliente');
    const response = await request(app).post('/cliente').send(cliente);
    expect(response.body).toHaveProperty('id');
  });
});
