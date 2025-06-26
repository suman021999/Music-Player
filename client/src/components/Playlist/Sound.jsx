
// import React, { useState } from 'react'
// import { IoVolumeLowOutline, IoVolumeMediumOutline, IoVolumeHighOutline, IoVolumeOffOutline } from "react-icons/io5";

// const Sound = ({ audioRef }) => {
//   const [volume, setVolume] = useState(0.7); // Default volume
//   const [isMuted, setIsMuted] = useState(false);
//   const [prevVolume, setPrevVolume] = useState(0.7);

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//     if (newVolume > 0 && isMuted) {
//       setIsMuted(false);
//     }
//   };

//   const toggleMute = () => {
//     if (audioRef.current) {
//       if (isMuted) {
//         audioRef.current.volume = prevVolume;
//         setVolume(prevVolume);
//       } else {
//         setPrevVolume(volume);
//         audioRef.current.volume = 0;
//         setVolume(0);
//       }
//       setIsMuted(!isMuted);
//     }
//   };

//   const getVolumeIcon = () => {
//     if (isMuted || volume === 0) return <IoVolumeOffOutline />;
//     if (volume < 0.3) return <IoVolumeLowOutline />;
//     if (volume < 0.7) return <IoVolumeMediumOutline />;
//     return <IoVolumeHighOutline />;
//   };

//   return (
//     <div className='flex items-center gap-2 w-56'>
//       <button onClick={toggleMute} className="text-2xl">
//         {getVolumeIcon()}
//       </button>
      
//       <input
//         type="range"
//         min="0"
//         max="1"
//         step="0.01"
//         value={volume}
//         onChange={handleVolumeChange}
//         className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//       />
//     </div>
//   )
// }

// export default Sound


import React, { useState } from 'react'
import { IoVolumeLowOutline, IoVolumeMediumOutline, IoVolumeHighOutline, IoVolumeOffOutline } from "react-icons/io5";

const Sound = ({ audioRef }) => {
  const [volume, setVolume] = useState(0.7); // Default volume
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.7);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = prevVolume;
        setVolume(prevVolume);
      } else {
        setPrevVolume(volume);
        audioRef.current.volume = 0;
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <IoVolumeOffOutline />;
    if (volume < 0.3) return <IoVolumeLowOutline />;
    if (volume < 0.7) return <IoVolumeMediumOutline />;
    return <IoVolumeHighOutline />;
  };

  return (
    <div className='flex items-center gap-2 w-64  p-2 rounded-md'>
      <button onClick={toggleMute} className="text-2xl text-white">
        {getVolumeIcon()}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />

      <span className="text-white text-sm w-8 text-right">
        {Math.round(volume * 100)}
      </span>
    </div>
  )
}

export default Sound
