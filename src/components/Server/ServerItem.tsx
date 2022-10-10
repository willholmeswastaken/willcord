import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';
import { lastSeenServerAtom } from '../../atoms';
import { Server } from '../../types/Server'

interface ServerItemProps {
    server: Server;
}

const ServerItem = ({ server }: ServerItemProps) => {
    const currentServer = useAtomValue(lastSeenServerAtom);
    const isServerCurrent = useMemo(() => currentServer?.id === server.id, [currentServer, server]);

    const onServerHover = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (isServerCurrent) return;
        event.currentTarget.children[0].classList.add('bg-white');
    };

    const onServerHoverGone = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (isServerCurrent) return;
        event.currentTarget.children[0].classList.remove('bg-white');
    };

    return (
        <div className='flex flex-row' onMouseOver={onServerHover} onMouseOut={onServerHoverGone}>
            <div className={`h-8 w-1 mt-2 mr-2 rounded-xl hover:bg-white ${isServerCurrent ? 'bg-white animate-bounce' : ''} duration-500 transition-colors`}></div>
            <Link
                key={server.id}
                to={`/${server.id}`}
                className="w-12 h-12 rounded-[24px] transition-all hover:rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            ></Link>
        </div>
    )
}

export default ServerItem