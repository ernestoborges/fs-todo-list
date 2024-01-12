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
        className="bg-back w-full h-full flex items-center justify-center text-indigo-950"
    >
        <article
            className="bg-[#D5FFE4] border-4 border-purple-darker rounded-2xl	 shadow-[10px_10px_0_0_rgba(78,64,160,0.75)]"
        >
            {children}
        </article>
    </main>
}