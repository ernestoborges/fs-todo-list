import { useState } from "react"
import { Modal } from "./Modal"
import { useForm } from "react-hook-form"
import { LoadingSpin } from "../LoadingSpin"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"

export function NewProjectModal({
    isOpen,
    hasCloseBtn,
    onClose,
    onSucess
}: {
    isOpen: boolean
    hasCloseBtn: boolean
    onClose?: () => any
    onSucess?: () => any
}) {

    const axiosPrivate = useAxiosPrivate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        const { title, description } = data

        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post(
                '/api/project',
                {
                    title,
                    description
                },
                {
                    signal: controller.signal
                }
            );
            if (response.status === 201) {
                if (onClose) onClose()
                if (onSucess) onSucess()
            } else {
                setMessage(response.data.message)
            }
            setIsLoading(false);
        } catch (error: any) {
            setMessage(error.response.data.message);
            setIsLoading(false);
        }
    };

    return <Modal
        isOpen={isOpen}
        title="New Project"
        hasCloseBtn={hasCloseBtn}
        onClose={onClose}
    >
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-16 text-primary-text"
        >
            <div
                className="flex flex-col gap-4"
            >
                <label
                    className="flex flex-col"
                >
                    <div className={`flex gap-4 items-center ${errors.title ? "text-red-500" : ""}`}>
                        <span>Title</span>
                        {errors.title && <span className="italic font-thin text-lg normal-case text-red-500"> is required</span>}
                    </div>
                    <input
                        className="cc-input text-black"
                        type="text"
                        {...register('title', { required: true })}
                    />
                </label>
                <label
                    className="flex flex-col"
                >
                    <span>Description</span>
                    <input
                        className="cc-input text-black"
                        type="text"
                        {...register('description', { required: false })}
                    />
                </label>
            </div>
            {
                message &&
                <div className="text-red-500 flex justify-center items-center">
                    <span>{message}</span>
                </div>
            }
            <div
                className="flex justify-end gap-4"
            >
                <button
                    type="button"
                    onClick={() => onClose && onClose()}
                    className="w-[10rem] rounded-lg bg-gray-700 hover:bg-gray-600 text-primary-text text-[1.6rem] p-2 flex items-center justify-center"
                >
                    cancel
                </button>
                <button
                    type="submit"
                    className="w-[10rem] rounded-lg bg-green-700 hover:bg-green-600 text-primary-text text-[1.6rem] p-2 flex items-center justify-center"
                >
                    {
                        isLoading
                            ? <LoadingSpin />
                            : "Create"
                    }
                </button>
            </div>
        </form>
    </Modal >
}