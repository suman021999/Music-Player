import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import Searchbar from "./components/searchbar/Searchbar";

function Sidebar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(true);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [showSearchbar, setShowSearchbar] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  // Close searchbar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchbar(false);
      }
    }

    if (showSearchbar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchbar]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    onSearch(query);
  };

  const handleSearchClick = () => {
    setShowSearchbar(true);
  };

  const handleSearchSelect = () => {
    setShowSearchbar(false); // Close when a song is selected
  };

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`text-color h-[85vh] ${isOpen ? "w-[20vw]" : "w-[60px]"} bg-background text-3xl transition-all duration-300`}>
      <div className="flex items-center p-4">
        <GiHamburgerMenu className="cursor-pointer" onClick={toggleSidebar}/>
        
        {isOpen && (
          <div className="flex justify-center text-white w-full font-bold my-2">
            <p className="text-xl">Music player</p>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="flex justify-center items-center w-full mt-4" ref={searchRef}>
        {isOpen ? (
          <>
            <div className="relative w-[18vw]">
              <div 
                className="bg-[#807d7d75] w-full p-6 flex items-center h-8 text-sm rounded-lg shadow-lg focus:outline-none overflow-hidden"
                onClick={handleSearchClick}
              >
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  className="bg-transparent focus:outline-none w-52"
                  placeholder="Search music..."
                  onFocus={handleSearchClick}
                />
              </div>
              <CiSearch 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#7975754c] hover:bg-[#6c6969c3] p-2 rounded-lg" 
                onClick={handleSearchClick}
              />
            </div>

            {showSearchbar && (
              <Searchbar 
                onClose={() => setShowSearchbar(false)}
                onSelect={handleSearchSelect}
              />
            )}
          </>
        ) : (
          <div className="flex justify-center w-full">
            <CiSearch 
              className="cursor-pointer hover:text-[#b6acac]" 
              onClick={handleSearchClick}
            />
          </div>
        )}
      </div>

      {/* Home Section */}
      <div className="flex justify-center items-center w-full mt-4">
        {isOpen ? (
          <Link
            to="/"
            className={`w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg transition-colors duration-200 ${
              isActive("/") ? "bg-[#807d7d75]" : ""
            }`}
          >
            <GoHome className="mr-2" />
            Home
          </Link>
        ) : (
          <div className="flex justify-center w-full">
            <Link 
              to="/"
              className={`p-2 rounded-lg ${
                isActive("/") ? "bg-[#807d7d75]" : ""
              }`}
            >
              <GoHome className="cursor-pointer" />
            </Link>
          </div>
        )}
      </div>

      {/* Playlist Section */}
      <div className="flex justify-center items-center w-full mt-4">
        {isOpen ? (
          <Link
            to="/playlist"
            className={`w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg transition-colors duration-200 ${
              isActive("/playlist") ? "bg-[#807d7d75]" : ""
            }`}
          >  
            <MdOutlineFeaturedPlayList className="mr-2" />
            Playlist
          </Link>
        ) : (
          <div className="flex justify-center w-full">
            <Link 
              to="/playlist"
              className={`p-2 rounded-lg ${
                isActive("/playlist") ? "bg-[#807d7d75]" : ""
              }`}
            >
              <MdOutlineFeaturedPlayList className="cursor-pointer" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;