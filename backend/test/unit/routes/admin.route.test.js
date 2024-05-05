const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

jest.mock('../../../middlewares/checkRole', () => {
  return jest.fn(() => (req, res, next) => next());
});

jest.mock('../../../controllers/technology', () => {
  return {
    getAllTechnologies: jest.fn((req, res) => res.status(200).send([])),
    getTechnologyById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
    createTechnology: jest.fn((req, res) => res.status(201).send('Technology Created')),
    publishTechnology: jest.fn((req, res) => res.status(200).send('Technology Published')),
    editTechnologyRing: jest.fn((req, res) => res.status(200).send('Technology Ring Updated')),
    editTechnology: jest.fn((req, res) => res.status(200).send('Technology Updated'))
  };
});

const adminRouter = require('../../../routes/api/admin');
app.use('/admin', adminRouter);

describe('Admin Routes', () => {
  it('GET /admin/technology should call getAllTechnologies controller', async () => {
    await request(app)
      .get('/admin/technology')
      .expect(200);

    const { getAllTechnologies } = require('../../../controllers/technology');
    expect(getAllTechnologies).toHaveBeenCalled();
  });

  it('GET /admin/technology/:id should call getTechnologyById controller', async () => {
    await request(app)
      .get('/admin/technology/123')
      .expect(200, { id: "123" });

    const { getTechnologyById } = require('../../../controllers/technology');
    expect(getTechnologyById).toHaveBeenCalled();
  });

  it('POST /admin/technology should call createTechnology controller', async () => {
    await request(app)
      .post('/admin/technology')
      .send({ name: 'New Tech' })
      .expect(201);

    const { createTechnology } = require('../../../controllers/technology');
    expect(createTechnology).toHaveBeenCalled();
  });

  it('PUT /admin/technology/publish/:id should call publishTechnology controller', async () => {
    await request(app)
      .put('/admin/technology/publish/123')
      .expect(200);

    const { publishTechnology } = require('../../../controllers/technology');
    expect(publishTechnology).toHaveBeenCalled();
  });

  it('PUT /admin/technology/ring/:id should call editTechnologyRing controller', async () => {
    await request(app)
      .put('/admin/technology/ring/123')
      .send({ newRing: 'Adopt' })
      .expect(200);

    const { editTechnologyRing } = require('../../../controllers/technology');
    expect(editTechnologyRing).toHaveBeenCalled();
  });

  it('PUT /admin/technology/:id should call editTechnology controller', async () => {
    await request(app)
      .put('/admin/technology/123')
      .send({ updates: { name: 'Updated Tech' } })
      .expect(200);

    const { editTechnology } = require('../../../controllers/technology');
    expect(editTechnology).toHaveBeenCalled();
  });
});
