const supertest = require('supertest');
const Server = require('../../../classes/Server');
const Technology = require('../../../models/Technology');

jest.mock('../../../models/Technology');

jest.mock("../../../middlewares/checkAuth", () => 
    jest.fn((roles) => (req, res, next) => next())
);

jest.mock("../../../middlewares/checkRole", () => 
    jest.fn((roles) => (req, res, next) => next())
);

const app = Server().express;

describe('Technology Controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /technologies/:id', () => {
        test('should return a technology by ID', async () => {
            const techMock = { name: 'Node.js', description: 'JS runtime environment' };
            Technology.findById.mockResolvedValue(techMock);

            const response = await supertest(app)
                .get('/api/app/')
                .expect(200);

            expect(response.body).toEqual(techMock);
            expect(Technology.findById).toHaveBeenCalledWith('123', expect.any(String));
        });
    });

    describe('GET /published-technologies', () => {
        test('should return all published technologies', async () => {
            const techsMock = [{ name: 'Node.js' }, { name: 'React' }];
            Technology.find.mockResolvedValue(techsMock);

            const response = await supertest(app)
                .get('/api/app/')
                .expect(200);

            expect(response.body).toEqual(techsMock);
            expect(Technology.find).toHaveBeenCalledWith({ published: true }, expect.any(String));
        });
    });

    describe('POST /technologies', () => {
        test('should create a new technology', async () => {
            const newTech = { name: 'GraphQL', description: 'Query language' };
            const saveMock = jest.fn().mockResolvedValue(newTech);
            Technology.mockImplementation(() => ({ save: saveMock }));

            const response = await supertest(app)
                .post('/api/app/')
                .send(newTech)
                .expect(201);

            expect(response.body).toEqual(newTech);
            expect(saveMock).toHaveBeenCalled();
        });
    });

    describe('PUT /technologies/:id/publish', () => {
        test('should publish an existing technology', async () => {
            const techMock = { save: jest.fn().mockResolvedValue() };
            Technology.findById.mockResolvedValue(techMock);

            await supertest(app)
                .put('/api/app/')
                .send({ ring: 'Adopt' })
                .expect(200);

            expect(techMock.save).toHaveBeenCalled();
            expect(techMock.published).toBe(true);
        });
    });

    describe('PUT /technologies/:id', () => {
        test('should update existing technology', async () => {
            const techMock = { save: jest.fn().mockResolvedValue(), edits: [] };
            Technology.findById.mockResolvedValue(techMock);

            await supertest(app)
                .put('/api/app/')
                .send({ name: 'Updated Tech' })
                .expect(200);

            expect(techMock.save).toHaveBeenCalled();
            expect(techMock.edits.length).toBeGreaterThan(0);
        });
    });
});
