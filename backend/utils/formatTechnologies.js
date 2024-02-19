const CATEGORIES = require("../constants/CATEGORIES");
const RINGS = require("../constants/RINGS");

module.exports = formatTechnologies = (technologies) => {
    return Object.values(CATEGORIES).reduce((accumulator, currentCategoryValue) => {
        accumulator.push({
            category: currentCategoryValue,
            rings: Object.values(RINGS).reduce((innerAccumulator, currentRingValue) => {
                innerAccumulator.push({
                    name: currentRingValue,
                    technologies: technologies
                        .filter(technology => technology.category === currentCategoryValue && technology.ring === currentRingValue)
                });
                return innerAccumulator;
            }, [])
        });
        return accumulator;
    }, []);
}