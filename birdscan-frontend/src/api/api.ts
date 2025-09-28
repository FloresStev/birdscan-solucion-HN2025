
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
    message: string;
}

export interface User {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    userType: string;
}

export interface GoogleLoginResponse {
    message: string;
    user: {
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        userType: string;
        picture?: string | null;
    };
}

export interface Bird {
    id: string;
    spanish_commonName: string;
    english_commonName: string;
    scientificName: string;
    conservationStatus: string;
    status: string;
    description: string;
    imageUrl: string | null;
    distribution: string;
}

export interface Reserve {
    id: string,
    name: string,
    description: string | null,
    department: string,
    municipality: string,
    area: number | null,
    latitude: number | null,
    longitude: number | null,
    activities: string | null,
    protected_area_type: string,
    images: string[],
    entrance_fee: string | null,
    opening_hours: string | null,
    services: string | null,
    attraction: string | null,
    site: string | null,
    phone: string | null,
    email: string | null,
}

export interface ReserveBird {
    id: string;
    spanish_commonName: string;
    scientificName: string;
    imageUrl: string | null;
    abundance: number;
    seasonality: string | null;
    presenceLevel: string | null;
}





