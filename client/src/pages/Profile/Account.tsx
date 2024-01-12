import { useProfileData } from "../../providers/ProfileDataProvider"

export function Account() {

    const { profileData } = useProfileData();

    function timestampToDate(timestamp: string | undefined) {
        //2024-01-08 18:42:39.184+00
        if (!timestamp) return ("--/--/--")
        const [date] = timestamp.split("T")
        const [YY, MM, DD] = date.split("-")
        return (`${DD}/${MM}/${YY}`)
    }

    return <>
        <section
            className="w-full p-20 text-primary-text flex items-center justify-center"
        >
            <ul
                className="flex flex-col gap-4"
            >
                <li
                    className="flex flex-col"
                >
                    <span className="text-secondary-text">USERNAME</span>
                    <span>{profileData?.username}</span>
                </li>
                <li
                    className="flex flex-col"
                >
                    <span className="text-secondary-text">EMAIL</span>
                    <span>{profileData?.email}</span>
                </li>
                <li
                    className="flex flex-col"
                >
                    <span className="text-secondary-text">MEMBER SINCE</span>
                    <span>{timestampToDate(profileData?.createdAt)}</span>
                </li>
            </ul>
        </section >
    </>
}