import { Outlet, useNavigate } from "react-router-dom";
import { MainNavbar } from "../components/MainNavbar";
import { useEffect } from "react";
import { useProfileData } from "../providers/ProfileDataProvider";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export function MainLayout() {

    const axiosPrivate = useAxiosPrivate()
    const { setProfileData } = useProfileData();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/user/profile', {
                    signal: controller.signal
                });
                isMounted && setProfileData(response.data);
            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return <>
        <div className="flex w-full h-full">
            <MainNavbar />
            <main className="grow bg-card">
                <Outlet />
            </main>
        </div>
    </>
}