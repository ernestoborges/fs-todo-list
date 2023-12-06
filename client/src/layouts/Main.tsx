import { Outlet } from "react-router-dom";
import { MainNavbar } from "../components/MainNavbar";

export function MainLayout() {

    return <>
        <div className="flex w-full h-full">
            <MainNavbar />
            <main className="grow">
                <Outlet />
            </main>
        </div>
    </>
}