export function AuthenticationLayout({
    children
}: {
    children: React.ReactNode
}) {

    return <main
        className="bg-[#8BE8E5] w-full h-full flex items-center justify-center text-indigo-950"
    >
        <article
            className="bg-[#D5FFE4] border-4 border-purple-darker rounded-lg shadow-[10px_10px_0_0_rgba(78,64,160,0.75)]"
        >
            {children}
        </article>
    </main>
}