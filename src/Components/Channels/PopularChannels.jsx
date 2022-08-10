import React from 'react';

const PopularChannels = ({channelImage, channelTitle, videosNb, subscribersNb, channelURL}) => {
    return (
        <div className='flex flex-row justify-between bg-zinc-600 bg-opacity-40 text-xs p-4 border-b border-neutral-200 border-opacity-10 hover:scale-105 hover:rounded-md hover:opacity-90 duration-300 ease-out'>
            <div className='flex flex-row space-x-2'>
                <img className='rounded-full h-7 w-7 mr-3' src={channelImage} alt="X" />
                <a href={channelURL} target='_blank' className='text-sm mt-1'>
                    <span className='text-white'>{channelTitle}</span>
                </a>
                <span className='text-gray-400 mt-1.5'>• {subscribersNb} subscribers</span>
                <span className='text-gray-400 mt-1.5'>• {videosNb} videos</span>
            </div>

            <a href={channelURL} target='_blank'>
            <button className='bg-red-600 font-semibold p-2 rounded-md tracking-wide'>SUBSCRIBE</button>
            </a>
        </div>
    )
}

export default PopularChannels;