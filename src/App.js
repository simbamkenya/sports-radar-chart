import './App.css';
import Radar from './components/Radar';

function App() {
  return (
    <div className="bg-[#333C4C]">
       <div className='flex justify-center min-h-screen text-white'>
        <div>
          <h2 className='font-medium leading-tight text-2xl mt-0 mb-2 text-blue-60 text-center'>Messi vs Christiano stats Spider Radar Chart</h2>
         <Radar />
        </div>
       </div>
    </div>
  );
}

export default App;
