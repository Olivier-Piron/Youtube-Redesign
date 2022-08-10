import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Header () {

    const [inputSearch, setInputSearch] = useState('');
    const href  = window.location.origin;

    function searchWithEnter(e, value)
    {
      console.log(href)
      if (e.charCode === 13)
        window.location.href = `${href}/search/${value}`;
    }

    return (
        <header className="max-w-screen-2xl flex flex-row justify-between space-x-4 pt-6 pb-3 px-16 text-gray-600">
            <div className='flex flex-row md:w-3/5 lg:1-2 w-full'>
                <Link to={`/search/${inputSearch}`}>
                  <button className="bg-opacity-0">
                      <svg 
                            className="w-14 h-14 p-4"
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                  </button>
                </Link>
                <input className='bg-white bg-opacity-0 focus:text-gray-300 outline-0 h-12 w-full p-2 mt-0.5' type='text' placeholder="Search..." onChange={(e) => setInputSearch(e.target.value)} value={inputSearch} onKeyPress={(e) => searchWithEnter(e, e.target.value)}/>
            </div>

            <div className='md:flex hidden mt-2.5 pr-10 space-x-4'>
                <svg className='hover:text-gray-200 duration-300' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg>
                <svg className='hover:text-gray-200 duration-300' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></svg>
                <svg className='hover:text-gray-200 duration-300' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path>
                <span className="flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span></svg>
              <div className="hover:opacity-80 hover:cursor-pointer w-8 h-8 relative flex justify-center items-center -mt-1">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-lg" alt='U'></img>
              </div>
            </div>
        </header>
    )
}

export default Header;