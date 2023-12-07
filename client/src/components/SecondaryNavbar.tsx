import { Link } from "react-router-dom";

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

    return <>
        <section
            className="flex flex-col bg-marine w-full max-w-xs p-4 text-secondary-text font-semibold text-2xl border border-transparent border-dashed border-l-secondary-text"
        >

            <ul
                className="w-full flex flex-col gap-4 "
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
        </section >
    </>
}