import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Player from '../components/Playlist/Player'
import Homebar from './HBar'
import Playbar from './PBar'
import { Routes,Route } from 'react-router-dom'

const Mainpage = () => {
const [currentTrack, setCurrentTrack] = useState(null);
  return (
    <>
      <section className=' h-screen  text-color  font-Poppins bg-background'> 
        <div className='  grid grid-cols-5'>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Homebar/>}/>
            <Route path='/playlist' element={<Playbar/>}/>
          </Routes>
        </div>
        <Player currentTrack={currentTrack} />
          
      </section>
    </>
  )
}

export default Mainpage