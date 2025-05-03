import React from 'react'

const Artist = () => {
  return (
    <div className='bg-red-300 p-2  w-[500px] flex   flex-row gap-4'>
      <img  className='w-12 h-12 rounded-full' src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDk3MzR8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTczOTczNjQ3M3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="" />

     <div className='flex  justify-center flex-col'>
      <h2 className='text-lg'>titel</h2>
      <p className='text-sm'>stroyline</p>

      </div>
    </div>
  )
}

export default Artist
