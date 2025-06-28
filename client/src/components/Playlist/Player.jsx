import React, { useState, useEffect, useRef } from "react";
import Artist from "./Artist";
import Sound from "./Sound";
import Play from "./Play";

const Player = ({ currentTrack, setCurrentTrack, tracks = [] }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Load last track from localStorage on mount
  useEffect(() => {
    const savedTrack = localStorage.getItem('currentTrack');
    if (savedTrack) {
      setCurrentTrack(JSON.parse(savedTrack));
    }
  }, []);

  // Save currentTrack to localStorage whenever it changes
  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem('currentTrack', JSON.stringify(currentTrack));
    }
  }, [currentTrack]);

  // When currentTrack updates, set up audio source and auto-play
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;

      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || currentTrack.duration);
      };

      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", updateTime);

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

  // Format time in mm:ss or h:mm:ss
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

  // Handle clicking on progress bar to seek
  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const percentageClicked = clickPosition / progressBarWidth;
    audioRef.current.currentTime = percentageClicked * duration;
  };

  // Handle next track
  const handleNext = () => {
    if (!tracks.length || !currentTrack) return;
    const currentIndex = tracks.findIndex(
      (track) => track.audioUrl === currentTrack.audioUrl
    );
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  // Handle previous track
  const handlePrevious = () => {
    if (!tracks.length || !currentTrack) return;
    const currentIndex = tracks.findIndex(
      (track) => track.audioUrl === currentTrack.audioUrl
    );
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  // Handle progress slider change
  const handleProgressChange = (e) => {
    if (!audioRef.current || !duration) return;
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} />

      {/* Display current time and duration */}
      <div className="text-color h-[15vh] w-full bg-background text-3xl">
        <div className="flex justify-center">
          <div className="flex items-center justify-center gap-4 mx-auto mt-4 w-full px-4">
            <span className="text-xs text-white w-10 text-right">
              {formatTime(currentTime)}
            </span>

            {/* Progress bar */}
            <div
              className="relative flex-1 h-1 bg-[#4b4848cb] rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="absolute h-full bg-blue-700 rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              >
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

            <span className="text-xs text-white w-10 text-left">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Artist info and controls */}
        <div className="w-screen mt-3">
          <div className="flex mx-10 justify-between items-center">
            <Artist
              img={currentTrack?.image}
              title={currentTrack?.title}
              name={currentTrack?.artist || "Unknown Artist"}
              isPlaying={isPlaying}
            />
            {/* Play/Pause and controls */}
            
              <Play
                  audioRef={audioRef}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
              />
            
            {/* Volume or other controls */}
            <Sound audioRef={audioRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
