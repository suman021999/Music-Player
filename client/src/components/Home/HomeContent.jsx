import React from "react";
import Card from "./Card";

// const API_URL = import.meta.env.VITE_AUTH_URL


const Home = () => {

  
  
  return ( 
    <>
      <section className=" h-[65vh] w-[80vw]  overflow-hidden items-start text-lg">
        <div className="relative overflow-hidden w-full h-full  flex justify-center">


       

          
          <div  className="overflow-y-auto tasklist w-[75vw] mb-2">
            <div className="flex justify-center">
              <div className="flex flex-wrap  justify-center  gap-y-4 gap-x-2  w-[45vw] my-10 items-center">




                {
                  map((data,index)=>(
                    <Card key={index} img={data.img} text={data.text}/>
                  ))
                }
              </div>
            </div>
          </div>
         
          
          

        </div>
      </section>
    </>
  );
};

export default Home;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "./Card";

// const Home = () => {
//   const [musicData, setMusicData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMusicData = async () => {
//       try {
//         const res = await axios.get("/api/music"); 
//         setMusicData(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//         console.error("Error fetching music data:", err);
//       }
//     };

//     fetchMusicData();
//   }, []);

//   if (loading) {
//     return <div>Loading music...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <section className="h-[65vh] w-[80vw] overflow-hidden items-start text-lg">
//         <div className="relative overflow-hidden w-full h-full flex justify-center">
//           <div className="overflow-y-auto tasklist w-[75vw] mb-2">
//             <div className="flex justify-center">
//               <div className="flex flex-wrap justify-center gap-y-4 gap-x-2 w-[45vw] my-10 items-center">
//                 {musicData.map((data, index) => (
//                   <Card 
//                     key={index} 
//                     img={data.img} // Make sure your backend returns image data
//                     audioUrl={data.url} // The music URL from Cloudinary
//                     text={data.text || data.originalname} // Fallback to original filename
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;