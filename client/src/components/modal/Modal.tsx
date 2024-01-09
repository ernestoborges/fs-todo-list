import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

export function Modal({
    isOpen,
    hasCloseBtn,
    onClose,
    title,
    children
}: {
    isOpen: boolean,
    hasCloseBtn: boolean,
    onClose?: () => any,
    title?: string,
    children: React.ReactNode
}
) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen)
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        setIsModalOpen(isOpen)
    }, [isOpen])

    useEffect(() => {
        const modalElement = modalRef.current
        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal()
            } else {
                modalElement.close()
            }
        }
    }, [isModalOpen])

    return (
        <dialog
            ref={modalRef}
            className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] flex items-center justify-center max-w-[100vw] max-h-[100vh]"
        >
            <div
                className="bg-card p-8 flex flex-col gap-8 rounded-2xl text-primary-text"
            >
                {
                    (hasCloseBtn || title) &&
                    <div
                        className="flex justify-end items-center"
                    >
                        {
                            title &&
                            <h2 className="grow">{title}</h2>
                        }
                        {
                            hasCloseBtn &&
                            <button
                                className="flex items-center justify-center text-[3rem] rounded-full hover:bg-[rgba(0,0,0,0.4)] text-primary-text"
                                onClick={handleCloseModal}
                            >
                                <IoIosClose />
                            </button>
                        }
                    </div>
                }
                {children}
            </div>
        </dialog>
    );
}