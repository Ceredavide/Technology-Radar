const request = require('supertest');
const Server = require("../../../classes/Server");

describe('Server Class Tests', () => {
    let app;

    beforeAll(() => {
        app = Server().express;
    });

    test('Singleton behavior', () => {
        const firstInstance = Server();
        const secondInstance = Server();
        expect(firstInstance).toBe(secondInstance);
    });

    test('API GET endpoint test', async () => {
        const response = await request(app).get('/api/test-route');
        expect(response.status).toBe(200);
        expect(response.body).toEqual('It works!');
    });

    test('API POST endpoint test', async () => {
        const testData = { data: 'test' };
        const response = await request(app).post('/api/test-route').send(testData);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(testData);
    });
    

    test('404 Error Handling', async () => {
        const response = await request(app).get('/nonexistent/route');
        expect(response.status).toBe(404);
        expect(response.body).toEqual("Not Found.");
    });
});

