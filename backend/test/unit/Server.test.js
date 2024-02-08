const request = require('supertest');
const Server = require('../../classes/Server');

describe('Server Set Up Tests', () => {
    let httpServer;

    beforeEach(() => {
        const server = new Server();
        httpServer = server.server;
    });

    afterEach(async () => {
        if (httpServer && httpServer.close) {
            await new Promise(done => httpServer.close(done));
        }
    });

    it('should handle GET requests', async () => {
        await request(httpServer)
            .get('/test-route')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual("It works!");
            });
    });

    it('should handle POST requests', async () => {
        await request(httpServer)
            .post('/test-route')
            .send({ key: 'value' })
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual({ key: 'value' });
            });
    });

    it('should enforce security headers with helmet', async () => {
        const response = await request(httpServer).get('/');
        expect(response.headers['x-content-type-options']).toBe('nosniff');
    });

    it('should return 404 for non-existent routes', async () => {
        await request(httpServer)
            .get('/non-existent')
            .expect(404)
            .then((response) => {
                expect(response.body).toBe('Not Found.');
            });
    });
});
