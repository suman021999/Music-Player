import React from 'react'
import { IoVolumeLowOutline } from "react-icons/io5";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { IoVolumeHighOutline } from "react-icons/io5";
import { IoVolumeOffOutline } from "react-icons/io5";
const Sound = () => {

  const issound = true
 
  return (
    <div className='bg-indigo-700 w-56'>
     
      {/* {issound ? <IoVolumeHighOutline/>:<IoVolumeMediumOutline/>:<IoVolumeLowOutline/>:<IoVolumeOffOutline/>} */}
      <IoVolumeHighOutline/>
      
      

      
    </div>
  )
}

export default Sound
