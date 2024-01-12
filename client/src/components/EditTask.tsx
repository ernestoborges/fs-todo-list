import { useForm } from "react-hook-form";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

export function EditTask({
    task,
    handleOpenTask,
    refreshData
}: {
    task: any,
    handleOpenTask: (task: number | null) => void
    refreshData: () => void
}) {

    const { routeId } = useParams()
    const { register, handleSubmit } = useForm();
    const axiosPrivate = useAxiosPrivate();

    const onSubmit = async (data: any) => {
        const { title, description, status } = data

        const controller = new AbortController();
        try {
            const response = await axiosPrivate.patch(
                `/api/project/${routeId}/${task.id}`,
                {
                    title,
                    description,
                    status
                },
                {
                    signal: controller.signal
                }
            );
            if (response.status === 201) {
                refreshData()
            }
        } catch (error: any) {
        }
    };

    return <div
        className="w-full rounded-lg border border-gray-700 p-4"
    >
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <div
                className="flex flex-col gap-2"
            >
                <input
                    className="bg-transparent text-primary-text p-2"
                    type="text"
                    defaultValue={task.title}
                    {...register('title', { required: true })}
                />
                <input
                    className="bg-transparent text-secondary-text p-2"
                    type="text"
                    defaultValue={task.description}
                    {...register('description', { required: true })}
                />
            </div>
            <div
                className="flex justify-end gap-4"
            >
                <div
                    className="flex-grow flex gap-4"
                >
                    <label
                        className="flex gap-2 items-center cursor-pointer"
                    >
                        <input
                            type="radio"
                            value="todo"
                            defaultChecked={task.status === 'todo'}
                            {...register('status')}
                        />
                        To do
                    </label>
                    <label
                        className="flex gap-2 items-center cursor-pointer"
                    >
                        <input
                            type="radio"
                            value="doing"
                            defaultChecked={task.status === 'doing'}
                            {...register('status')}
                        />
                        Doing
                    </label>
                    <label
                        className="flex gap-2 items-center cursor-pointer"
                    >
                        <input
                            type="radio"
                            value="done"
                            defaultChecked={task.status === 'done'}
                            {...register('status')}
                        />
                        Done
                    </label>
                </div>
                <button
                    type="button"
                    className="rounded-lg w-[10rem] bg-gray-700 hover:bg-gray-600 p-2"
                    onClick={() => handleOpenTask(null)}
                >
                    cancel
                </button>
                <button
                    className="rounded-lg w-[10rem] bg-green-700 hover:bg-green-600 p-2"
                >
                    confirm
                </button>
            </div>
        </form>
    </div>
}