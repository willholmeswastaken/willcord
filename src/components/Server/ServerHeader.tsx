import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface ServerHeaderProps {
    name?: string;
}

const ServerHeader = ({ name }: ServerHeaderProps) => (
    <button
        type="button"
        className="flex justify-between items-center py-3 px-2"
    >
        <div className="font-bold text-white">{name}</div>
        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
    </button>
)

export default ServerHeader