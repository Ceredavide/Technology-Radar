const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

jest.mock('../../../controllers/options', () => {
  return {
    getCategories: jest.fn((req, res) => res.status(200).send([])),
    getRings: jest.fn((req, res) => res.status(200).send([]))
  };
});

const optionsRouter = require('../../../routes/api/options');
app.use('/options', optionsRouter);

describe('Options Routes', () => {
  it('GET /options/categories should call getCategories controller', async () => {
    await request(app)
      .get('/options/categories')
      .expect(200);

    const { getCategories } = require('../../../controllers/options');
    expect(getCategories).toHaveBeenCalled();
  });

  it('GET /options/rings should call getRings controller', async () => {
    await request(app)
      .get('/options/rings')
      .expect(200);

    const { getRings } = require('../../../controllers/options');
    expect(getRings).toHaveBeenCalled();
  });
});
