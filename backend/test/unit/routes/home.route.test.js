const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

jest.mock('../../../controllers/technology', () => {
  return {
    getPublishedTechnologies: jest.fn((req, res) => res.status(200).send([]))
  };
});

const homeRouter = require('../../../routes/api/home');
app.use('/home', homeRouter);

describe('Home Routes', () => {
  it('GET /home/technology should call getPublishedTechnologies controller', async () => {
    await request(app)
      .get('/home/technology')
      .expect(200);

    const { getPublishedTechnologies } = require('../../../controllers/technology');
    expect(getPublishedTechnologies).toHaveBeenCalled();
  });
});
