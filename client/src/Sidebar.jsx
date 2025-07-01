
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { GoHome } from "react-icons/go";
// // import { PiPlaylistFill } from "react-icons/pi";

// function Sidebar({currentTrack, setCurrentTrack}) {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };


//   return (
//     <div className={`text-color h-[85vh] ${isOpen ? "w-[20vw]" : "w-[60px]"} bg-background text-3xl transition-all duration-300`}>
//       <div className="flex items-center p-4">
//         <GiHamburgerMenu className="cursor-pointer" onClick={toggleSidebar}/>
        
//         {isOpen && (
//           <div className="flex justify-center text-white w-full font-bold my-2">
//             <p className="text-xl">Music player</p>
//           </div>
//         )}
//       </div>

//       {/* Search Section */}
//       <div className="flex justify-center items-center w-full mt-4">
//         {isOpen ? (
//           <div className="relative w-[18vw]">
//             <input
//               type="text"
//               className="bg-[#807d7d75] w-full p-6 h-8 text-white text-sm rounded-lg shadow-lg focus:outline-none"
//               placeholder="Search bar"
//             />
//             <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#514e4e4c] hover:bg-[#514e4e9a] p-2 rounded-lg" />
//           </div>
//         ) : (
//           <div className="flex justify-center w-full">
//             <CiSearch className="cursor-pointer hover:text-[#b6acac]" onClick={toggleSidebar}/>
//           </div>
//         )}
//       </div>

//       {/* Home Section */}
//       <div className="flex justify-center items-center w-full mt-4">
//         {isOpen ? (
//           <Link
//             to="/"
//             className="bg-[#807d7d75] w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg shadow-lg focus:outline-none"
//           >
//             <GoHome className="mr-2" />
//             Home
//           </Link>
//         ) : (
//           <div className="flex justify-center w-full">
//             <Link  to="/"><GoHome className="cursor-pointer hover:text-[#b6acac]"/></Link>
//           </div>
//         )}
//       </div>

     

      

     
//     </div>
//   );
// }

// export default Sidebar;


  {/* playlist Section */}
      {/* <div className="flex justify-center items-center w-full mt-4">
        {isOpen ? (
          <Link
              to="/playlist"
              className="bg-[#807d7d75] w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg shadow-lg focus:outline-none"
            >
            <PiPlaylistFill className="mr-2" />
              Playlist
            </Link>
        ) : (
          <div className="flex justify-center w-full">
            <Link to="/playlist"><PiPlaylistFill className="cursor-pointer hover:text-[#b6acac]"/></Link>
          </div>
        )}
      </div> */}




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
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="bg-[#807d7d75] w-full p-6 h-8 text-white text-sm rounded-lg shadow-lg focus:outline-none"
              placeholder="Search music..."
            />
            <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#514e4e4c] hover:bg-[#514e4e9a] p-2 rounded-lg" />
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
    </div>
  );
}

export default Sidebar;