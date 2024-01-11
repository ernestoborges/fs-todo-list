import { FiEdit3 } from "react-icons/fi"
import { StatusTag } from "./StatusTag"

export function Task({
    task,
    index,
    handleOpenTask
}: {
    task: any,
    index: number,
    handleOpenTask: (task: number | null) => void
}) {
    return <div className="w-full flex justify-between task-item">
        <div>
            <span>
                {task.title}
            </span>
        </div>
        <div
            className="flex items-center justify-between gap-8"
        >
            <div className="items-center task-detail-hidden">
                <button
                    className="rounded-lg p-2 hover:bg-white hover:text-card"
                    onClick={() => handleOpenTask(index)}
                >
                    <FiEdit3 />
                </button>
            </div>
            <StatusTag status={task.status} />
        </div>
    </div>
}