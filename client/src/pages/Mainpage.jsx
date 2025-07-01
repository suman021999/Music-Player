
// import React, { useState } from 'react';
// import Sidebar from '../Sidebar';
// import Player from '../components/Playlist/Player';
// import Homebar from './HBar';
// // import Playbar from './PBar';
// import { Routes, Route } from 'react-router-dom';

// const Mainpage = () => {
//   const [currentTrack, setCurrentTrack] = useState(null);

//   return (
//     <section className='h-screen text-color font-Poppins bg-background'>
//       <div className='grid grid-cols-5'>
//         <Sidebar currentTrack={currentTrack} setCurrentTrack={setCurrentTrack}/>
//         <Routes>
//           <Route path='/' element={<Homebar setCurrentTrack={setCurrentTrack} />} />
//           {/* <Route path='/playlist' element={<Playbar />} /> */}
//         </Routes>
//       </div>
//       {/* Pass both currentTrack and setCurrentTrack to Player */}
//       <Player currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
//     </section>
//   );
// };

// export default Mainpage;




import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Player from '../components/Playlist/Player';
import Homebar from './HBar';
import { Routes, Route } from 'react-router-dom';

const Mainpage = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <section className='h-screen text-color font-Poppins bg-background'>
      <div className='grid grid-cols-5'>
        <Sidebar 
          currentTrack={currentTrack} 
          setCurrentTrack={setCurrentTrack}
          onSearch={handleSearch}
        />
        <Routes>
          <Route 
            path='/' 
            element={<Homebar setCurrentTrack={setCurrentTrack} searchQuery={searchQuery} />} 
          />
          {/* <Route path='/playlist' element={<Playbar />} /> */}
        </Routes>
      </div>
      <Player currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
    </section>
  );
};

export default Mainpage;