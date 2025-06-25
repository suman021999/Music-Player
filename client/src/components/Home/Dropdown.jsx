// import React, { useState, useRef } from "react";

// // import axios from "axios";

// const Dropdown = () => {
//   const [audio, setAudio] = useState();
//   const fileputRef = useRef(null);

//   const addFile = (e) => {
//     if (e.target.files[0]) {
//       setAudio(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleClick = () => {
//     fileputRef.current.click();
//   };

//   return (
//     <>
//       <div
//         className="absolute right-4 z-10 mt-3 w-80 origin-top-right rounded-md bg-[#403f3fee] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
//         id="menuitem"
//       >
//         <div className="p-1" role="none">
//           <a
//             href="#"
//             onClick={handleClick}
//             className="block px-4 py-2 text-sm hover:bg-stone-600 hover:rounded-lg"
//           >
//             <h4 className="text-white" onClick={handleClick}> open file(s)</h4>
//             <p className="text-stone-400">Browse for files to play</p>
//             <input
//               type="file"
//               onChange={addFile}
//               ref={fileputRef}
//               style={{ display: "none" }}
//             />
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dropdown;


import React, { useRef } from "react";

const Dropdown = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="absolute right-4 z-10 mt-3 w-80 origin-top-right rounded-md bg-[#403f3fee] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
      id="menuitem"
    >
      <div className="p-1" role="none">
        <a
          href="#"
          onClick={handleClick}
          className="block px-4 py-2 text-sm hover:bg-stone-600 hover:rounded-lg"
        >
          <h4 className="text-white">Open file(s)</h4>
          <p className="text-stone-400">Browse for files to play</p>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </a>
      </div>
    </div>
  );
};

export default Dropdown;