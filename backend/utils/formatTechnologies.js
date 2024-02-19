const CATEGORIES = require("../constants/CATEGORIES");
const RINGS = require("../constants/RINGS");

module.exports = formatTechnologies = (technologies) => {
    return Object.values(CATEGORIES).reduce((accumulator, currentCategoryValue) => {
        accumulator.push({
            categoryName: currentCategoryValue,
            values: Object.values(RINGS).reduce((innerAccumulator, currentRingValue) => {
                innerAccumulator.push({
                    ringName: currentRingValue,
                    technologies: technologies.filter(technology => technology.category.name === currentCategoryValue && technology.ring === currentRingValue)
                });
                return innerAccumulator;
            }, [])
        });
        return accumulator;
    }, []);
}