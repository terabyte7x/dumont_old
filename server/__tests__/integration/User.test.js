/* eslint-disable no-undef */
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

  // Testa indexação de usuários com permissão
  it('If autorized, can list all users', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.body.count).toBeGreaterThan(0);
  });

  // Testa indexação de usuários sem permissão
  it('If not autorized, can not list all users', async () => {
    const user = await factory.attrs('NotAuthorizedUser');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.status).toBe(401);
  });

  // Testa indexação de usuários com permissão
  it('If autorized, can list own users', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.body.count).toBeGreaterThan(0);
  });

  // Testa se um usuário autorizado pode ver um usuário não existente
  it('If an authorized user see another user profile que não exite', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const id = await Math.random(10);
    const response = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    console.log(response.body);
    expect(response.status).toBe(404);
  });

  // Testa se um usuário autorizado pode ver seu próprio usuário
  it('If an authorized user see your own user profile', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const response = await request(app)
      .get(`/users/${userToken.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.body.name).toBe(user.name);
  });

  // Testa se um usuário autorizado pode ver outro usuário
  it('If an authorized user see any other user profile', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);

    const otherUser = await factory.attrs('User');
    await request(app).post('/users').send(otherUser);

    const userToken = await request(app).post('/session').send(user);

    const { name } = await otherUser;
    const { id } = await User.findOne({
      where: { name },
      attributes: ['id'],
    });

    const response = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.body.name).toBe(otherUser.name);
  });

  // Testa se um usuário não autorizado pode ver outro usuário
  it('If an unauthorized user see any other user profile', async () => {
    const user = await factory.attrs('NotAuthorizedUser');
    await request(app).post('/users').send(user);

    const otherUser = await factory.attrs('User');
    await request(app).post('/users').send(otherUser);

    const userToken = await request(app).post('/session').send(user);

    const { name } = await otherUser;
    const { id } = await User.findOne({
      where: { name },
      attributes: ['id'],
    });

    const response = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.status).toBe(401);
  });

  // Testa se um usuário autorizado pode alterar seu próprio usuário
  it('If an authorized user can modify your own user profile', async () => {
    const user = await factory.attrs('User');
    const newInfo = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const response = await request(app)
      .put(`/users/${userToken.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`)
      .send({
        email: newInfo.email,
        oldPassword: user.password,
        password: user.password,
      });
    expect(response.body.email).toBe(newInfo.email);
  });

  // Testa se um usuário autorizado não pode alterar seu próprio usuário com uma senha errada
  it('If an authorized user can not modify your own user profile with a wrong password', async () => {
    const user = await factory.attrs('User');
    const newInfo = await factory.attrs('NotAuthorizedUser');
    await request(app).post('/users').send(user);
    const userToken = await request(app).post('/session').send(user);
    const response = await request(app)
      .put(`/users/${userToken.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`)
      .send({
        email: newInfo.email,
        oldPassword: newInfo.password,
        password: user.password,
      });
    expect(response.status).toBe(401);
  });

  // Testa se um usuário autorizado pode alterar seu próprio usuário com um e-mail já existente
  it('If an authorized user can modify your own user profile with an already existent e-mail', async () => {
    const user = await factory.attrs('User');
    const existentUser = await factory.attrs('NotAuthorizedUser');
    await request(app).post('/users').send(user);
    await request(app).post('/users').send(existentUser);
    const userToken = await request(app).post('/session').send(user);
    const response = await request(app)
      .put(`/users/${userToken.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`)
      .send({
        email: existentUser.email,
        oldPassword: user.password,
        password: user.password,
      });
    expect(response.status).toBe(400);
  });

  // Testa se um usuário não autorizado pode alterar seu próprio usuário
  it('If an no authorized user can modify your any user profile', async () => {
    const user = await factory.attrs('NotAuthorizedUser');
    const newInfo = await factory.attrs('User');
    await request(app).post('/users').send(user);
    await request(app).post('/users').send(newInfo);
    const userToken = await request(app).post('/session').send(user);
    const otherUserId = await request(app).post('/session').send(newInfo);
    const response = await request(app)
      .put(`/users/${otherUserId.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`)
      .send({
        email: newInfo.email,
        oldPassword: user.password,
        password: user.password,
      });
    expect(response.status).toBe(401);
  });

  // Testa a exclusão de um cadastro existente (usuário não autorizado)
  it('If an authorized user is able to delete an user profile', async () => {
    const user = await factory.attrs('NotAuthorizedUser');
    const otherUser = await factory.attrs('User');
    await request(app).post('/users').send(user);
    await request(app).post('/users').send(otherUser);
    const userToken = await request(app).post('/session').send(user);
    const userThatShouldBeDeletedId = await request(app)
      .post('/session')
      .send(otherUser);
    const response = await request(app)
      .delete(`/users/${userThatShouldBeDeletedId.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.status).toBe(401);
  });

  // Testa a exclusão de um cadastro existente
  it('If an authorized user is able to delete an user profile', async () => {
    const user = await factory.attrs('User');
    const otherUser = await factory.attrs('NotAuthorizedUser');
    await request(app).post('/users').send(user);
    await request(app).post('/users').send(otherUser);
    const userToken = await request(app).post('/session').send(user);
    const userThatShouldBeDeletedId = await request(app)
      .post('/session')
      .send(otherUser);
    const response = await request(app)
      .delete(`/users/${userThatShouldBeDeletedId.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.status).toBe(200);
  });

  // Testa a exclusão de um cadastro não existente
  it('If an authorized user is able to delete an user profile that no exists', async () => {
    const user = await factory.attrs('User');
    const otherUser = await factory.attrs('NotAuthorizedUser');
    await request(app).post('/users').send(user);
    await request(app).post('/users').send(otherUser);
    const userToken = await request(app).post('/session').send(user);
    const userThatShouldBeDeletedId = await request(app)
      .post('/session')
      .send(otherUser);
    await request(app)
      .delete(`/users/${userThatShouldBeDeletedId.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    const response = await request(app)
      .delete(`/users/${userThatShouldBeDeletedId.body.usuario.id}`)
      .set('Authorization', `bearer ${userToken.body.token}`);
    expect(response.status).toBe(404);
  });
});
