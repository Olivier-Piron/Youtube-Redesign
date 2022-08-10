import React from 'react';

const Video = ({videoId}) => {
    return (
        <div className='aspect-w-16 aspect-h-9'>
          <iframe
            className='rounded-xl'
            src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1&controls=1&showinfo=0"}
            allowFullScreen
          ></iframe>
        </div>
    )
}

export default Video;
