import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = () => (
    <div>
        <label htmlFor="search" className="sr-only">
            Search
        </label>
        <div className="relative rounded-md shadow-sm">
            <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 border-none block w-full pr-10 text-sm bg-gray-900 rounded-md py-1 pl-2"
                placeholder="Search"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
        </div>
    </div>
);

export default SearchBar