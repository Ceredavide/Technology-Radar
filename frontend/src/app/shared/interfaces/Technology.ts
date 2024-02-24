import User from "../../core/auth/interfaces/User";

export default interface Technology {
    name: string,
    description: string,
    ring: string,
    category: string,
    descriptionCategorization: string,
    _id?: string,
    creator?: User,
    publisher?: User,
    published?: boolean,
    createdAt?: string,
    publishedAt?: string,
    updatedAt?: string,
    __v?: number
    edits: edit[]
}

interface edit {
    user: User,
    time: string
}
