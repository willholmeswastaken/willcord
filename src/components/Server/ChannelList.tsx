import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { lastSeenChannelAtom } from "../../atoms";
import supabaseClient from "../../supabaseClient";
import { Channel } from "../../types/Channel";

export function ChannelList() {
    let { server, channel } = useParams();
    const navigate = useNavigate();
    const setLastSeenChannelAtom = useSetAtom(lastSeenChannelAtom);

    const { data } = useQuery(['server:channels'], async () => {
        const { data } = await supabaseClient
            .from<Channel>("Channel")
            .select("*")
            .eq("server_id", server!);
        return data;
    });

    useEffect(() => {
        if (!channel && data && data.length > 0) {
            navigate(`/${server}/${data[0].id}`);
        }
    }, [channel, data]);

    return (
        <div className="flex flex-col gap-1 w-full px-2 mt-1">
            {data?.map((channel) => (
                <NavLink
                    onClick={() => setLastSeenChannelAtom(channel)}
                    key={channel.id}
                    to={`/${server}/${channel.id}`}
                    className={({ isActive }) =>
                        clsx(
                            "text-gray-200 w-full hover:bg-gray-600 px-2 py-1 rounded-md",
                            isActive && "bg-gray-500"
                        )
                    }
                >
                    # {channel.name}
                </NavLink>
            ))}
        </div>
    );
}