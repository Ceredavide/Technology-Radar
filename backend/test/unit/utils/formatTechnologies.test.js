const formatTechnologies = require('../../../utils/formatTechnologies');

describe('formatTechnologies', () => {
    it('correctly formats technologies into all categories and rings', () => {
        const technologies = [
            { name: 'React', category: 'Frontend', ring: 'Adopt' },
            { name: 'Docker', category: 'Tools', ring: 'Adopt' },
            { name: 'Kubernetes', category: 'Tools', ring: 'Trial' },
            { name: 'Java', category: 'Languages_Frameworks', ring: 'Assess' },
            { name: 'Python', category: 'Languages_Frameworks', ring: 'Hold' },
            { name: 'AWS', category: 'Platforms', ring: 'Adopt' },
            { name: 'Flex', category: 'Techniques', ring: 'Adopt' },
        ];

        const expectedOutput = [
            {
                category: 'Techniques', rings: generateRings([
                    { name: 'Flex', category: 'Techniques', ring: 'Adopt' }
                ])
            },
            {
                category: 'Tools',
                rings: generateRings([
                    { name: 'Docker', category: 'Tools', ring: 'Adopt' },
                    { name: 'Kubernetes', category: 'Tools', ring: 'Trial' },
                ])
            },
            {
                category: 'Platforms',
                rings: generateRings([
                    { name: 'AWS', category: 'Platforms', ring: 'Adopt' }
                ])
            },
            {
                category: 'Languages_Frameworks',
                rings: generateRings([
                    { name: 'Java', category: 'Languages_Frameworks', ring: 'Assess' },
                    { name: 'Python', category: 'Languages_Frameworks', ring: 'Hold' }
                ])
            },
        ];

        const formattedTechnologies = formatTechnologies(technologies);
        expect(formattedTechnologies).toEqual(expectedOutput);
    });
});

function generateRings(techArray) {
    return [
        { name: 'Adopt', technologies: techArray.filter(tech => tech.ring === 'Adopt') },
        { name: 'Trial', technologies: techArray.filter(tech => tech.ring === 'Trial') },
        { name: 'Assess', technologies: techArray.filter(tech => tech.ring === 'Assess') },
        { name: 'Hold', technologies: techArray.filter(tech => tech.ring === 'Hold') },
    ];
}
