import React from 'react'


const Card = ({img,text}) => {
  return (
    <>
       <div className="w-52 h-52 flex flex-col  bg-black">
      <div className="h-32 w-52 bg-transparent border-color border-2">
        <img className='h-32 w-52' src={img} alt="" />
      </div>

      <div className="h-20 w-52 bg-transparent  border-color border-2">
        <p className="px-2 py-[2px] overflow-hidden">{text}</p>
      </div>
         </div> 
    </>
  )
}

export default Card
