const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Server = require('../../classes/Server');
const User = require('../../models/User');

const httpServer = new Server().server
let mongoServer;

const userDummy = { email: 'test@example.com', password: 'password', company: 'TestCompany' };

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth - Signup', () => {
  it('should sign up a new user', async () => {

    await supertest(httpServer)
      .post('/auth/signup')
      .send(userDummy)
      .expect(201);
    
    const user = await User.findOne({ email: 'test@example.com' });
    expect(user).not.toBeNull();
    expect(user.email).toBe(userDummy.email);
    expect(user.role).toBe("employee");
  });
});

describe('Auth - Login', () => {
    it('should login an existing user and return a JWT token', async () => {
  
      await supertest(httpServer)
        .post('/auth/login')
        .send({ email: userDummy.email, password: userDummy.password })
        .expect(200)
        .then((response) => {
          expect(response.body.token).toBeDefined();
        });
    });
  });
  

