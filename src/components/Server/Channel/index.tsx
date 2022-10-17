import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import supabaseClient from "../../../supabaseClient";
import Feed from "../Feed";
import ChannelTitle from "./ChannelTitle";
import { lastSeenChannelAtom } from "../../../atoms";
import { Channel } from '../../../types/Channel';
import { useAtom } from "jotai";
import { useEffect } from "react";
import UserList from "./UserList";

const ChannelDisplay = () => {
    const { channel } = useParams();
    const [currentChannel, setCurrentChannel] = useAtom(lastSeenChannelAtom);

    const { data: dbChannel } = useQuery([channel, 'channel-full'], async () => {
        const { data } = await supabaseClient
            .from<Channel>("Channel")
            .select("*")
            .eq("id", channel!).single();

        return data;
    });

    useEffect(() => {
        if (dbChannel && dbChannel.id !== currentChannel?.id)
            setCurrentChannel(dbChannel);
    }, [dbChannel, currentChannel]);

    return (
        <div className="bg-tertiary w-full h-screen flex flex-col">
            <ChannelTitle title={currentChannel?.name} />
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 px-4">
                    <Feed />
                </div>
                <div className="w-56 bg-secondary py-6 px-4">
                    <UserList />
                </div>
            </div>
        </div>
    );
}

export default ChannelDisplay;
