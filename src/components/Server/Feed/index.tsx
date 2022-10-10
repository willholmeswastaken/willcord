import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { queryClient } from '../../../App';
import { AuthContext } from '../../../Auth/AuthProvider';
import supabaseClient from '../../../supabaseClient';
import { Message } from '../../../types/Message';
import MessageRow from '../MessageRow';
import MessageInput, { MessageInputFormValues } from './MessageInput';

const Feed = () => {
    const { channel } = useParams();
    const user = useContext(AuthContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { data: messages } = useQuery([channel, "messages"], async () => {
        const { data, error } = await supabaseClient
            .from<Message>("Message")
            .select("*")
            .eq("channel_id", channel!);
        return data;
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    const sendMessageMutation = useMutation(
        async (message: string) => {
            const { data, error } = await supabaseClient
                .from("Message")
                .insert([{ content: message, channel_id: channel, user_id: user?.id, user_image: user?.user_metadata?.picture, username: user?.user_metadata?.full_name }]);
            return data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries([channel, "messages"]),
        }
    );

    const onSubmit = (data: MessageInputFormValues) => {
        sendMessageMutation.mutate(data.message);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden pb-4">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4 pr-4">
                {messages?.map((message) => (
                    <MessageRow username={message.username} content={message.content} sentAt={message.created_at} userImage={message.user_image} key={message.id} />
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <MessageInput onSubmit={onSubmit} />
        </div>
    );
}

export default Feed