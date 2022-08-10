import React, { useState, useEffect } from 'react';
import SearchResult from '../Thumbnail/SearchResult';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPage = (props) => {

    const formater = n => {
      if (n < 1e3) return n;
      if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
      if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    };

    let { searchQuery } = useParams();
    
    const [videoRows, setVideoRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      setVideoRows([]);
        axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&type=video&q=${searchQuery}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then(response => {
          createVideoRows(response.data['items']);
          setIsError(false);
        })
        .catch(error => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        })

    }, [searchQuery])


    async function createVideoRows(videos) {
      let newVideoRows = [];
      for (const video of videos) {
        const videoId = video.id.videoId;
        const response = await axios
                                .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        const views = formater(response.data.items[0].statistics.viewCount);
        const snippet = video.snippet;
        const title = snippet.title;
        const channelTitle = snippet.channelTitle;
        const description = snippet.description;
        const image = snippet.thumbnails.medium.url;
                            
        newVideoRows.push({
          videoId,
          title,
          image,
          views,
          channelTitle, 
          description
        });
      };
      setVideoRows(newVideoRows);
      setIsLoading(false);
    }
    if (isError) {
      return <p severity="error" className='loading'>No Results found!</p>
    }
    return (

        <div className="flex flex-col max-w-screen-lg">
          <h2 className='mt-4 pl-16 text-white text-opacity-90 text-xl font-semibold'>Results</h2>
            {
              videoRows.map(item => {
                return (
                        <Link className='w-11/12 ml-16' key={item.videoId} to={`/video/${item.videoId}`}>
                          <SearchResult
                            title={item.title}
                            image={item.image}
                            views={item.views}
                            channel={item.channel}
                            channelTitle={item.channelTitle}
                            description={item.description}
                          />
                        </Link>
                )
              })
              
            }   
            
        </div>
    )
}

export default SearchPage;
