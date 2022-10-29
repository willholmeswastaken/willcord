import { useForm } from 'react-hook-form';
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

const CreateChannelModal = ({ open, onClose }: CreateChannelModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateChannelInputFormProps>();
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
                            className="inline-flex justify-center rounded-sm border border-transparent bg-indigo-400 hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
                            disabled={errors !== null}
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
                    {/* todo: code channel type selector */}
                    <label htmlFor='name' className='text-xs text-gray-400 font-semibold'>CHANNEL NAME</label>
                    <textarea
                        {...register("name", { required: true })}
                        rows={1}
                        className={`block w-full py-2 px-4 resize-none bg-secondary rounded-sm caret-gray-700 text-gray-700 text-md focus:outline-none ${errors.name && 'border-2 border-red-600'}`}
                        placeholder="new-channel"
                    />
                    {errors.name && <span className="text-red-600 text-xs">You must enter a name for your channel</span>}
                </form>
            </DarkModal>
        </>
    )
}

export default CreateChannelModal