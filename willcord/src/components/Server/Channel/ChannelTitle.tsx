import { useParams } from "react-router-dom";
import { HashtagIcon, UsersIcon } from "@heroicons/react/24/solid";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import supabaseClient from "../../../supabaseClient";
import { Channel } from "../../../types/Channel";

const ChannelTitle = () => {
    let { channel } = useParams();

    const { data } = useQuery([channel, 'title'], async () => {
        const { data } = await supabaseClient
            .from<Channel>("Channel")
            .select("*")
            .eq("id", channel!).single();

        return data;
    });

    return (
        <div className="flex items-center justify-between py-2 px-3 border-b border-gray-900">
            <div className="flex items-center gap-2">
                <HashtagIcon className="w-6 h-6 text-gray-400" />
                <div className="font-bold text-lg text-white">{data?.name}</div>
            </div>

            <div className="flex items-center gap-4">
                <UsersIcon className="w-6 h-6 text-gray-400" />
                <SearchBar />
            </div>
        </div>
    );
}

export default ChannelTitle;
