import React from 'react';

const SearchResult = ({description,title, image, views, channelTitle}) => {
    return (
        <div className='flex flex-row p-4 pl-0 space-x-4 lg:h-auto h-36 overflow-hidden'>
          <img className='hover:opacity-80 duration-300 lg:w-1/3 lg:h-auto h-full w-auto' src={image} alt="X" />
          <div className='flex flex-col'>
                <p className='text-xl'>{title}</p>
                <p className='text-zinc-500'>{views} views</p>
                <p>{channelTitle}</p>
                <p className='text-sm text-zinc-500'>Description: {description}</p>
          </div>
        </div>
    )
}

export default SearchResult;