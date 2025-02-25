import React from "react";
import Playlist from "../components/Paylist/PlayContext";
import Pnavbar from "../components/Paylist/Pnavbar";

const PBar = () => {
  return (
    <>
      <section className="h-[85vh] w-[80vw] bg-background">
        <Pnavbar />
        <Playlist />
      </section>
    </>
  );
};

export default PBar;
