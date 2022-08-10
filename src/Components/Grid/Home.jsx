import React, {useEffect, useState} from 'react';
import VideoPreview from '../Thumbnail/VideoPreview';
import PopularChannels from '../Channels/PopularChannels';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {DateTime} from 'luxon';
import '../../Assets/Styles/style.css';

const Home = () => {

    const formater = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    };

    const [videoCards, setVideoCards] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=landscape+cinematic&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then(response => {
          createVideoCards(response.data.items);
          horizontalScroll();
        })
        .catch(error => {
          console.log(error);
          setIsError(true);
        })
    }, [])

    async function createVideoCards(videoItems) {
      let newVideoCards = [];
      for (const video of videoItems) {
        const videoId = video.id.videoId;
        const snippet = video.snippet;
        const image = snippet.thumbnails.medium.url;
        let title = snippet.title;
        if (title.length > 49) {
          title = title.replace(/&quot;/g, '\"').substring(0,49) + "..."
        }
        let channelTitle = snippet.channelTitle;
        if (channelTitle.length > 29) {
          channelTitle = channelTitle.replace(/&quot;/g, '\"').substring(0,29) + "..."
        }
        let timeAgo = DateTime.fromISO(snippet.publishedAt).setLocale("en").toRelative();

        const channelId = snippet.channelId;
        let channelURL = `https://www.youtube.com/channel/${channelId}`;
        const response = await axios
        .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        let channelImage = response.data.items[0].snippet.thumbnails.medium.url;
        const videosNb = response.data.items[0].statistics.videoCount;
        const subscribersNb = formater(response.data.items[0].statistics.subscriberCount);

        newVideoCards.push({
          videoId,
          image,
          title,
          channelTitle,
          timeAgo,
          channelImage,
          videosNb,
          subscribersNb,
          channelURL,
        });
      };
      setVideoCards(newVideoCards);
    }

    async function horizontalScroll() {
      const element = document.querySelector("#horizontalScroll");

      element.addEventListener('wheel', (event) => {
        event.preventDefault();
        element.scrollBy({
          left: event.deltaY < 0 ? -20 : 20,  
        });
      });
    }

    if(isError) {
      return <p severity="error" className='loading' id='horizontalScroll'>No Results found!</p>
    }
    return (
          <div className='flex flex-col max-w-screen-2xl'>
            <div>
                <h2 className='mt-4 pl-16 text-white text-opacity-90 text-xl font-semibold'>Recommended Videos</h2>
                <div className="flex flex-row flex-nowrap overflow-x-scroll overflow-y-hidden scrollbar-hide py-10 ml-16 space-x-8" id='horizontalScroll'>
                    {
                      videoCards.map(item => {
                        return (
                                <Link className='flex-shrink-0 xl:w-1/4 lg:w-1/3 hover:bg-opacity-80 duration-300' key={item.videoId} to={`/video/${item.videoId}`}>
                                  <VideoPreview 
                                    title={item.title}
                                    image={item.image}
                                    channelTitle={item.channelTitle}
                                    timeAgo={item.timeAgo}
                                    channelImage={item.channelImage}
                                  />
                                </Link>
                        )
                      })
                    }
                </div>
            </div>

                    
            <div className='flex xl:flex-row flex-col'>
                <div className='hidden md:block mt-4 xl:w-1/2 w-4/5'>
                    <h2 className='ml-16 text-white text-opacity-90 text-xl font-semibold'>Popular Channels</h2>
                    <div className="h-72 flex flex-col flex-nowrap overflow-y-scroll scrollbar-hide pl-16 pr-5 my-10">
                    {
                      videoCards.map(item => {
                        return (
                                <PopularChannels 
                                  key={item.videoId}
                                  channelImage={item.channelImage}
                                  channelTitle={item.channelTitle}
                                  videosNb={item.videosNb}
                                  subscribersNb={item.subscribersNb}
                                  channelURL={item.channelURL}
                                />
                        )
                      })
                    }
                    </div>
                </div>

                <div className='mt-4 xl:w-1/2 w-4/5'>
                    <h2 className='ml-16 text-white text-opacity-90 text-xl font-semibold'>Youtubes Mixes</h2>
                    <div className="mt-10 pl-16 grid md:grid-cols-2 grid-cols-1 gap-8">
                      <div className='palm bg-cover bg-top flex flex-row justify-around rounded-md hover:opacity-90 duration-300'>
                          <div className='w-3/5 p-2 pl-6'>
                            <p className='pr-20'>Chill vibes</p>
                            <i className='fa-solid fa-play mt-8'></i>
                          </div>
                          <div className='bg-zinc-800 bg-opacity-80 backdrop-blur-sm w-2/5 flex rounded-r-md'>
                            <p className='m-auto'>+50</p>
                          </div>
                      </div>

                      <div className='sea bg-cover bg-top flex flex-row justify-around rounded-md hover:opacity-90 duration-300'>
                          <div className='w-3/5 p-2 pl-6'>
                            <p className='pr-24'>Summer vibes</p>
                            <i className='fa-solid fa-play mt-8'></i>
                          </div>
                          <div className='bg-zinc-800 bg-opacity-80 backdrop-blur-sm w-2/5 flex rounded-r-md'>
                            <p className='m-auto'>+50</p>
                          </div>
                      </div>

                      <div className='night bg-cover bg-top flex flex-row justify-around rounded-md hover:opacity-90 duration-300'>
                          <div className='w-3/5 p-2 pl-6'>
                            <p className='pr-24'>Night vibes</p>
                            <i className='fa-solid fa-play mt-8'></i>
                          </div>
                          <div className='bg-zinc-800 bg-opacity-80 backdrop-blur-sm w-2/5 flex rounded-r-md'>
                            <p className='m-auto'>+50</p>
                          </div>
                      </div>

                      <div className='leaves bg-cover bg-top flex flex-row justify-around rounded-md hover:opacity-90 duration-300'>
                          <div className='w-3/5 p-2 pl-6'>
                            <p className='pr-24'>Nature vibes</p>
                            <i className='fa-solid fa-play mt-8'></i>
                          </div>
                          <div className='bg-zinc-800 bg-opacity-80 backdrop-blur-sm w-2/5 flex rounded-r-md'>
                            <p className='m-auto'>+50</p>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;