import React from "react";
import Artist from "./Artist";
import Sound from "./Sound";
import Play from "./Play";

const Player = () => {
  return (
    <>
      <div className="text-color h-[15vh]  w-screen bg-[#b33636]  text-3xl">

        <div className="flex justify-center">
          <div className="flex items-center justify-center gap-4  mx-auto mt-4">
            <p className="bg-yellow-400 h-4 rounded-full w-4"></p>
            <hr className="h-2 w-[70vw] border-none  bg-[#4b4848cb] rounded-full" />
            <p className="bg-yellow-400 h-4 rounded-full w-4"></p>
          </div>
        </div>

        <div className="w-screen mt-3">
          <div className="flex ml-10  ">
          <Artist />

        <div className="flex justify-between bg-slate-400 w-screen mx-8 h-12">
          
          <Play/>
          <Sound />
        </div>
          </div>
        

        </div>

      </div>
    </>
  );
};
// bg-background

export default Player;
