import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../models/auth';
import { authService } from '../services/auth-service';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Тук можеш да добавиш логика за извличане на потребителска информация от JWT токена
        const token = localStorage.getItem('token');
        if (token) {
            // За демонстрация просто показваме, че има логнат потребител
            setUser({ id: '1', email: 'user@example.com' });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await authService.login({ email, password });
            setUser({ id: '1', email });
        } catch (error) {
            console.error('Грешка при вход:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await authService.register({ email, password });
        } catch (error) {
            console.error('Грешка при регистрация:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};