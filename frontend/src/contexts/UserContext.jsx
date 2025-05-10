import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.services";

const UserContext = createContext(null);

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);

            try {
                const validated = await authService.isTokenValid()
                setIsAuthenticated(validated);

                if (validated) {
                    const data = await authService.getLoggedUserData();
                    setUser(data);  
                }

            } catch (err) {
                console.warn("Usuário não autenticado.");
                setIsAuthenticated(false);
                setUser(null)
            } finally {
                setLoading(false);
            }
        }

        initializeAuth()
    }, []);

    const login = async (email, password) => {
        await authService.login({ email, password });
        const loggedUser = await authService.getLoggedUserData();
        setIsAuthenticated(true)
        setUser(loggedUser);
    }

    const logout = async () => {
        await authService.logout();
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    )
};

export function useUser() {
    const context = useContext(UserContext);

    if(!context) {
        throw new Error("useUser hook deve ser utilizado dentro de um UserProvider");
    }
    
    return context
}