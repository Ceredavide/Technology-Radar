import Technology from "../../../shared/interfaces/Technology"

export default interface TechnologyRadar {
    categoryName: string,
    values: Ring[]
}

export interface Ring {
    ringName: string,
    technologies: Technology[]
}