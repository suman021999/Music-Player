import React from 'react'
import { FiPlayCircle } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const Card = ({img,text}) => {
  return (
    <div className="w-52 h-52 flex flex-col hover:rounded-md hover:bg-background group">
      <div className='p-2 relative'>
        
        
        <div className="h-36 bg-transparent relative rounded-md overflow-hidden">
          <img className='h-full w-full object-cover' src={img} alt="" />
          
          
          <div className='absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent'>
            <FiPlayCircle className="text-white text-2xl hover:text-primary cursor-pointer"/>
            <RiDeleteBinLine className="text-white text-2xl hover:text-[#ccc9c9bd] cursor-pointer"/>
          </div>
        </div>
        
        
        <div className="h-16 bg-transparent">
          <p className="px-2 py-[2px] overflow-hidden text-sm">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Card


