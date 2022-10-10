import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import supabaseClient from '../supabaseClient'
import { Server } from '../types/Server';
import ServerItem from './Server/ServerItem';

const ServerList = () => {
    const { data: servers } = useQuery(['servers'], async () => {
        const { data } = await supabaseClient.from<Server>('Server').select('*');
        return data;
    });

    return (
        <div className='flex flex-col flex-shrink-0 items-center gap-4 py-4 h-screen overflow-y-auto bg-primary'>
            <Link to='/' className='w-12 h-12 rounded-[24px] transition-all hover:rounded-xl bg-indigo-400' />
            <div className="flex flex-col gap-4 bg-primary rounded-full pr-2">
                {servers?.map(server => (
                    <ServerItem server={server} />
                ))}
            </div>
        </div>
    )
}

export default ServerList