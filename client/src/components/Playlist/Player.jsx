import React, { useState, useEffect, useRef } from "react";
import Artist from "./Artist";
import Sound from "./Sound";
import Play from "./Play";

const Player = ({ currentTrack, tracks = [], setCurrentTrack }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;

      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || currentTrack.duration);
      };

      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", updateTime);

      // Auto-play when track changes
      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Autoplay prevented:", error);
        }
      };

      playAudio();

      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener("loadedmetadata", updateTime);
      };
    }
  }, [currentTrack]);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const percentageClicked = clickPosition / progressBarWidth;
    audioRef.current.currentTime = percentageClicked * duration;
  };

  const handleNext = () => {
    if (!tracks.length || !currentTrack) return;

    const currentIndex = tracks.findIndex(
      (track) => track.audioUrl === currentTrack.audioUrl
    );

    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true); // Auto-play next track
  };

  const handlePrevious = () => {
    if (!tracks.length || !currentTrack) return;

    const currentIndex = tracks.findIndex(
      (track) => track.audioUrl === currentTrack.audioUrl
    );

    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true); // Auto-play previous track
  };

  const handleProgressChange = (e) => {
    if (!audioRef.current || !duration) return;
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      <div className="text-color h-[15vh] w-full bg-background text-3xl">
        <div className="flex justify-center">
          <div className="flex items-center justify-center gap-4 mx-auto mt-4 w-full px-4">
            {/* Current time */}
            <span className="text-xs text-white w-10 text-right">
              {formatTime(currentTime)}
            </span>

            {/* Progress bar */}
            <div
              className="relative flex-1 h-1 bg-[#4b4848cb] rounded-full cursor-pointer group"
              onClick={handleProgressClick}
              ref={progressRef}
            >
              <div
                className="absolute h-full bg-blue-700 rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              >
                {/* Thumb element */}
                <div className="absolute right-0 top-1/2 w-5 h-5 bg-blue-700 rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity" />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleProgressChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Duration */}
            <span className="text-xs text-white w-10 text-left">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="w-screen mt-3">
          <div className="flex mx-10 justify-between items-center">
             <Artist 
              img={currentTrack?.image} 
              title={currentTrack?.title} 
              name={currentTrack?.artist || "Unknown Artist"} 
            />
            <Play
              audioRef={audioRef}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
            <Sound audioRef={audioRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
