import React from 'react'
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

const Play = ({ audioRef, isPlaying, setIsPlaying, handleNext, handlePrevious }) => {
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className='flex items-center w-56 mr-64'>
      <button 
        onClick={handlePrevious} 
        className="text-2xl text-white hover:text-blue-400 transition-colors"
      >
        <MdSkipPrevious /> 
      </button>
      
      <button 
        onClick={togglePlay} 
        className='border-[#3672b3] p-2 rounded-full border-4 flex items-center justify-center mx-4
        hover:border-blue-400 transition-colors'
      >
        {isPlaying ? (
          <FaPause className='h-6 w-6 text-white' />
        ) : (
          <FaPlay className='h-6 w-6 text-white' />
        )}
      </button>
      
      <button 
        onClick={handleNext} 
        className="text-2xl text-white hover:text-blue-400 transition-colors"
      >
        <MdSkipNext />
      </button>
    </div>
  )
}

export default Play
