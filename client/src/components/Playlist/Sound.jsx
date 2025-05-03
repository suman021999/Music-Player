import React from 'react'
import { IoVolumeLowOutline } from "react-icons/io5";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { IoVolumeHighOutline } from "react-icons/io5";
import { IoVolumeOffOutline } from "react-icons/io5";
const Sound = () => {
  return (
    <div className='bg-indigo-700 w-56'>
      <div className='mute'>
      <IoVolumeOffOutline />
      </div>

      <div className='sound1'>
      <IoVolumeLowOutline />
      </div>

      <div className='sound2'>
      <IoVolumeMediumOutline />
      </div>

      <div className='sound3 highvolume'>
      <IoVolumeHighOutline />
      </div>
      
    </div>
  )
}

export default Sound
