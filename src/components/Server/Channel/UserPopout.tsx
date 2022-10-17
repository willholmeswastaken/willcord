import Badge from "../../Badge";
import { AvatarWithStatus } from "../../User/AvatarWithStatus";

interface UserPopoutProps {
    username: string;
    roles?: Array<string>;
    userImage: string;
}

const UserPopout = ({ username, roles, userImage }: UserPopoutProps) => (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-900 shadow-lg p-4 overflow-hidden w-72">
        <div className="bg-indigo-400 h-11 absolute inset-0 rounded-t-lg" />
        <AvatarWithStatus size={72} userImage={userImage} />
        <div className="font-semibold text-white">{username}</div>
        <div className="font-bold text-gray-600 text-sm">ROLES</div>
        <div className="flex flex-wrap gap-1">
            {
                roles && roles.map((role) => (
                    <Badge text={role} />
                ))
            }
        </div>
    </div>
);

export default UserPopout
