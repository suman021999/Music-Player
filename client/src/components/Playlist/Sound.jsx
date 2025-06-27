import React, { useState, useRef, useEffect } from 'react';
import { IoVolumeLowOutline, IoVolumeMediumOutline, IoVolumeHighOutline, IoVolumeOffOutline } from "react-icons/io5";

const Sound = ({ audioRef }) => {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isSoundbarShown, setIsSoundbarShown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsSoundbarShown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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


  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <IoVolumeOffOutline />;
    if (volume < 0.3) return <IoVolumeLowOutline />;
    if (volume < 0.7) return <IoVolumeMediumOutline />;
    return <IoVolumeHighOutline />;
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => {setIsSoundbarShown(!isSoundbarShown);}}
        className="text-2xl text-white"
      >
        {getVolumeIcon()}
      </button>

      {isSoundbarShown && (
        <div className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded-lg flex items-center gap-2 px-3 py-2 shadow-lg z-50 w-64">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 appearance-none cursor-pointer bg-transparent"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`,
              height: '4px',
              borderRadius: '999px',
            }}
          />
          <span className="text-white text-sm w-8 text-right">
            {Math.round(volume * 100)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Sound;

