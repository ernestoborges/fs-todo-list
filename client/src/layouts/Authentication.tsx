export function AuthenticationLayout({
    children
}: {
    children: React.ReactNode
}) {

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