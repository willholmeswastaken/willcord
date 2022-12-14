import { Menu } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import supabaseClient from "../../supabaseClient";
import { AvatarWithStatus } from "../User/AvatarWithStatus";

interface Test {
    active: boolean
}

const Account = () => {
    const user = useContext(AuthContext);
    const username: string = user?.user_metadata?.full_name;

    const signOut = async () => {
        await supabaseClient.auth.signOut();
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <div className="text-gray-800">
                    <AvatarWithStatus userImage={user!.user_metadata.picture} />
                </div>
                <div className="text-white font-semibold text-sm">{username}</div>
            </div>
            <Menu as="div" className="relative flex items-center">
                <Menu.Button className='hover:bg-secondary p-2 rounded-lg'>
                    <Cog8ToothIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </Menu.Button>
                <Menu.Items className="absolute origin-bottom-right right-0 bottom-0 mb-8 w-36 rounded-md bg-black shadow-lg ">
                    <Menu.Item>
                        <button
                            onClick={signOut}
                            className="bg-primary hover:bg-tertiary group flex text-white w-full items-center rounded-md px-2 py-2 text-sm"
                        >
                            Sign Out
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </>
    )
}

export default Account;