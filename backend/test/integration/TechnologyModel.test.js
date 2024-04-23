const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Technology = require('../../models/Technology');

describe('Technology Model Tests', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('creates a valid technology', async () => {
        const validTech = new Technology({
            name: 'Node.js',
            description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
            category: 'Techniques',
            ring: 'Adopt'
        });

        const savedTech = await validTech.save();
        expect(typeof savedTech).toBe('object');
        expect(savedTech).toHaveProperty('name', 'Node.js');
        expect(savedTech).toHaveProperty('description', 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.');
        expect(savedTech).toHaveProperty('category', 'Techniques');
        expect(savedTech).toHaveProperty('ring', 'Adopt');
    });

    it('fails to create technology with invalid category', async () => {
        try {
            await new Technology({
                name: 'React',
                description: 'A JS library for building UIs.',
                category: 'GG',
                ring: 'Adopt'
            }).save();
        } catch (err) {
            expect(err.errors.category).toBeDefined();
            expect(err.errors.category.message).toContain('is not supported');
        }
    });

    it('updates a technology successfully', async () => {
        const tech = await new Technology({
            name: 'Angular',
            description: 'A comprehensive framework.',
            category: 'Techniques',
            ring: 'Hold'
        }).save();

        const updatedTech = await Technology.findByIdAndUpdate(tech._id, { $set: { ring: 'Adopt' } }, { new: true });
        expect(updatedTech).toHaveProperty('ring', 'Adopt');
    });

    it('applies pre-save hook correctly', async () => {
        const tech = new Technology({
            name: 'Docker',
            description: 'Container platform',
            category: 'Techniques',
            ring: 'Adopt'
        });

        const savedTech = await tech.save();

        expect(savedTech.category).toEqual('Techniques');
        expect(savedTech.ring).toEqual('Adopt');
    });
});

