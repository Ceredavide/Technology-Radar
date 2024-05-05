const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Server = require('../../../classes/Server');
const User = require('../../../models/User');

jest.mock('jsonwebtoken');

const app = Server().express;

describe('User Controller Tests', () => {

  let hashedPassword;

  beforeAll(async () => { 
    hashedPassword = bcrypt.hashSync('Password123', 12);
    await User.create({
      email: 'alreadycreated@example.com',
      password: hashedPassword,
      company: 'Test Company'
    }); 
  });

  describe('POST /signup', () => {
    test('should create a new user and return 201', async () => {
      const response = await supertest(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          company: 'Test Company'
        })
        .expect(201);

      expect(response.body.message).toBe('User created successfully');
    });

    test('should return 422 if user already exists', async () => {
      await User.create({
        email: 'alreadythere@example.com',
        password: 'Password123',
        company: 'Test Company'
      });

      const response = await supertest(app)
        .post('/api/auth/signup')
        .send({
          email: 'alreadythere@example.com',
          password: 'Password123',
          company: 'Test Company'
        })
        .expect(422);

      expect(response.body).toBe('There is already an user with that email.');
    });
  });

  describe('POST /login', () => {
    test('should log in an existing user and return a token', async () => {

      jwt.sign.mockImplementation((payload, secret, options) => 'mocked-token');

      const response = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: 'alreadycreated@example.com',
          password: 'Password123'
        })
        .expect(200);

      expect(response.body.token).toBe('mocked-token');
      expect(response.body.user.email).toBe('alreadycreated@example.com');
    });

    test('should return 401 if password is incorrect', async () => {
      const user = new User({
        email: 'login@example.com',
        password: '$2a$12$examplehash',
        company: 'Test Company'
      });
      await user.save();

      const response = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toBe('Password is wrong, try again.');
    });
  });
});
