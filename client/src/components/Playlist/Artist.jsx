import React from 'react'

const Artist = ({ img, title, name }) => {
  return (
    <div className='p-2 w-[600px] flex flex-row gap-4 hover:bg-background2/20 items-center'>

      {img ? (
        <img 
          className='w-12 h-12 rounded-full object-cover' 
          src={img} 
          alt={title || "Track cover"} 
        />
      ) : (
        <div className='w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center'>
          <span className='text-white text-xs'>No Image</span>
        </div>
      )}
      
      <div className='flex justify-center flex-col  overflow-hidden '>
        <h2 className='text-lg font-medium text-white text-ellipsis overflow-hidden whitespace-nowrap '>
          {title || "Unknown Track"}
        </h2>
        <p className='text-sm text-gray-200 text-ellipsis overflow-hidden whitespace-nowrap'>
          {name || "Unknown Artist"}
        </p>
      </div>
    </div>
  );
};



export default Artist
