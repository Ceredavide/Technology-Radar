const Technology = require('../../../models/Technology');
const User = require('../../../models/User');

describe('Technology Model Tests', () => {

    beforeAll(async () => {
        const mockUser = new User({email: 'john@example.com', password: 'password', company: 'HSLU'});
        const savedUser = await mockUser.save();
        mockUserId = savedUser._id;
    });

    it('creates a valid technology', async () => {
        const validTech = new Technology({
            name: 'Node.js',
            description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
            category: 'Techniques',
            ring: 'Adopt',
            user: mockUserId
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
                ring: 'Adopt',
                user: mockUserId
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
            ring: 'Hold',
            user: mockUserId
        }).save();

        const updatedTech = await Technology.findByIdAndUpdate(tech._id, { $set: { ring: 'Adopt' } }, { new: true });
        expect(updatedTech).toHaveProperty('ring', 'Adopt');
    });

    it('applies pre-save hook correctly', async () => {
        const tech = new Technology({
            name: 'Docker',
            description: 'Container platform',
            category: 'Techniques',
            ring: 'Adopt',
            user: mockUserId
        });

        const savedTech = await tech.save();

        expect(savedTech.category).toEqual('Techniques');
        expect(savedTech.ring).toEqual('Adopt');
    });
});

