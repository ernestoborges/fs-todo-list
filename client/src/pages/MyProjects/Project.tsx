import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { LoadingSpin } from "../../components/LoadingSpin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NewTaskModal } from "../../components/modal/NewTaskModal";
import { Task } from "../../components/Task";
import { EditTask } from "../../components/EditTask";

export function ToDoList() {

    const { routeId } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const [project, setProject] = useState<any>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [openedTask, setOpenedTask] = useState<number | null>(null);

    const handleFormOpen = () => {
        if (!isFormOpen) setIsFormOpen(true)
    }

    const handleFormClose = () => {
        if (isFormOpen) setIsFormOpen(false)
    }

    const handleOpenTask = (task: number | null) => {
        setOpenedTask(task)
    }

    const fetchData = async () => {
        // setIsLoadingProjects(true)
        const controller = new AbortController();
        const response = await axiosPrivate.get(`/api/project/${routeId}`, {
            signal: controller.signal
        })
        if (response.status === 200) {
            setProject(response.data)
            setOpenedTask(null)
        }
        // setIsLoadingProjects(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <section
        className="h-full flex flex-col"
    >
        <div
            className="p-10 border-b border-b-gray-700 flex"
        >
            <Link
                to=".."
                className="text-primary-text flex items-center gap-4 border-b border-transparent hover:border-b-primary-text"
            >
                <FaArrowLeftLong />
                back
            </Link>

        </div>
        {
            !project
                ? <LoadingSpin />
                : <div
                    className="p-10 flex justify-center text-primary-text"
                >
                    <article
                        className="max-w-[70rem] w-full flex flex-col "
                    >
                        <header>
                            <h2 className="text-5xl">{project.title}</h2>
                            <h3 className="text-secondary-text">{project.description}</h3>
                        </header>
                        <section>
                            <ul
                                className="flex flex-col"
                            >
                                {
                                    project.tasks.map((task: any, index: number) =>
                                        <li
                                            key={index}
                                            className="border-b cursor-pointer border-gray-600 p-2 pl-0 pr-0 flex flex-col justify-between items-start"
                                        >
                                            {
                                                openedTask === index
                                                    ? <EditTask task={task} handleOpenTask={handleOpenTask} refreshData={fetchData} />
                                                    : <Task index={index} task={task} handleOpenTask={handleOpenTask} />
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                            <button
                                className="p-2 pl-0 pr-0 hover:underline"
                                onClick={handleFormOpen}
                            >
                                + add task
                            </button>
                        </section>
                    </article>

                </div>
        }
        {
            isFormOpen &&
            <NewTaskModal
                isOpen={isFormOpen}
                hasCloseBtn={true}
                onClose={handleFormClose}
                onSucess={fetchData}
                routeId={routeId!}
            />
        }
    </section>
}