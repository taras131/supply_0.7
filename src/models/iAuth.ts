export interface IAuthData {
    email: string;
    password: string;
}

export interface IRegisterData extends IAuthData {
    email: string
    first_name: string
    middle_name: string
    role_id: number
    password: string
}


