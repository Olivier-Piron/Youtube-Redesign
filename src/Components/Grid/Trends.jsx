import React, {useEffect, useState} from 'react';
import TrendingVideoPreview from '../Thumbnail/TrendingVideoPreview';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Assets/Styles/style.css';

const Trends = () => {

    const [videoCards, setVideoCards] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      axios
        .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then(response => {
          createVideoCards(response.data.items);
        })
        .catch(error => {
          console.log(error);
          setIsError(true);
        })
    }, [])

    async function createVideoCards(videoItems) {
      let newVideoCards = [];
      for (const video of videoItems) {
        const videoId = video.id;
        const snippet = video.snippet;
        let title = snippet.title;
        if (title.length > 59) {
          title = title.substring(0,59) + "..."
        }
        const image = snippet.thumbnails.medium.url;

        newVideoCards.push({
          videoId,
          image,
          title,
        });
      };
      setVideoCards(newVideoCards);
    }

    if(isError) {
      return <p severity="error" className='loading'>No Results found!</p>
    }
    return (
        
          <div className='lg:mx-12 mx-auto max-w-screen-2xl'>
            <h2 className='mt-4 pl-16 text-white text-opacity-90 text-xl font-semibold'>Trending Videos</h2>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 p-10">
                {
                  videoCards.map(item => {
                    return (
                            <Link key={item.videoId} to={`/video/${item.videoId}`}>
                              <TrendingVideoPreview 
                                title={item.title}
                                image={item.image}
                              />
                            </Link>
                    )
                  })
                }
            </div>
          </div>
    )
}

export default Trends;