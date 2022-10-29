import { Dialog, Transition } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Fragment, useContext } from 'react'
import { queryClient } from '../../App';
import { lastSeenServerAtom } from '../../atoms';
import { AuthContext } from '../../Auth/AuthProvider';
import supabaseClient from '../../supabaseClient';
import { ServerUser } from '../../types/ServerUser';
import DarkModal from '../DarkModal';

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
            <DarkModal
                open={open}
                onClose={onClose}
                headerTitle={`Leave '${currentServer?.name}'`}
                buttons={(
                    <>
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
                    </>
                )}
            >
                <p className="text-sm text-white">
                    Are you sure you want to leave {currentServer?.name}? You won't be able to rejoin this server unless you are reinvited.
                </p>
            </DarkModal>
        </>
    )
}

export default LeaveServerModal;
