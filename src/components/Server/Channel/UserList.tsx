import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai'
import { lastSeenServerAtom } from '../../../atoms'
import supabaseClient from '../../../supabaseClient';
import { ServerUser } from '../../../types/ServerUser';
import MemberDisplay from './MemberDisplay';

const UserList = () => {
  const server = useAtomValue(lastSeenServerAtom);

  const { data: serverUsers } = useQuery([server?.id, 'server-users'], async () => {
    const { data } = await supabaseClient
      .from<ServerUser>("ServerUser")
      .select("server_id, user_id, User( username, user_image )")
      .eq("server_id", server?.id);

    return data;
  }, {
    enabled: !!server
  });

  console.log(serverUsers);

  return (
    <div className="flex flex-col gap-2">
      {
        serverUsers && serverUsers.length > 0 && serverUsers.map(x => {
          if (!x.User) return;
          return (
            <MemberDisplay key={x.user_id} username={x.User!.username} userImage={x.User!.user_image} />
          )
        })
      }

    </div>
  )
}

export default UserList