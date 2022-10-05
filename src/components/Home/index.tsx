import React from 'react'
import DirectMessageView from './DirectMessageView'
import MessageList from './MessageList'

const Home = () => {
    return (
        <div className='flex w-full'>
            <div className="flex flex-col relative w-60 h-screen overflow-y-auto bg-gray-800">
                <div className="flex flex-col px-2">
                    <MessageList />
                </div>
            </div>

            <div className="flex-1">
                <DirectMessageView />
            </div>
        </div>
    )
}

export default Home