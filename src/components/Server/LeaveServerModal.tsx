import { Dialog, Transition } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Fragment, useContext } from 'react'
import { queryClient } from '../../App';
import { lastSeenServerAtom } from '../../atoms';
import { AuthContext } from '../../Auth/AuthProvider';
import supabaseClient from '../../supabaseClient';
import { ServerUser } from '../../types/ServerUser';

interface LeaveServerModalProps {
    open: boolean;
    onClose: () => void;
}

const LeaveServerModal = ({ open, onClose }: LeaveServerModalProps) => {
    const user = useContext(AuthContext);
    const currentServer = useAtomValue(lastSeenServerAtom);
    const { mutate } = useMutation(
        async () => {
            const { data } = await supabaseClient
                .from<ServerUser>('ServerUser')
                .delete()
                .eq('server_id', currentServer?.id)
                .eq('user_id', user!.id);
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['servers']);
                queryClient.invalidateQueries(['server-full']);
            },
        }
    );

    const onConfirm = () => {
        mutate();
        onClose();
    };

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
                                            Leave '{currentServer?.name}'
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-white">
                                                Are you sure you want to leave {currentServer?.name}? You won't be able to rejoin this server unless you are reinvited.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 bg-secondary">
                                        <div className="p-4 flex flex-row-reverse">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-sm border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
                                                onClick={onConfirm}
                                            >
                                                Leave Server
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-sm border border-transparent mr-2 px-4 py-2 text-sm font-medium text-white"
                                                onClick={onClose}
                                            >
                                                Cancel
                                            </button>
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

export default LeaveServerModal;
