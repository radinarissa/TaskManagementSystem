export interface RegisterModel {
    email: string;
    password: string;
}

export interface LoginModel extends RegisterModel { }

export interface AuthResponse {
    token: string;
}

export interface User {
    id: string;
    email: string;
}