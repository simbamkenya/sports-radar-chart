import './App.css';
import Radar from './components/Radar';

function App() {
  return (
    <div className="">
       <div className='flex justify-center items-center h-screen'>
        <div>
          <h2 className='font-medium leading-tight text-2xl mt-0 mb-2 text-blue-60 text-center'>Spider Radar Chart</h2>
         <Radar />
        </div>
       </div>
    </div>
  );
}

export default App;
