import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.services";

const UserContext = createContext(null);

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);

            try {
                const response = await authService.validateToken()
                setIsAuthenticated(response.isValid);
                const roles = response.data.roles.map(role => role.authority)
                setRoles(roles)

                if (response.isValid) {
                    const data = await authService.getLoggedUserData();
                    setUser(data);  
                }

            } catch (err) {
                console.warn("Usuário não autenticado.", err);
                setIsAuthenticated(false);
                setUser(null)
            } finally {
                setLoading(false);
            }
        }

        initializeAuth()
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login({ email, password });
    
            if (response) {
                const roles = response.roles.map(role => role.authority)
                setRoles(roles)
            }
    
            const loggedUser = await authService.getLoggedUserData();
            setIsAuthenticated(true)
            setUser(loggedUser);
        }
        catch (error) {
            console.error("Erro no login:", error)
            throw error?.response?.data || "Erro ao fazer login.";
        }
    }

    const logout = async () => {
        await authService.logout();
        setIsAuthenticated(false)
        setRoles([])
        setUser(null)

    }

    return (
        <UserContext.Provider value={{ user, roles, isAuthenticated, loading, login, logout }}>
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