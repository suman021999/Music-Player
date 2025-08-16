import React from 'react';

const Searchbar = () => {
  // Sample data that matches your image
  const items = [
    "dracula-the-complete-saga-bram-stok",
    "HICKORY DICKORY DOCK RAHASYA |C",
    "Mir Dip",
    "DHUMGAR ER PISHACH RAHASYA |Cc",
    "LAFANG CHU DRIDIMBA RAHASYA |C",
    "LAFANG CHU DRIDIMBA RAHASYA |C",
    "Drolma-r Kharga By Avik Sarkar_Deer",
    "Mir,Dip,Sabyasachi,Jagannath Basu,Sot",
    "y2mate.is-BRAIN HEALING SOUNDS",
  ];

  return (
    <div className="absolute top-32 z-30 font-sans max-w-2xl mx-auto p-4"> 
      {/* Results List */}
      <div 
      className="border p-2 border-gray-400 bg-[#565151] w-[18vw] overflow-x-hidden rounded-md overflow-y-auto max-h-64">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="pl-4 py-3 rounded-lg overflow-hidden text-sm hover:bg-[#6a6363] w-[64vw] cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
