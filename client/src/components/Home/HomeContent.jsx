import React from "react";
import Card from "./Card";
import { cardData } from "../../data";




const Home = () => {
  
  return ( 
    <>
      <section className=" h-[65vh] w-[80vw]  overflow-hidden items-start text-lg">
        <div className="relative overflow-hidden w-full h-full  flex justify-center">


       

          
          <div  className="overflow-y-auto tasklist w-[75vw] mb-2">
            <div className="flex justify-center">
              <div className="flex flex-wrap  justify-center  gap-y-4 gap-x-2  w-[45vw] my-10 items-center">


                {
                  cardData.map((data,index)=>(
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
{/* <div className="bg-red-600 h-56 w-64">red</div> */}