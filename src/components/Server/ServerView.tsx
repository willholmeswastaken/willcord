import React, { useEffect } from 'react'
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChannelList } from './ChannelList';
import Account from './Account';
import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabaseClient from '../../supabaseClient';
import { Server } from '../../types/Server';
import { useAtom } from 'jotai';
import { lastSeenServerAtom } from '../../atoms';
import ServerHeader from './ServerHeader';

const ServerView = () => {
    const { server } = useParams();
    const [currentServer, setCurrentServer] = useAtom(lastSeenServerAtom);
    const { data: dbServer } = useQuery([server, 'server-full'], async () => {
        const { data } = await supabaseClient
            .from<Server>("Server")
            .select("*")
            .eq("id", server!).single();

        return data;
    });

    useEffect(() => {
        if (dbServer && dbServer.id !== currentServer?.id)
            setCurrentServer(dbServer);
    }, [dbServer, currentServer])

    return (
        <>
            <div className="flex flex-col relative flex-shrink-0 w-60 h-screen overflow-y-auto bg-secondary">
                <div className="flex flex-col">
                    <ServerHeader name={currentServer?.name} />
                    <ChannelList />
                </div>

                <div className="flex items-center justify-between absolute w-full bottom-0 bg-primary p-2">
                    <Account />
                </div>
            </div>
            <div className="bg-tertiary w-full h-screen">
                <Outlet />
            </div>
        </>
    )
}

export default ServerView