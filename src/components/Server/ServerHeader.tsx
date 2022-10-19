import { Menu } from '@headlessui/react';
import { ArrowLeftCircleIcon, ChevronDownIcon, Cog8ToothIcon, PlusCircleIcon, UserPlusIcon } from '@heroicons/react/24/solid'

interface ServerHeaderProps {
    name?: string;
    currentUserIsServerAdmin: boolean;
}

interface ServerHeaderMenuItem {
    name: string;
    icon: JSX.Element;
    textColor?: string;
    restrictedToAdmin: boolean;
    onClick?: () => void;
}

const serverHeaderMenuItems: Array<ServerHeaderMenuItem> = [
    {
        name: 'Server Settings',
        icon: <Cog8ToothIcon className='w-5 h-5' />,
        restrictedToAdmin: true
    },
    {
        name: 'Create Channel',
        icon: <PlusCircleIcon className='w-5 h-5' />,
        restrictedToAdmin: true
    },
    {
        name: 'Invite People',
        icon: <UserPlusIcon className='w-5 h-5' />,
        textColor: 'text-indigo-400',
        restrictedToAdmin: true
    },
    {
        name: 'Leave Server',
        icon: <ArrowLeftCircleIcon className='w-5 h-5' />,
        textColor: 'text-red-600',
        restrictedToAdmin: false,
    }
]

const ServerHeader = ({ name, currentUserIsServerAdmin }: ServerHeaderProps) => {
    const menuItemsToDisplay = currentUserIsServerAdmin
        ? serverHeaderMenuItems
        : serverHeaderMenuItems.filter(x => !x.restrictedToAdmin);

    return (
        <Menu as="div" className="relative flex items-center hover:bg-tertiary border-b shadow-2xl border-primary">
            <Menu.Button className='flex flex-row justify-between items-center px-3 pt-2 pb-[0.75rem] w-full'>
                <div className="font-bold text-white">{name}</div>
                <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </Menu.Button>
            <Menu.Items as='div' className="absolute origin-bottom-right right-0 left-2 bottom-0 top-12 mb-8 w-56 h-fit py-4 px-2 rounded-md bg-[#18191c] shadow-lg">
                {
                    menuItemsToDisplay.map(x => (
                        <Menu.Item>
                            <button className={`hover:bg-indigo-500 group flex justify-between flex-row ${x.textColor ?? 'text-gray-300'} font-medium hover:text-white w-full items-center rounded-md px-2 py-2 text-sm mb-2`}>
                                <span>{x.name}</span>
                                <span>{x.icon}</span>
                            </button>
                        </Menu.Item>
                    ))
                }
            </Menu.Items>
        </Menu>
    )
}

export default ServerHeader