import React, { useState } from 'react'
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
const Play = () => {

  const [istrue, setIstrue] = useState(false)
  
  return (
    <>
      <div className='flex items-center w-56 mr-32 '>
       <MdSkipPrevious /> 
       
          <button onClick={() => setIstrue(!istrue)} className='border-[#3672b3] p-2 rounded-full border-4 flex items-center justify-center'>
            {istrue? <FaPause className='h-6 w-6' /> :<FaPlay className='h-6 w-6'/>}
          </button>
       <MdSkipNext />
      </div>
    </>
  )
}

export default Play





