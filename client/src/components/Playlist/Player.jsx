// import React from "react";
// import Artist from "./Artist";
// import Sound from "./Sound";
// import Play from "./Play";

// const Player = () => {
//   return (
//     <>
//       <div className="text-color h-[15vh]  w-screen bg-[#3698b3]  text-3xl">

//         <div className="flex justify-center">
//           <div className="flex items-center justify-center gap-4  mx-auto mt-4">
//             <p className="bg-yellow-400 h-4 rounded-full w-4"></p>
//             <hr className="h-2 w-[70vw] border-none  bg-[#4b4848cb] rounded-full" />
//             <p className="bg-yellow-400 h-4 rounded-full w-4"></p>
//           </div>
//         </div>

//         <div className="w-screen mt-3">
//           <div className="flex mx-10 justify-between items-center">
//           <Artist />
//           <Play/>
//           <Sound />
        
//           </div>
        

//         </div>

//       </div>
//     </>
//   );
// };
// // bg-background

// export default Player;


import React, { useState, useEffect, useRef } from "react";
import Artist from "./Artist";
import Sound from "./Sound";
import Play from "./Play";

const Player = ({ currentTrack }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      
      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || currentTrack.duration);
      };
      
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', updateTime);
      
      return () => {
        audioRef.current.removeEventListener('timeupdate', updateTime);
        audioRef.current.removeEventListener('loadedmetadata', updateTime);
      };
    }
  }, [currentTrack]);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current) return;
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const percentageClicked = clickPosition / progressBarWidth;
    audioRef.current.currentTime = percentageClicked * duration;
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} />
      
      <div className="text-color h-[15vh] w-screen bg-[#3698b3] text-3xl">
        <div className="flex justify-center">
          <div className="flex items-center justify-center gap-4 mx-auto mt-4 w-full px-4">
            {/* Current time */}
            <span className="text-xs text-white w-10 text-right">
              {formatTime(currentTime)}
            </span>
            
            {/* Progress bar */}
            <div 
              className="relative flex-1 h-2 bg-[#4b4848cb] rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute left-0 top-0 h-full bg-yellow-400 rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
            </div>
            
            {/* Duration */}
            <span className="text-xs text-white w-10 text-left">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="w-screen mt-3">
          <div className="flex mx-10 justify-between items-center">
            <Artist />
            <Play audioRef={audioRef} />
            <Sound audioRef={audioRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;