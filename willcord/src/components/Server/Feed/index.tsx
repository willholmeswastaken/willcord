import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { queryClient } from '../../../App';
import { AuthContext } from '../../../Auth/AuthProvider';
import supabaseClient from '../../../supabaseClient';
import { Message } from '../../../types/Message';
import MessageRow from '../MessageRow';
import MessageInput from './MessageInput';

const Feed = () => {
    const { channel } = useParams();
    const user = useContext(AuthContext);

    const { data } = useQuery([channel, "messages"], async () => {
        const { data, error } = await supabaseClient
            .from<Message>("Message")
            .select("*")
            .eq("channel_id", channel!);
        return data;
    });

    const mutation = useMutation(
        async (message: string) => {
            const { data, error } = await supabaseClient
                .from("Message")
                .insert([{ content: message, channel_id: channel, user_id: user?.id }]);
            return data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries([channel, "messages"]),
        }
    );

    function onSubmit(data: any) {
        mutation.mutate(data.message);
        // console.log(data);
        // setFeed((prevFeed) => [...prevFeed, data.message]);
    }

    return (
        <div className="flex flex-col h-full overflow-hidden pb-4">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 my-4 pr-4">
                {data?.map((message) => (
                    <MessageRow text={message.content} key={message.id} />
                ))}
            </div>
            <MessageInput onSubmit={onSubmit} />
        </div>
    );
}

export default Feed