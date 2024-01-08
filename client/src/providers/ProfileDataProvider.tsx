import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";


type TProfileData = {
    username: string
    email: string
    createdAt: string
}

interface IProfileDataContext {
    profileData: TProfileData | null
    setProfileData: Dispatch<SetStateAction<TProfileData | null>>
}

const ProfileDataContext = createContext<IProfileDataContext | null>(null);

export function ProfileDataProvider({ children }: { children: React.ReactNode }) {

    const [profileData, setProfileData] = useState<TProfileData | null>(null);

    return (
        <ProfileDataContext.Provider
            value={{
                profileData,
                setProfileData,
            }}
        >
            {children}
        </ProfileDataContext.Provider>
    )
}

export function useProfileData() {
    const context = useContext(ProfileDataContext);
    if (!context) {
        throw new Error('useProfileData should be used inside an ProfileDataProvider.');
    }
    return context;
}