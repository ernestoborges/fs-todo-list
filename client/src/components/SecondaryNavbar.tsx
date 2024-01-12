import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../providers/AuthProvider";

type ItemsListT = {
    title: string,
    link: string,
    icon?: JSX.Element
}[]

export function SecondaryNavbar({
    itemsList
}: {
    itemsList: ItemsListT
}) {

    const { logout } = useAuth()
    const navigate = useNavigate()

    return <>
        <section
            className="flex flex-col bg-marine w-full max-w-xs p-4 text-secondary-text font-semibold text-2xl border border-transparent border-dashed border-l-secondary-text"
        >

            <ul
                className="w-full flex flex-col gap-4 grow"
            >
                {
                    itemsList.map((item, index) => (
                        <li
                            key={index}
                        >
                            <Link
                                to={item.link}
                                className="flex gap-4 items-center hover:bg-card hover:text-white rounded-lg cursor-pointer p-4"
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <hr
                className="bg-card border-none h-[0.1rem] mt-2 mb-2"
            />
            <ul
                className="w-full flex flex-col gap-4 "
            >
                <li
                    className="flex gap-4 items-center hover:bg-card hover:text-white rounded-lg cursor-pointer p-4"
                    onClick={() => {
                        logout()
                        navigate("/login")
                    }}
                >
                    <MdLogout />
                    <span>Log out</span>
                </li>
            </ul>
        </section >
    </>
}