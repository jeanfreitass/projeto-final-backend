const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');
const { gerarToken } = require('../middlewares/authMiddleware');

const url = '/produtos';
let id = null;

// configura secret para gerar token de teste
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
process.env.JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

const token = gerarToken({ email: 'teste@local' });

describe('Testes do recurso /produtos', () => {
  test('POST / deve retornar 201', async () => {
    const response = await request
      .post(url)
      .set('authorization', `Bearer ${token}`)
      .send({ nome: 'Produto Teste', valor: 10.5, esgotado: false });

    expect(response.status).toBe(201);
    expect(response.body._id ).toBeDefined();
    expect(response.body.nome).toBe('Produto Teste');
    id = response.body._id ;
  });

  test('POST / deve retornar 400 quando faltar campos', async () => {
    const response = await request.post(url).set('authorization', `Bearer ${token}`).send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Nome e valor são obrigatórios');
  });

  test('POST / deve retornar 400 quando preco negativo', async () => {
    const response = await request
      .post(url)
      .set('authorization', `Bearer ${token}`)
      .send({ nome: 'Produto Teste 2', valor: -5 });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Valor inválido');
  });

  test('GET / deve retornar 200', async () => {
    const response = await request.get(url);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /id deve retornar 200', async () => {
    const response = await request.get(`${url}/${id}`);
    expect(response.status).toBe(200);
    expect(response.body._id || response.body.id).toBeDefined();
    expect(response.body.nome).toBe('Produto Teste');
  });

  test('GET /id deve retornar 400', async () => {
    const response = await request.get(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('ID inválido');
  });

  test('GET /id deve retornar 404', async () => {
    const response = await request.get(`${url}/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('PUT /id deve retornar 200', async () => {
    const response = await request
      .put(`${url}/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ valor: 19.99 });

    expect(response.status).toBe(200);
    expect(response.body._id || response.body.id).toBeDefined();
  });

  test('PUT /id deve retornar 400', async () => {
    const response = await request.put(`${url}/0`).set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('ID inválido');
  });

  test('PUT /id deve retornar 404', async () => {
    const response = await request
      .put(`${url}/000000000000000000000000`)
      .set('authorization', `Bearer ${token}`)
      .send({ valor: 5 });
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('PUT /id deve retornar 400 para valor invalido', async () => {
    const response = await request
      .put(`${url}/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ valor: -1 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Valor inválido');
  });

  test('DELETE /id deve retornar 204', async () => {
    const response = await request.delete(`${url}/${id}`).set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });

  test('DELETE /id deve retornar 400', async () => {
    const response = await request.delete(`${url}/0`).set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('ID inválido');
  });

  test('DELETE /id deve retornar 404', async () => {
    const response = await request.delete(`${url}/${id}`).set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Produto não encontrado');
  });
});
