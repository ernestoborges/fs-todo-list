import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";

export function MainNavbar() {


    const navItems = [
        { title: "Home", link: "", icon: <AiOutlineHome /> },
        { title: "Teams", link: "teams", icon: <BsPeople /> },
    ]

    return <>
        <nav
            className="flex flex-col bg-marine w-full max-w-xs p-4 text-secondary-text font-semibold text-2xl"
        >
            <section
                className="grow"
            >

                <ul
                    className="w-full flex flex-col gap-4 "
                >
                    {
                        navItems.map((item, index) => (
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
            </section>
            <section >
                <Link
                    className="flex items-center gap-4 text-white cursor-pointer hover:bg-card rounded-lg p-4"
                    to={"settings"}
                >
                    <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/300" />
                    </div>
                    <span>Ernesto</span>
                </Link>
            </section>
        </nav >
    </>
}