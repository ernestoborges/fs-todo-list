export function StatusTag({
    status
}: {
    status: "todo" | "doing" | "done"
}) {
    switch (status) {
        case "todo": return <div className="flex justify-center w-[5rem] rounded-full text-[1.2rem] p-4 pt-2 pb-2 bg-gray-600">to do</div>
        case "doing": return <div className="flex justify-center w-[5rem] rounded-full text-[1.2rem] p-4 pt-2 pb-2 bg-yellow-600">doing</div>
        case "done": return <div className="flex justify-center w-[5rem] rounded-full text-[1.2rem] p-4 pt-2 pb-2 bg-green-600">done</div>
    }
}