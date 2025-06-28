import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import Navbar from "./Navbar";

const Home = ({ setCurrentTrack }) => {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

const handlePlayTrack = (track) => {
  setCurrentTrack({
    audioUrl: track.audioUrl || track.url, 
    duration: track.duration || 0,
    title: track.text || track.originalname,
    artist: track.artist || "Unknown Artist",
    image: track.img || track.imageData 
  });
};

  const fetchMusic = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_AUTH_URL}/`);
      if (response.data.success) {
        setMusicList(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to load music');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (newFile) => {
    setUploading(true);
    try {
      setMusicList(prev => [newFile, ...prev]);
    } catch (error) {
      console.error('Error adding file:', error);
      setError('Failed to add file to list');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMusic = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_AUTH_URL}/delete/${id}`);
      if (response.data.success) {
        setMusicList(prev => prev.filter(music => music._id !== id));
      } else {
        throw new Error(response.data.message || 'Failed to delete music');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return ( 
    <>
      <Navbar onFileSelect={handleFileSelect} />
      <section className="h-[65vh] w-[80vw] overflow-hidden items-start text-lg">
        <div className="relative overflow-hidden w-full h-full flex justify-center">
          <div className="overflow-y-auto tasklist w-[75vw] mb-2">
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-y-4 gap-x-2 w-[45vw] my-10 items-center">
                {error && (
                  <div className="text-red-500 text-center">
                    <p>{error}</p>
                    <button 
                      onClick={fetchMusic}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {loading ? (
                  <p>Loading...</p>
                ) : uploading ? (
                  <p>Adding new file...</p>
                ) : musicList.length === 0 ? (
                  <div className="text-center">
                    <p>No music found</p>
                    <button 
                      onClick={fetchMusic}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Load Music
                    </button>
                  </div>
                ) : (
                  musicList.map((data) => (
                    <Card 
                      key={data._id} 
                      id={data._id}
                      img={data.img || data.imageData} 
                      artist={data.artist || data.artist} 
                      text={data.text || data.originalname}
                      audioUrl={data.url || data.audioUrl}
                      onPlay={handlePlayTrack}
                      onDelete={handleDeleteMusic}                     
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;



