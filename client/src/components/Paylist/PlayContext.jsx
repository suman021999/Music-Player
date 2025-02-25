import React from "react";
import Player from "../../../public/player.png";
import { GoPlus } from "react-icons/go";

const PlayContext = () => {
  return (
    <>
      <section className="text-color h-[65vh] overflow-hidden flex justify-center items-center w-[80vw]">
        
          
          <div className="flex h-[40vh] items-center justify-center gap-x-3">
            <img className="h-48 w-48 z-10" src={Player} alt="" />
            <div>
              <h3 className="text-3xl"> you don't have any playlist</h3>
              <button className="flex gap-1 items-center m-2 rounded-lg text-black bg-[#219fa8ed] px-2 py-2">
                <GoPlus />
                <p>Create a new playlist</p>
              </button>
            </div>
            </div>
          
        
      </section>
    </>
  );
};

export default PlayContext;
