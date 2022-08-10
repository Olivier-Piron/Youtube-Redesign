import React from 'react';

const VideoPreview = ({image, title, channelTitle, timeAgo}) => {
    return (
        <div className='hover:opacity-80 duration-300 shadow-inner'>
            <img className='w-full object-cover h-36 rounded-t-lg' src={image} alt='' />
            <div className='h-24 flex flex-col justify-between bg-white rounded-b-lg pt-3 pb-1'>
                <p className='p-2 pl-4 pr-10 text-sm text-zinc-900 font-bold break-all'>{title}</p>
                <p className='px-4 pb-2 text-zinc-600 text-xs'>{channelTitle} - {timeAgo}</p>
            </div>
        </div>
    )
}

export default VideoPreview;