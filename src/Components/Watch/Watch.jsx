import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router';
import Video from './Video';
import VideoDesc from './VideoDesk';
import WatchNext from './WatchNext';
import {DateTime} from 'luxon';
import axios from 'axios';

const VideoPlayer = () => {

    // Returns wrong rounded number 
    const formater = n => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "," + (''+n)[1] + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "," + (''+n)[1] + "M";
      };

    let { videoId } = useParams();

    const [videoInfo, setVideoInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setVideoInfo([]);
        setIsLoading(true);
        axios
          .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          .then(response => {
              createVideoInfo(response.data['items'][0]);
              setIsError(false);
          })
          .catch(error => {
              console.log(error);
              setIsError(true);
          })
    }, [videoId])

    async function createVideoInfo (video) {
        const snippet = video.snippet;
        const statistics = video.statistics;
        const title = snippet.title;
        const description = snippet.description;
        const viewCount = statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        const likeCount = formater(statistics.likeCount);
        let timeAgo = DateTime.fromISO(snippet.publishedAt).setLocale("en").toRelative();
        let channelTitle = snippet.channelTitle;
        const channelId = snippet.channelId;
        let channelURL = `https://www.youtube.com/channel/${channelId}`;
        const response = await axios
        .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        let channelImage = response.data.items[0].snippet.thumbnails.medium.url;
        const subscribersNb = formater(response.data.items[0].statistics.subscriberCount);

        setVideoInfo({
            title,
            description,
            viewCount,
            likeCount,
            timeAgo,
            channelTitle,
            channelImage,
            subscribersNb,
            channelURL,
        });
        setIsLoading(false);
    }
    if(isError) {
        return <p>No Results found!</p>
    }
    return (
        <div className='flex flex-row w-full'>
            <div className='flex flex-col justify-start mx-auto mt-10 w-4/5 lg:w-3/4'>
                <div className='w-full mx-auto'>
                    {isLoading ? <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> : <Video videoId={videoId} /> }
                </div>
                <div className='w-full mx-auto'>
                    {!isLoading ? 
                        <VideoDesc 
                            title={videoInfo.title} 
                            viewCount={videoInfo.viewCount}
                            likeCount={videoInfo.likeCount}
                            description={videoInfo.description}
                            timeAgo={videoInfo.timeAgo}
                            channelTitle={videoInfo.channelTitle}
                            channelImage={videoInfo.channelImage}
                            subscribersNb={videoInfo.subscribersNb}
                            channelURL={videoInfo.channelURL}
                        /> : null}
                </div>
            </div>
            <div className='hidden lg:block p-5 pt-10 w-1/5'>
                {isLoading ? <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> :<WatchNext /> }
            </div>
        </div>
    )
}

export default VideoPlayer;
