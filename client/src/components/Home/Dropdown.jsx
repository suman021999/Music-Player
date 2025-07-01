
import React from "react";

const Dropdown = ({ onFileSelect }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="absolute right-4 z-10 mt-3 w-80 origin-top-right rounded-md bg-[#403f3fee] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
      id="menuitem"
    >
      <div className="p-1" role="none">
        <button
          onClick={triggerFileInput}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-stone-600 hover:rounded-lg"
        >
          <h4 className="text-white">Open file(s)</h4>
          <p className="text-stone-400">Browse for files to play</p>
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            accept="audio/*"
          />
        </button>
      </div>
    </div>
  );
};

export default Dropdown;