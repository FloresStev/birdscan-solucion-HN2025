
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface LoginResponse {
    access_token: string;
    user?: User;
}

export interface User {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    userType : string;
}



