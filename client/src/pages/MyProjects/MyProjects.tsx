import { useEffect, useState } from "react"
import { NewProjectModal } from "../../components/modal/NewProjectModal"
import { LoadingSpin } from "../../components/LoadingSpin";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function MyToDoLists() {

    const axiosPrivate = useAxiosPrivate()

    const [isLoadingProjects, setIsLoadingProjects] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [projectsList, setProjectsList] = useState([])

    const handleFormOpen = () => {
        if (!isFormOpen) setIsFormOpen(true)
    }

    const handleFormClose = () => {
        if (isFormOpen) setIsFormOpen(false)
    }

    const fetchProjects = async () => {
        setIsLoadingProjects(true)
        const controller = new AbortController();
        const response = await axiosPrivate.get(`/api/project`, {
            signal: controller.signal
        })
        if (response.status === 201) {
            setProjectsList(response.data)
        }
        setIsLoadingProjects(false)
    }

    const handleDeleteProject = async (title: string) => {
        const controller = new AbortController();
        const response = await axiosPrivate.delete(
            `/api/user/my-projects/${title.split(" ").join("-")}`,
            {
                signal: controller.signal
            }
        )
        if (response.status === 201) {
            fetchProjects()
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return <section
        className="h-full flex flex-col p-16"
    >
        <section
            className="flex gap-4 border-b border-b-gray-700 pb-8"
        >
            <input />
            <button
                type="button"
                className="rounded-2xl bg-green-700 hover:bg-green-600 text-primary-text text-[1.4rem] font-bold p-2 pl-4 pr-4 flex items-center justify-center"
                onClick={handleFormOpen}
            >
                New List
            </button>
        </section>
        <section className="flex-grow flex">
            {
                isLoadingProjects
                    ? <div
                        className="w-full flex-grow flex items-center justify-center text-primary-text"
                    >
                        <LoadingSpin />
                    </div>
                    : <ul
                        className="w-full"
                    >
                        {
                            projectsList.map((project: any, index: number) =>
                                <li
                                    key={index}
                                    className="flex justify-between items-center text-primary-text border-b border-b-gray-700 p-8 pl-0 pr-0"
                                >
                                    <div>
                                        <p>
                                            <Link
                                                to={`${project.route_id}`}
                                                className="hover:underline"
                                            >
                                                {project.title}
                                            </Link>
                                        </p>
                                        <p className="text-secondary-text">{project.description}</p>
                                    </div>
                                    <div
                                        className="flex justify-center items-center p-8 "
                                    >
                                        <button
                                            onClick={() => handleDeleteProject(project.title)}
                                            className="rounded-lg p-4 border border-red-600 text-red-600 hover:text-card hover:bg-red-600"
                                        >
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
            }
        </section>
        {
            isFormOpen &&
            <NewProjectModal
                isOpen={isFormOpen}
                hasCloseBtn={true}
                onClose={handleFormClose}
                onSucess={fetchProjects}
            />
        }
    </section>
}