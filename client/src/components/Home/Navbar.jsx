// import React, { useRef, useState } from "react";
// import File from "../../../public/file.svg";
// import { IoIosArrowDown } from "react-icons/io";
// import Dropdown from "./Dropdown";
// const Navbar = () => {
//   const [toggle,setToggle]=useState(false)
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
//       <div className="text-color h-[20vh] w-[80vw]   ">
//         <div className="grid grid-cols-3 h-[15vh]">
//           <div className="flex flex-col justify-center items-center text-3xl">
//             <h1 className="text-4xl tracking-[6px] font-bold font-Poppins">Home</h1>
//             <p className="text-lg font-Poppins font-semibold">recent play</p>
//           </div>
//           <div>
            
//           </div>

//           <div className=" h-[20vh] flex justify-center items-center  text-white text-xl">
//             <div className=" flex items-center gap-2 border-[1px] border-color bg-[#7a7a7a75] hover:bg-[#a7a7a775] rounded-l-md  px-2 ">
//               <img className="w-4 h-4 font-bold " src={File} alt="" />
//               <p onClick={handleClick}> open file(s)</p>
//               <input
//               type="file"
//               onChange={addFile}
//               ref={fileputRef}
//               style={{ display: "none" }}
//             />
//             </div>
//             <div className="border-[1px] bg-[#7a7a7a75] hover:bg-[#a7a7a775] rounded-r-md   border-color py-[4px] px-2  ">

//             <IoIosArrowDown onClick={()=>setToggle(!toggle)}/>
//               {toggle?<Dropdown/>:''}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import File from "../../../public/file.svg";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "./Dropdown";

const Navbar = ({ onFileSelect }) => {
  const [toggle, setToggle] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onFileSelect(e.target.files[0]);
      setToggle(false); // Close dropdown after selection
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="text-color h-[20vh] w-[80vw]">
      <div className="grid grid-cols-3 h-[15vh]">
        <div className="flex flex-col justify-center items-center text-3xl">
          <h1 className="text-4xl tracking-[6px] font-bold font-Poppins">Home</h1>
          <p className="text-lg font-Poppins font-semibold">recent play</p>
        </div>
        <div></div>

        <div className="h-[20vh] flex justify-center items-center text-white text-xl">
          <div 
            className="flex items-center gap-2 border-[1px] border-color bg-[#7a7a7a75] hover:bg-[#a7a7a775] rounded-l-md px-2 cursor-pointer"
            onClick={triggerFileInput}
          >
            <img className="w-4 h-4 font-bold" src={File} alt="" />
            <p>Open file(s)</p>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
              accept="audio/*"
            />
          </div>
          <div 
            className="border-[1px] bg-[#7a7a7a75] hover:bg-[#a7a7a775] rounded-r-md border-color py-[4px] px-2 cursor-pointer"
            onClick={() => setToggle(!toggle)}
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