import { RadioGroup } from '@headlessui/react';
import { CheckIcon, HashtagIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useForm, Controller } from 'react-hook-form';
import DarkModal from '../DarkModal';

interface CreateChannelModalProps {
    open: boolean;
    onClose: () => void;
}

type ChannelType = "text" | "voice";

interface CreateChannelInputFormProps {
    type: ChannelType | undefined;
    name: string;
}

interface ChannelTypeOption {
    icon: React.ReactNode;
    title: string;
    desc: string;
    type: ChannelType
}

const channelTypes: Array<ChannelTypeOption> = [
    {
        icon: <HashtagIcon className='w-5 h-5 text-bold text-gray-400 self-center ml-1' />,
        title: 'Text',
        desc: 'Send messages, images, GIFs, emoji, opinions and puns',
        type: 'text'
    },
    {
        icon: <SpeakerWaveIcon className='w-5 h-5 text-bold text-gray-400 self-center ml-1' />,
        title: 'Voice',
        desc: 'Hang out together with voice, video and screen share',
        type: 'voice'
    }
];

const CreateChannelModal = ({ open, onClose }: CreateChannelModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isValid },
    } = useForm<CreateChannelInputFormProps>();

    const onSubmit = (data: CreateChannelInputFormProps) => console.log(data);
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
                            disabled={!isValid}
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
                <form>
                    <div className="flex flex-col mt-6">
                        <label className='text-xs text-gray-400 font-semibold mb-2'>CHANNEL TYPE</label>
                        <div className="flex flex-col space-y-2">
                            {
                                channelTypes.map(x => (
                                    <label key={x.title} htmlFor={`field-${x.type}-type`} className='flex flex-row w-full cursor-pointer bg-secondary hover:bg-primary p-2' >
                                        <div className="flex-grow flex flex-row space-x-3">
                                            {x.icon}
                                            <div className="flex flex-col ml-1 space-y-1">
                                                <span className='text-gray-300'>{x.title}</span>
                                                <span className='text-gray-400 text-xs'>{x.desc}</span>
                                            </div>
                                        </div>
                                        <input
                                            {...register("type", { required: true })}
                                            type="radio"
                                            value={x.type}
                                            className='bg-transparent checked:bg-white dark-radio'
                                            id={`field-${x.type}-type`} /></label>
                                ))
                            }

                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor='name' className='text-xs text-gray-400 font-semibold'>CHANNEL NAME</label>
                        <div className="flex flex-row bg-secondary rounded-sm mt-1">
                            <HashtagIcon className='w-4 h-4 text-white self-center ml-2 text-bold' />
                            <div className='flex flex-col flex-grow'>
                                <textarea
                                    {...register("name", { required: true })}
                                    rows={1}
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