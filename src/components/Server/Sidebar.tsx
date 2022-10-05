import React from 'react'
import { ChevronDownIcon, CogIcon } from "@heroicons/react/24/solid";
import { ChannelList } from './ChannelList';
import Account from './Account';
import { Outlet } from 'react-router-dom';

const ServerHeader = () => (
    <button
        type="button"
        className="flex justify-between items-center py-3 px-2"
    >
        <div className="font-bold text-white">Will's Server</div>
        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
    </button>
);

const Sidebar = () => {
    return (
        <>
            <div className="flex flex-col relative flex-shrink-0 w-60 h-screen overflow-y-auto bg-gray-800">
                <div className="flex flex-col px-2">
                    <ServerHeader />
                    <ChannelList />
                </div>

                <div className="flex items-center justify-between absolute w-full bottom-0 bg-gray-900 p-2">
                    <Account />
                </div>
            </div>

            <Outlet />
        </>
    )
}

export default Sidebar