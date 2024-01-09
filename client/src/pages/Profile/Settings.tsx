import { Outlet } from "react-router-dom";
import { SecondaryNavbar } from "../../components/SecondaryNavbar";

export function Settings(){

    const itemsList = [
        {title: "Account", link:""},
    ]

    return <section className="flex h-full">
        <SecondaryNavbar itemsList={itemsList}/>
        <Outlet />
    </section>
}