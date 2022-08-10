import React, {useEffect, useState} from 'react';
import TrendingVideoPreview from '../Thumbnail/TrendingVideoPreview';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Assets/Styles/style.css';

const WatchNext = () => {

    const [videoCards, setVideoCards] = useState([]);
    const [isError, setIsError] = useState(false);
    let rand = (Math.random() + 1).toString(36).substring(10);

    useEffect(() => {
      axios
        .get(`https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults=5&q=${rand}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
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
        const videoId = video.id.videoId;
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
        
        <div className=''>
            <div className="flex flex-col space-y-2">
                {
                  videoCards.map(item => {
                    return (
                          <Link key={item.videoId} to={`/video/${item.videoId}`}>
                              <TrendingVideoPreview 
                                image={item.image}
                                title={item.title}
                              />
                            </Link>
                    )
                  })
                }
            </div>
        </div>
    )
}

export default WatchNext;