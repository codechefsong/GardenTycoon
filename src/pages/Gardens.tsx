import { useNavigate } from 'react-router-dom';
import { useReadContract } from 'wagmi';
import { gardenFactoryConfig } from '../contracts';

const Gardens = () => {
  const navigate = useNavigate();

  const { data: gardenAddresses } = useReadContract({
    address: gardenFactoryConfig.address,
    abi: gardenFactoryConfig.abi,
    functionName: 'getPlayers',
  });

  const handleViewGarden = (owner: string) => {
    console.log(`Viewing garden of ${owner}`);
    navigate("/gardenprofile/" + owner);
  };

  console.log(gardenAddresses);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Player Gardens</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {gardenAddresses?.map((garden) => (
          <div key={garden.owner} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <span className="text-sm font-mono">
                {garden.slice(0, 6)}...{garden.slice(-4)}
              </span>
              <button 
                onClick={() => handleViewGarden(garden)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                View Garden
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gardens;