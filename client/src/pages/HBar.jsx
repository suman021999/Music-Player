
import Home from '../components/Home/HomeContent';

const HBar = ({ setCurrentTrack }) => {
 
  return (
    <>
      
      <section className='h-[85vh] w-[80vw]'>
        
        <Home setCurrentTrack={setCurrentTrack}/>
      </section>
    </>
  );
};

export default HBar;
