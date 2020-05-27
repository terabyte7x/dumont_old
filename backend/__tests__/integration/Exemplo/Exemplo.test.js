import request from 'supertest';
import app from '../../src/app';
import Cliente from '../../src/app/models/Cliente';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Cliente', () => {
  beforeEach(async () => {
    await truncate();
  });
  // Testa cadastro de usuário único
  it('Se o cliente é cadastrado', async () => {
    const cliente = await factory.attrs('Cliente');
    const response = await request(app).post('/cliente').send(cliente);
    expect(response.body).toHaveProperty('id');
  });

  // Testa cadastro duplicado de usuário
  it('Se o endereço de email do cliente já existe, impede o cadastro', async () => {
    const cliente = await factory.attrs('Cliente');
    await request(app).post('/cliente').send(cliente);
    const response = await request(app).post('/cliente').send(cliente);
    expect(response.status).toBe(400);
  });

  // Testa indexação de clientes
  it('Se a rota de indexação de cliente responde e se existe cadastros listados', async () => {
    const cliente = await factory.attrs('Cliente');
    await request(app).post('/cliente').send(cliente);
    const response = await request(app).get('/cliente');
    expect(response.body.count).toBeGreaterThan(0);
  });

  // Testa visualização de um cliente
  it('Se o cliente solicitado não existe', async () => {
    const id = await Math.random(10);
    const response = await request(app).get(`/cliente/${id}`);
    expect(response.status).toBe(404);
  });

  // Testa visualização de um cliente não existente
  it('Se o cliente visualizado é o cliente solicitado', async () => {
    const cliente = await factory.attrs('Cliente');
    await request(app).post('/cliente').send(cliente);
    const { nome } = await cliente;
    const { id } = await Cliente.findOne({
      where: { nome },
      attributes: ['id'],
    });
    const response = await request(app).get(`/cliente/${id}`);
    expect(response.body.nome).toBe(nome);
  });

  // Testa a atualização de um cliente
  it('Testa a atualização de um cliente', async () => {
    const cliente = await factory.attrs('Cliente');
    const dadosAtualizacao = await factory.attrs('Cliente');
    await request(app).post('/cliente').send(cliente);
    const { nome } = await cliente;
    const { id } = await Cliente.findOne({
      where: { nome },
      attributes: ['id'],
    });
    await request(app).put(`/cliente/${id}`).send(dadosAtualizacao);
    const response = await Cliente.findOne({
      where: { nome },
      attributes: ['nome'],
    });
    expect(response.dataValues.nome).toBe(dadosAtualizacao.nome);
  });

  // Testa a exclusão de um cadastro existente
  it('Testa a exclusão de um cadastro existente', async () => {
    const cliente = await factory.attrs('Cliente');
    await request(app).post('/cliente').send(cliente);
    const { nome } = await cliente;
    const { id } = await Cliente.findOne({
      where: { nome },
      attributes: ['id'],
    });
    const response = await request(app).delete(`/cliente/${id}`);
    expect(response.status).toBe(200);
  });

  // Testa a exclusão de um cadastro inexistente
  it('Testa a exclusão de um cadastro inexistente ou já excluído', async () => {
    const cliente = await factory.attrs('Cliente');
    await request(app).post('/cliente').send(cliente);
    const { nome } = await cliente;
    const { id } = await Cliente.findOne({
      where: { nome },
      attributes: ['id'],
    });
    await request(app).delete(`/cliente/${id}`);
    const response = await request(app).delete(`/cliente/${id}`);
    expect(response.status).toBe(404);
  });
});
