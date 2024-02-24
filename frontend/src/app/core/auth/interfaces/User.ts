export default interface User {
    userName: string
    company: string,
    email: string,
    role: string
}

export interface UserData {
    user: User,
    token: string
}