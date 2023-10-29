import './App.css';
import Radar from './components/Radar';
import { dat } from './data';

function App() {
  return (
    <div className="bg-[#333C4C]">
      
       <div className='flex justify-center min-h-screen text-white'>
        <div className='md:flex w-full'>

          <div className='w-0 md:w-2/5 bg-gray-700 flex items-center'>
            <div className='border max-w-md ml-20 flex flex-col gap-4 p-4 rounded-sm'>
            <h2 className='font-medium leading-tight text-2xl mt-0 mb-2 text-blue-60 text-left'>Messi vs CR7 Spider Radar Chart</h2>
            <h1>Players Attributes Vis</h1>
            <p>These attributes represents various capabilities of Messi and Cristiano. Two of the best players in football in the last decated</p>  

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-2 py-3">
                                Pace
                            </th>
                            <th scope="col" class="px-2 py-3">
                                Physical
                            </th>
                            <th scope="col" class="px-2 py-3">
                                Passing
                            </th>
                            <th scope="col" class="px-2 py-3">
                                Shooting
                            </th>
                            <th scope="col" class="px-2 py-3">
                                Dribling
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {dat.map((player) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {player.pace}
                        </th>
                        <td class="px-2 py-4">
                            {player.physical}
                        </td>
                        <td class="px-2 py-4">
                             {player.passing}
                        </td>
                        <td class="px-2 py-4">
                             {player.shooting}
                        </td>
                        <td class="px-2 py-4">
                             {player.dribbling}
                        </td>
                    </tr>
                      ))}
                    </tbody>
                </table>
            </div>

            </div>
            
            
          </div>
          <div className='md:w-3/5 flex items-center justify-center'>              
           <Radar />
          </div>

        </div>
       </div>
    </div>
  );
}

export default App;
