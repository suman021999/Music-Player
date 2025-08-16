import React, { useState, useRef } from "react";
import File from "../../../public/file.svg";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "./Dropdown";
import axios from "axios";

const Navbar = ({ onFileSelect }) => {
  const [toggle, setToggle] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    if (!e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("audio", file);
      
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.data.success) {
        onFileSelect(response.data.data);
        setToggle(false);
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="text-color h-[20vh] w-[80vw]">
      <div className="grid grid-cols-3 h-[15vh]">
        {/* Title */}
        <div className="flex flex-col justify-center items-center text-3xl">
          <h1 className="text-4xl tracking-[6px] font-bold font-Poppins">Home</h1>
        </div>
        <div></div>

        {/* File Upload + Dropdown */}
        <div className="h-[20vh] flex justify-center items-center text-white text-xl">
          {/* Open File Button (hidden on mobile/tablet, visible on desktop) */}
          <div
            className={`hidden md:flex items-center gap-2 border-[1px] border-color bg-[#7a7a7a75] hover:bg-[#a7a7a775] rounded-l-md px-2 cursor-pointer ${uploading ? "opacity-50" : ""}`}
            onClick={!uploading ? triggerFileInput : undefined}
          >
            {uploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <img className="w-4 h-4 font-bold" src={File} alt="File icon" />
                <p>Open file(s)</p>
              </>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
              accept="audio/*"
              disabled={uploading}
            />
          </div>

          {/* Dropdown toggle button (always visible) */}
          <div
            className={`border-[1px] bg-[#7a7a7a75] hover:bg-[#a7a7a775] rounded-r-md border-color py-[4px] px-2 cursor-pointer ${uploading ? "opacity-50" : ""}`}
            onClick={!uploading ? () => setToggle(!toggle) : undefined}
          >
            <IoIosArrowDown />
            {toggle && <Dropdown onFileSelect={onFileSelect} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
