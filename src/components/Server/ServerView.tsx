import React, { useContext, useEffect, useMemo } from 'react'
import { ChannelList } from './ChannelList';
import Account from './Account';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabaseClient from '../../supabaseClient';
import { useAtom } from 'jotai';
import { lastSeenServerAtom } from '../../atoms';
import ServerHeader from './ServerHeader';
import { AuthContext } from '../../Auth/AuthProvider';
import { ServerUser } from '../../types/ServerUser';
import { queryClient } from '../../App';

const ServerView = () => {
    const user = useContext(AuthContext);
    const { server } = useParams();
    const navigate = useNavigate();
    const [currentServer, setCurrentServer] = useAtom(lastSeenServerAtom);
    const { data: dbServer } = useQuery([server, 'server-full'], async () => {
        const { data, status } = await supabaseClient
            .from<ServerUser>("ServerUser")
            .select("id, Server ( id, name, user_id, has_image )")
            .eq("server_id", server!).single();

        if (status !== 200) {
            navigate('/server-not-found');
            return;
        }

        return data?.Server;
    });

    const isUserServerAdmin = useMemo(() => user?.id === currentServer?.user_id, [user?.id, currentServer?.user_id]);

    useEffect(() => {
        if ((!currentServer && dbServer) || (dbServer && dbServer.id !== currentServer?.id))
            setCurrentServer(dbServer);
        queryClient.invalidateQueries(['server:channels']);
    }, [dbServer, currentServer]);

    return (
        <>
            <div className="flex flex-col relative flex-shrink-0 w-60 h-screen overflow-y-auto bg-secondary">
                <div className="flex flex-col">
                    <ServerHeader name={currentServer?.name} currentUserIsServerAdmin={isUserServerAdmin} />
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