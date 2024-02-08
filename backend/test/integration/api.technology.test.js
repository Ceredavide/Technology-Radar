const supertest = require('supertest');

const Server = require("../../classes/Server")
const Technology = require('../../models/Technology');

jest.mock('../../models/Technology');

let httpServer;

beforeAll(async () => {
  httpServer = new Server().server
});

afterAll(async () => {
  if (httpServer && httpServer.close) {
    await new Promise(done => httpServer.close(done));
  }
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
