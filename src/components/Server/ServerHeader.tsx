import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface ServerHeaderProps {
    name?: string;
}

const ServerHeader = ({ name }: ServerHeaderProps) => (
    <Menu as="div" className="relative flex items-center hover:bg-tertiary border-b shadow-2xl border-primary">
        <Menu.Button className='flex flex-row justify-between items-center px-3 pt-2 pb-[0.75rem] w-full'>
            <div className="font-bold text-white">{name}</div>
            <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </Menu.Button>
        <Menu.Items as='div' className="absolute origin-bottom-right right-0 bottom-0 top-4 mb-8 w-36 rounded-md bg-black shadow-lg ">
            <Menu.Item>
                <button className="bg-primary hover:bg-tertiary group flex text-white w-full items-center rounded-md px-2 py-2 text-sm">Testing Holmes</button>
            </Menu.Item>
            <Menu.Item>
                <button className="bg-primary hover:bg-tertiary group flex text-white w-full items-center rounded-md px-2 py-2 text-sm">Testing Holmes</button>
            </Menu.Item>
        </Menu.Items>
    </Menu>
)

export default ServerHeader