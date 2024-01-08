import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { useProfileData } from "./ProfileDataProvider";


interface IAuthContext {
    isLoggedIn: boolean
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    accessToken: string | null
    setAccessToken: Dispatch<SetStateAction<string | null>>
    logout: () => void
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const { setProfileData } = useProfileData();

    async function logout() {
        const controller = new AbortController();
        try {
            await axiosPrivate.post('/api/user/logout', {
                signal: controller.signal
            });
            setProfileData(null);
        } catch (error) {
            console.error(error);
        }
        setIsLoggedIn(false)
        setAccessToken(null)
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                accessToken,
                setAccessToken,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth should be used inside an AuthProvider.');
    }
    return context;
}
