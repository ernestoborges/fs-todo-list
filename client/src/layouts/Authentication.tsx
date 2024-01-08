import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function AuthenticationLayout({
    children
}: {
    children: React.ReactNode
}) {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/")
    }, [])

    return <main
        className="bg-[#111827] w-full h-full flex items-center justify-center text-indigo-950"
    >
        <article
            className="bg-[#dae5e8] p-14 rounded-lg shadow-md shadow-black"
        >
            {children}
        </article>
    </main>
}