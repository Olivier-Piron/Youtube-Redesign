
import './App.css';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Trends from './Components/Grid/Trends';
import Home from './Components/Grid/Home';
import SearchPage from './Components/Search/Search';
import Watch from './Components/Watch/Watch';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className='overflow-x-hidden bg-black'>
      <div className='bg-zinc-900 text-white text-lg bg-opacity-95'>
      <Router>
        <Routes>
            <Route exact path="/" 
            element={
              <div className='flex flex-row w-full'>
                <SideBar /> 
                <div className='flex flex-col w-full'>
                  <Header />
                  <Home />
                </div>
              </div>
            }
            />

            <Route exact path="/Trends" 
            element={
              <div className='flex flex-row w-full'>
                <SideBar /> 
                <div className='flex flex-col w-full'>
                  <Header />
                  <Trends />
                </div>
              </div>
            }
            />

            <Route path="/search/:searchQuery" 
            element={
              <div className='flex flex-row w-full'>
                <SideBar /> 
                <div className='flex flex-col w-full'>
                  <Header />
                  <SearchPage />
                </div>
              </div>
            }
            />

            <Route path='/video/:videoId'
             element={
              <div className='flex flex-row w-full'>
                <SideBar /> 
                <div className='flex flex-col w-full'>
                  <Header />
                  <Watch />
                </div>
              </div>
            }
            />
        </Routes>
      </Router>
      </div>
    </div>
    
  );
}


export default App;
