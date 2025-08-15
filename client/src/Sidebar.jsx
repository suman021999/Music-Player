
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHome } from "react-icons/go";

function Sidebar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(true);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    onSearch(query); // Pass the search query to parent component
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
      <div className="flex justify-center items-center w-full mt-4">
        {isOpen ? (
          <div className="relative w-[18vw]">
            <div className="bg-[#807d7d75]  w-full p-6 flex items-center  h-8   text-sm rounded-lg shadow-lg focus:outline-none overflow-hidden">
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="bg-transparent focus:outline-none  w-52"
              placeholder="Search music..."
            />
            </div>
            
            <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#7975754c] hover:bg-[#6c6969c3] p-2 rounded-lg" />
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <CiSearch className="cursor-pointer hover:text-[#b6acac]" onClick={toggleSidebar}/>
          </div>
        )}
      </div>

      {/* Home Section */}
      <div className="flex justify-center items-center w-full mt-4">
        {isOpen ? (
          <Link
            to="/"
            className="bg-[#807d7d75] w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg shadow-lg focus:outline-none"
          >
            <GoHome className="mr-2" />
            Home
          </Link>
        ) : (
          <div className="flex justify-center w-full">
            <Link to="/"><GoHome className="cursor-pointer hover:text-[#b6acac]"/></Link>
          </div>
        )}
      </div>


      <div className="flex justify-center items-center w-full mt-4">
        {isOpen ? (
          <Link
            to="/playlist"
            className="bg-[#807d7d75] w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg shadow-lg focus:outline-none"
          >
            <GoHome className="mr-2" />
            playlist
          </Link>
        ) : (
          <div className="flex justify-center w-full">
            <Link to="/playlist"><GoHome className="cursor-pointer hover:text-[#b6acac]"/></Link>
          </div>
        )}
      </div>



    </div>
  );
}

export default Sidebar;