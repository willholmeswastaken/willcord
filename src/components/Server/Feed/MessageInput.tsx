import React from 'react'
import { useForm } from "react-hook-form";
import { PaperClipIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useAtom } from 'jotai';
import { lastSeenChannelAtom } from '../../../atoms';

interface MessageInputProps {
    onSubmit(e: any): void;
}

export interface MessageInputFormValues {
    message: string;
}

const MessageInput = ({
    onSubmit
}: MessageInputProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MessageInputFormValues>();
    const [currentChannel] = useAtom(lastSeenChannelAtom);

    function onMessageSubmit(e: React.KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
            reset();
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="flex rounded-lg shadow-sm overflow-hidden bg-[#40444b]">
                <div className="bg-[#40444b] flex items-center justify-center pl-4">
                    <button
                        type="button"
                        className="-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                    >
                        <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Attach a file</span>
                    </button>
                </div>

                <label htmlFor="message" className="sr-only">
                    Message #{currentChannel?.name}
                </label>
                <textarea
                    {...register("message")}
                    rows={1}
                    onKeyDown={onMessageSubmit}
                    className="block w-full py-3 px-4 resize-none bg-[#40444b] caret-white text-white focus:outline-none"
                    placeholder={`Message #${currentChannel?.name}`}
                    defaultValue={""}
                />

                <div className="flex items-center justify-center pr-4">
                    <button
                        type="button"
                        className="-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                    >
                        <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Attach a file</span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MessageInput