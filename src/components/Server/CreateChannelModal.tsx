import { HashtagIcon } from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { queryClient } from '../../App';
import supabaseClient from '../../supabaseClient';
import DarkModal from '../DarkModal';
import { Channel } from '../../types/Channel';
import { useAtomValue } from 'jotai';
import { useContext } from 'react';
import { lastSeenServerAtom } from '../../atoms';
import { AuthContext } from '../../Auth/AuthProvider';

interface CreateChannelModalProps {
    open: boolean;
    onClose: () => void;
}

type ChannelType = "text" | "voice";

interface CreateChannelInputFormProps {
    type: ChannelType;
    name: string;
}

const CreateChannelModal = ({ open, onClose }: CreateChannelModalProps) => {
    const user = useContext(AuthContext);
    const currentServer = useAtomValue(lastSeenServerAtom);
    const {
        register,
        handleSubmit,
        formState: { isValid },
        getValues
    } = useForm<CreateChannelInputFormProps>({
        defaultValues: {
            type: 'text'
        }
    });
    const getTypeField = getValues('type');

    const { mutate, isLoading } = useMutation(
        async ({ name }: CreateChannelInputFormProps) => {
            await supabaseClient
                .from<Channel>('Channel')
                .insert([{ name, server_id: currentServer?.id, user_id: user?.id }]);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['server:channels']);
                onClose();
            },
        }
    );

    const onSubmit = (data: CreateChannelInputFormProps) => {
        mutate(data);
    };

    return (
        <>
            <DarkModal
                open={open}
                onClose={onClose}
                headerTitle="Create Channel"
                buttons={(
                    <>
                        <button
                            type="button"
                            disabled={isLoading || !isValid}
                            onClick={handleSubmit(onSubmit)}
                            className="inline-flex justify-center rounded-sm border border-transparent bg-indigo-400 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm font-medium text-white"
                        >
                            Create Channel
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mt-6">
                        <label className='text-xs text-gray-400 font-semibold mb-2'>CHANNEL TYPE</label>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor={`field-text-type`} className={`flex flex-row w-full cursor-pointer ${getTypeField === 'text' ? 'bg-[#464951]' : 'bg-[#2e3136]'} hover:bg-[#464951] p-2`} >
                                <div className="flex-grow flex flex-row space-x-3">
                                    <HashtagIcon className='w-5 h-5 text-bold text-gray-400 self-center ml-1' />
                                    <div className="flex flex-col ml-1 space-y-1">
                                        <span className='text-gray-300'>Text</span>
                                        <span className='text-gray-400 text-xs'>Send messages, images, GIFs, emoji, opinions and puns</span>
                                    </div>
                                </div>
                                <input
                                    {...register("type")}
                                    type="radio"
                                    value={'text'}
                                    className='bg-transparent checked:bg-white dark-radio'
                                    id={`field-text-type`} /></label>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor='name' className='text-xs text-gray-400 font-semibold'>CHANNEL NAME</label>
                        <div className="flex flex-row bg-secondary rounded-sm mt-1">
                            <HashtagIcon className='w-4 h-4 text-white self-center ml-2 text-bold' />
                            <div className='flex flex-col flex-grow'>
                                <input
                                    {...register("name", { required: true })}
                                    className={`block w-full py-2 px-1 resize-none bg-transparent caret-white text-white text-md focus:outline-none`}
                                    placeholder="new-channel"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </DarkModal>
        </>
    )
}

export default CreateChannelModal