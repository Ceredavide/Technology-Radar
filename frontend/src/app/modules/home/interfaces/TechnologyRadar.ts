import Technology from "../../../shared/interfaces/Technology"

export default interface TechnologyRadar {
    category: string,
    rings: Ring[]
}

export interface Ring {
    name: string,
    technologies: Technology[]
}