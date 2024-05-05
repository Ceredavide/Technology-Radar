// Tests for the addIncompleteTechnologies function
const addIncompleteTechnologies = require('../../../utils/addIncompleteTechnologies');

describe('addIncompleteTechnologies', () => {
    it('adds technologies with undefined rings correctly', () => {
        const technologies = [
            { name: 'Tech1', category: 'Frontend', ring: '' },
            { name: 'Tech2', category: 'Backend', ring: 'Adopt' },
            { name: 'Tech3', category: 'Frontend', ring: '' }
        ];

        const formattedTechnologies = [
            { category: 'Frontend', rings: [{ name: 'Adopt', technologies: [] }] },
            { category: 'Backend', rings: [{ name: 'Adopt', technologies: [] }] }
        ];

        const result = addIncompleteTechnologies(technologies, formattedTechnologies);
        
        expect(result).toEqual([
            {
                category: 'Frontend',
                rings: [
                    { name: 'Adopt', technologies: [] },
                    { name: 'Undefined', technologies: [{ name: 'Tech1', category: 'Frontend', ring: '' }, { name: 'Tech3', category: 'Frontend', ring: '' }] }
                ]
            },
            {
                category: 'Backend',
                rings: [
                    { name: 'Adopt', technologies: [] },
                    { name: 'Undefined', technologies: [] }
                ]
            }
        ]);
    });

    it('handles empty input arrays correctly', () => {
        const result = addIncompleteTechnologies([], []);
        expect(result).toEqual([]);
    });
});
