const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

jest.mock('../../../controllers/auth', () => {
  const signup = jest.fn((req, res) => res.status(201).send('Signed up'));
  const login = jest.fn((req, res) => res.status(200).send('Logged in'));
  return { signup, login };
});

const authRouter = require('../../../routes/auth');
app.use('/auth', authRouter);

describe('Auth Routes', () => {
  it('POST /signup should call signup controller', async () => {
    await request(app)
      .post('/auth/signup')
      .send({ username: 'test', password: 'password' })
      .expect(201, 'Signed up');

    const { signup } = require('../../../controllers/auth');
    expect(signup).toHaveBeenCalled();
  });

  it('POST /login should call login controller', async () => {
    await request(app)
      .post('/auth/login')
      .send({ username: 'test', password: 'password' })
      .expect(200, 'Logged in');

    const { login } = require('../../../controllers/auth');
    expect(login).toHaveBeenCalled();
  });
});
