
import {useContext, createContext, useState, useEffect, type ReactNode } from "react";

import type { User } from "../api/api";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, user: any) => void;
    logout: () => void;
    user: any | null;

    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    user: null,
    loading: true,
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true); 


    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (token && userData) {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    return (

        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, user, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
