import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai'
import { lastSeenServerAtom } from '../../../atoms'
import supabaseClient from '../../../supabaseClient';
import { ServerUser } from '../../../types/ServerUser';
import UserItem from './UserItem';

const UserList = () => {
  const server = useAtomValue(lastSeenServerAtom);

  const { data: serverUsers } = useQuery([server?.id, 'server-users'], async () => {
    const { data } = await supabaseClient
      .from<ServerUser>("ServerUser")
      .select("server_id, user_id, roles, User( username, user_image ), Server ( user_id )")
      .eq("server_id", server?.id);

    return data;
  }, {
    enabled: !!server
  });

  // todo: add grouping as well as crown icon for server creator

  return (
    <div className="flex flex-col gap-2">
      <span className='text-xs text-gray-400 font-semibold'>USERS - {serverUsers?.length ?? 0}</span>
      {
        serverUsers && serverUsers.length > 0 && serverUsers.map(x => {
          if (!x.User) return;
          const isUserServerCreator = x.user_id === x.Server?.user_id;
          return (
            <UserItem key={x.user_id} username={x.User!.username} userImage={x.User!.user_image} roles={x.roles} isUserServerCreator={isUserServerCreator} />
          )
        })
      }

    </div>
  )
}

export default UserList