import React from 'react';

const TrendingVideoPreview = ({image, title}) => {
    return (
        <div className=''>
            <img className='w-full shadow-xl rounded-md hover:opacity-80 duration-300' src={image} alt='' />
            <p className='p-2 text-white font-bold text-sm break-all'>{title}</p>
        </div>
    )
}

export default TrendingVideoPreview;