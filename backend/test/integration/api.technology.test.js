const supertest = require('supertest');

const Server = require("../../classes/Server")
const Technology = require('../../models/Technology');

const RINGS = require("../../constants/RINGS")
const CATEGORIES = require("../../constants/CATEGORIES")

jest.mock('../../models/Technology');

jest.mock('../../middlewares/checkAuth', () => (req, res, next) => {
  next();
});

let httpServer;

beforeAll(async () => {
  httpServer = new Server().server
});

afterAll(async () => {
  if (httpServer && httpServer.close) {
    await new Promise(done => httpServer.close(done));
  }
});

describe('GET /categories', () => {
  it('should retrieve all the category options', async () => {
    const res = await supertest(httpServer)
      .get('/api/options/categories')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(CATEGORIES);
  });
});

describe('GET /rings', () => {
  it('should retrieve all the ring options', async () => {
    const res = await supertest(httpServer)
      .get('/api/options/rings')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(RINGS);
  });
});

describe('POST /technology - Create Technology', () => {

  it('should create a new technology and return 201', async () => {

    const mockTechnology = {
      name: "Demo",
      category: {
        name: "Foo",
        description: "Loreps Ipsum"
      },
      ring: "Bar",
      description: "Dog"
    }

    Technology.mockImplementation(() => ({
      validateSync: jest.fn(),
      save: jest.fn(),
      toObject: jest.fn().mockReturnValue(mockTechnology),
    }));

    await supertest(httpServer)
      .post('/api/technology')
      .send(mockTechnology)
      .expect(201)
      .then((response) => {
        expect(response.body).toStrictEqual(mockTechnology);
      });
  });
});
