import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";

function Sidebar() {
  return (
    <>
      <div className="text-color h-[85vh] w-[20vw] bg-background2 text-3xl ">
        <div className="flex justify-center text-white  font-bold my-2">
          <p className="text-xl">Music player</p>
        </div>

        <div className="flex flex-col gap-y-4  w-full mt-10 ">
          <div className=" flex justify-center items-center  w-full">
            <input
              type="text"
              className="relative bg-[#807d7d75] w-[18vw] p-6 h-8 text-white text-sm rounded-lg  shadow-lg focus:outline-none "
              placeholder="Search bar"
            />
            <CiSearch className="2xl:left-60 xl:left-52  lg:left-36 md:left-28      absolute  bg-[#514e4e4c] hover:bg-[#514e4e9a]    p-2 rounded-lg" />
          </div>

          <div className="flex justify-center items-center  w-full">
            <Link
              to="/"
              className=" bg-[#807d7d75] w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg  shadow-lg focus:outline-none "
            >
              Home
            </Link>
          </div>

          <div className="flex justify-center items-center  w-full">
            <Link
              to="/playlist"
              className=" bg-[#807d7d75] w-[18vw] p-6 h-8 text-white text-sm flex items-center rounded-lg  shadow-lg focus:outline-none "
            >
              Playlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
