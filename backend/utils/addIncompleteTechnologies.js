const addIncompleteTechnologies = (technologies, formattedTechnologies) => {
    return formattedTechnologies.map(category => {
        return {
            category: category.category,
            rings: [
                ...category.rings,
                {
                    name: "Undefined",
                    technologies: technologies.filter(technology => technology.category === category.category && technology.ring === "")
                }
            ]
        }
    })
}

module.exports = addIncompleteTechnologies;