import React from 'react';

const VideoDesc = ({title, description, viewCount, likeCount, timeAgo, channelTitle, channelImage, subscribersNb, channelURL}) => {
    return (
        <div className='w-full'>
            <div className='mx-8 mt-8 flex flex-row space-x-12 text-sm justify-between'>
                <p className='text-gray-400'>{timeAgo}</p>
                <div className='flex flex-row space-x-8'>
                    <span className='flex flex-row space-x-2'>
                        <i className='fa-solid fa-eye mt-1'></i>
                        <p className=''>{viewCount} views</p>
                    </span>
                    <span className='flex flex-row space-x-2 text-red-500'>
                        <button className='hover:scale-110'>
                            <i className='fa-solid fa-heart mt-1'></i>
                        </button>
                        <p className=''>{likeCount}</p>
                    </span>
                </div>
            </div>

            <h1 className='mx-8 my-4 font-semibold'>{title}</h1>

            <div className='mx-8 mt-4 mb-16 flex flex-row space-x-12 text-sm justify-between'>
                    <div className='flex flex-row'>
                        <img className='rounded-full h-7 w-7 mr-3 mt-1' src={channelImage} alt="X" />
                        <div className='flex flex-col'>
                            <h3>{channelTitle}</h3>
                            <p className='text-gray-400' >{subscribersNb} subscribers</p>
                        </div>
                    </div>
                    <a href={channelURL} target='_blank'>
                        <button className='bg-red-600 font-semibold p-2 rounded-md tracking-wide -mt-1'>SUBSCRIBE</button>
                    </a>
            </div>
        </div>
    )
}

export default VideoDesc;