
// import React from 'react'
// import { FiPlayCircle } from "react-icons/fi";
// import { RiDeleteBinLine } from "react-icons/ri";

// const Card = ({ img, text, audioUrl }) => {
//   const handlePlay = (e) => {
//     e.stopPropagation();
//     // You might want to implement play functionality here
//     console.log('Playing:', audioUrl);
//   };

//   const handleDelete = (e) => {
//     e.stopPropagation();
//     // You might want to implement delete functionality here
//     console.log('Deleting:', audioUrl);
//   };

//   return (
//     <div className="w-52 h-52 flex flex-col hover:rounded-md bg-background group">
//       <div className='p-2 relative'>
//         <div className="h-36 bg-transparent relative rounded-md overflow-hidden">
//           {img && (
//             <img 
//               src={img} 
//               alt={text} 
//               className="w-full h-full object-cover rounded-t-lg"
//             />
//           )}
          
//           <div className='absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent'>
//             <FiPlayCircle 
//               className="text-white text-2xl hover:text-primary cursor-pointer"
//               onClick={handlePlay}
//             />
//             <RiDeleteBinLine 
//               className="text-white text-2xl hover:text-[#ccc9c9bd] cursor-pointer"
//               onClick={handleDelete}
//             />
//           </div>
//         </div>
        
//         <div className="h-16 bg-transparent">
//           <p className="px-2 py-[2px] overflow-hidden text-sm">{text}</p>
//           {audioUrl && (
//             <audio controls className="w-full mt-2">
//               <source src={audioUrl} type="audio/mpeg" />
//               Your browser does not support the audio element.
//             </audio>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from 'react'
import { FiPlayCircle } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const Card = ({ img, text, audioUrl }) => {
  const handlePlay = (e) => {
    e.stopPropagation();
    // You might want to implement play functionality here
    console.log('Playing:', audioUrl);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // You might want to implement delete functionality here
    console.log('Deleting:', audioUrl);
  };

  return (
    <div className="w-52 h-52 flex flex-col hover:rounded-md bg-background group">
      <div className='p-2 relative'>
        <div className="h-36 bg-transparent relative rounded-md overflow-hidden">
          {img && (
            <img 
              src={img} 
              alt={text} 
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
          
          <div className='absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent'>
            <FiPlayCircle 
              className="text-white text-2xl hover:text-primary cursor-pointer"
              onClick={handlePlay}
            />
            <RiDeleteBinLine 
              className="text-white text-2xl hover:text-[#ccc9c9bd] cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
        
        <div className="h-16 bg-transparent p-2">
          <p className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {text}
          </p>
          {audioUrl && (
            <audio controls className="w-full mt-2">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;