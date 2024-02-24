//TODO: improve name

module.exports = addIncompleteTechnologies = (technologies, formattedTechnologies) => {
    return formattedTechnologies.map(category => {
        return {
            category: category.category,
            rings: [
                {
                    name: "Undefined",
                    technologies: technologies.filter(technology => technology.category === category.category && technology.ring === "")
                },
                ...category.rings
            ]
        }
    })
}