import { offset, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { useMemo } from "react";
import { AvatarWithStatus } from "../../User/AvatarWithStatus";
import UserPopout from "./UserPopout";

interface UserItemProps {
  username: string;
  roles?: Array<string>;
  userImage: string;
  isUserServerCreator: boolean;
}

const UserItem = ({ username, userImage, roles, isUserServerCreator }: UserItemProps) => {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "left-start",
    strategy: "fixed",
    middleware: [offset(24), shift()],
  });

  const displayName = useMemo(() => {
    const substringedName = username.substring(0, 11);
    return username.length > 11 ? `${substringedName}...` : substringedName;
  }, [username]);

  return (
    <Popover>
      <Popover.Button ref={reference}>
        <div className="flex items-center gap-2 relative">
          <div className="text-gray-700 flex-shrink-0">
            <AvatarWithStatus userImage={userImage} />
          </div>
          <div className="text-[#C20D90] font-semibold">
            <span>{displayName}</span>
          </div>
          {isUserServerCreator && (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 512 512">
              <path className="fill-[#ffc033]" d="M461.913 456.348H50.087c-9.223 0-16.696-7.473-16.696-16.696V372.87c0-9.223 7.473-16.696 16.696-16.696h411.826c9.223 0 16.696 7.473 16.696 16.696v66.783c0 9.222-7.473 16.695-16.696 16.695z" />
              <path className="fill-[#ffe14d]" d="M478.609 389.565H33.391V72.348c0-6.957 4.31-13.185 10.821-15.63 6.527-2.424 13.859-.598 18.44 4.636l102.511 117.152 76.946-115.418c6.608-9.913 21.175-9.913 27.783 0l76.946 115.418L449.349 61.353c4.587-5.234 11.935-7.06 18.44-4.636a16.694 16.694 0 0 1 10.82 15.63v317.218z" />
              <path className="fill-[#f37b2a]" d="M256 322.783c-27.619 0-50.087-22.468-50.087-50.087s22.468-50.087 50.087-50.087 50.087 22.468 50.087 50.087-22.468 50.087-50.087 50.087zm-205.913 0C22.468 322.783 0 300.315 0 272.696s22.468-50.087 50.087-50.087 50.087 22.468 50.087 50.087-22.468 50.087-50.087 50.087z" />
              <path className="fill-[#f9a926]" d="M461.913 356.174H256v100.174h205.913c9.223 0 16.696-7.473 16.696-16.696V372.87c0-9.223-7.473-16.696-16.696-16.696z" />
              <path className="fill-[#fc3]" d="M478.609 389.565V72.348c0-6.957-4.31-13.185-10.821-15.63-6.506-2.424-13.853-.598-18.44 4.636L346.837 178.505 269.891 63.087c-3.304-4.957-8.597-7.435-13.891-7.435v333.913h222.609z" />
              <path className="fill-[#e56722]" d="M306.087 272.696c0-27.619-22.468-50.087-50.087-50.087v100.174c27.619 0 50.087-22.468 50.087-50.087zm155.826 50.087c-27.619 0-50.087-22.468-50.087-50.087s22.468-50.087 50.087-50.087S512 245.077 512 272.696s-22.468 50.087-50.087 50.087z" />
            </svg>

          )}
        </div>
      </Popover.Button>

      <Popover.Panel
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
      >
        <UserPopout username={username} userImage={userImage} roles={roles} />
      </Popover.Panel>
    </Popover>
  );
}

export default UserItem
