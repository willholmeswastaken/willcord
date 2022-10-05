import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import supabaseClient from "../../../supabaseClient";
import MemberDisplay from "../../User/MemberDisplay";
import Feed from "../Feed";
import ChannelTitle from "./ChannelTitle";

const Channel = () => {
    let { server, channel } = useParams();

    const { data } = useQuery([server, channel], async () => {
        const { data } = await supabaseClient
            .from("Message")
            .select("*")
            .eq("id", channel!);

        return data;
    });

    console.log({ data });

    return (
        <div className="bg-gray-700 w-full h-screen flex flex-col">
            <ChannelTitle />
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 px-4">
                    <Feed />
                </div>
                <div className="w-48 bg-gray-800 py-6 px-4">
                    <div className="flex flex-col gap-2">
                        <MemberDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Channel;
