export interface IAuthData {
    email: string
    password: string
}

export interface IRegisterData extends IAuthData {
    firstName: string,
    middleName: string,
    role: string
}

export interface IUser  {
    id: string,
    uid: string,
    firstName: string,
    middleName: string,
    role: string
    email: string
}