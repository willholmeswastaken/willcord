import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'

interface DarkModalProps {
    headerTitle: string;
    children: React.ReactNode;
    buttons?: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

const DarkModal = ({
    headerTitle,
    children,
    buttons,
    open,
    onClose
}: DarkModalProps) => {
    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-tertiary text-left align-middle shadow-xl transition-all">
                                    <div className="p-6">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-bold leading-6 text-white"
                                        >
                                            {headerTitle}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            {children}
                                        </div>
                                    </div>

                                    <div className="mt-4 bg-secondary">
                                        <div className="p-4 flex flex-row-reverse">
                                            {buttons}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default DarkModal