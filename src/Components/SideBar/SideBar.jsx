import React from 'react';
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className='lg:block min-h-screen lg:w-1/5 max-w-xs w-82 p-5 pt-10 bg-zinc-900 text-white text-sm' id='sidebare'>
            <div className='flex flex-row'>
                <button className="hidden space-y-1.5" id='toggleSb'>
                  <span className="block w-5 h-0.5 bg-gray-600"></span>
                  <span className="block w-5 h-0.5 bg-gray-600"></span>
                  <span className="block w-5 h-0.5 bg-gray-600"></span>
                </button>
                <Link to='/'>
                    <span className='flex flex-row space-x-2'>
                        <i className='fa-brands fa-youtube text-red-500 text-3xl pl-2'></i>
                        <p className='hidden lg:block text-white text-2xl font-semibold'>YouTube</p>
                    </span>
                </Link>
            </div>

            <div className='flex flex-col p-2'>
                <h4 className='font-semibold mt-10 mb-5'>Menu</h4>
                <ul className='text-gray-400 flex flex-col space-y-4'>
                    <Link to='/'> 
                        <li className='flex flex-row space-x-5 hover:text-white duration-300'>
                            <i className="text-lg fa fa-home"></i>
                            <p className='hidden lg:block mt-1'>Home</p>
                        </li>
                    </Link>
                    <Link to='/trends'> 
                        <li className='flex flex-row space-x-5 hover:text-white duration-300'>
                            <i className="text-lg fa fa-fire"></i>
                            <p className='hidden lg:block mt-1'>Trending</p>
                        </li>
                    </Link>
                    <li className='flex flex-row space-x-5 hover:cursor-default hover:text-white duration-300 '>
                        <i className="text-lg fa fa-play"></i>
                        <p className='hidden lg:block file:mt-1'>Subscription</p>
                    </li>

                    <li className='flex flex-row space-x-5 hover:cursor-default hover:text-white duration-300 '>
                        <i className="text-lg fa-solid fa-circle-dot"></i>
                        <p className='hidden lg:block mt-1'>Live</p>
                    </li>
                </ul>

                <h4 className='font-semibold mt-10 mb-5'>Library</h4>
                <ul className='text-gray-400 flex flex-col space-y-4'>
                    <li className='flex flex-row space-x-5 hover:cursor-default hover:text-white duration-300'>
                        <i className="text-lg fa-solid fa-clock"></i>
                        <p className='hidden lg:block mt-1'>History</p>
                    </li>
                    <li className='flex flex-row space-x-5 hover:cursor-default hover:text-white duration-300'>
                        <i className="text-lg fa-solid fa-bars fa-rotate-90"></i>
                        <p className='hidden lg:block mt-1'>Queue</p>
                    </li>
                    <li className='flex flex-row space-x-5 hover:cursor-default hover:text-white duration-300 '>
                        <i className="text-lg fa-solid fa-heart"></i>
                        <p className='hidden lg:block mt-1'>Liked Videos</p>
                    </li>
                </ul>

                <h4 className='font-semibold mt-10 mb-5'>Playlist</h4>
                <ul className='text-gray-400 flex flex-col space-y-4'>
                    <li className='flex flex-row space-x-5 hover:cursor-default hover:text-white duration-300'>
                        <i className="text-lg fa-solid fa-list"></i>
                        <p className='hidden lg:block mt-1'>Playlist 1</p>
                    </li>
                    <li className='flex flex-row space-x-5 hover:cursor-default hover:text-white duration-300'>
                        <i className="text-lg fa-solid fa-list"></i>
                        <p className='hidden lg:block mt-1'>Playlist 2</p>
                    </li>
                </ul>

                <button className='hidden lg:block mt-10 bg-red-600 font-bold p-2 rounded-md hover:bg-opacity-90 duration-300'>UPLOAD VIDEO</button>
            </div>
        </div>

    )
}

export default SideBar;
