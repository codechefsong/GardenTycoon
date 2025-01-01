import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Droplets, Flower } from 'lucide-react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { gardenFactoryConfig, gardenyConfig } from '../contracts';

export default function GardenProfile() {
  const { address: myAddress } = useAccount();

  const { playeraddress } = useParams();

  const [newPlantName, setNewPlantName] = useState('');

  const { data: playerGardenAddress } = useReadContract({
    address: gardenFactoryConfig.address,
    abi: gardenFactoryConfig.abi,
    functionName: 'getPlayerGardenAddress',
    args: [playeraddress]
  });

  const { data: playerPlants } = useReadContract({
    address: playerGardenAddress,
    abi: gardenyConfig.abi,
    functionName: 'getPlants',
  });

  const { data: hash, error, isPending, writeContract  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
      useWaitForTransactionReceipt({
        hash,
      });

  const plantSeed = () => {
    if (!newPlantName.trim()) return;

    writeContract({
      address: playerGardenAddress,
      abi: gardenyConfig.abi,
      functionName: 'createPlant',
    })

    setNewPlantName('');
  };

  const waterPlant = (plantId: string) => {
    writeContract({
      address: playerGardenAddress,
      abi: gardenyConfig.abi,
      functionName: 'waterPlant',
      args: [plantId]
    })
  };

  const collectPoints = (plantId: string) => {
    writeContract({
      address: playerGardenAddress,
      abi: gardenyConfig.abi,
      functionName: 'collectPoints',
      args: [plantId]
    })
  };

  console.log(playerPlants)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{playeraddress.slice(0, 6)}...{playeraddress.slice(-4)} Garden</h1>
          <p className='mb-3'>Garden Address {playerGardenAddress}</p>
          {myAddress === playeraddress && <div className="bg-white rounded-lg shadow-md mb-6 p-6">
            <h2 className="text-xl font-semibold mb-4">Plant a New Seed</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter plant name"
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={plantSeed}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Plant Seed
              </button>
            </div>
          </div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {playerPlants?.map((plant) => (
              <div key={plant.id.toString()} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{plant.name}</h3>
                    <p className="text-sm text-gray-500">
                      Planted: {plant?.timeBorn?.toString()}
                    </p>
                  </div>
                  {myAddress === playeraddress && <div className="flex gap-2">
                    <button
                      onClick={() => waterPlant(plant.id)}
                      className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      <Droplets className="mr-2 h-4 w-4" />
                      Water
                    </button>
                    <button
                      onClick={() => collectPoints(plant.id)}
                      className="flex items-center px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors border-green-300 bg-green-50 hover:bg-green-100 text-green-700">
                      <Flower className="mr-2 h-4 w-4" />
                      Collect
                    </button>
                  </div>}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${plant.waterLevel}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Level: {plant.level.toString()}
                </p>
                <p className="text-sm text-gray-500">
                  Last Watered: {plant?.lastTimeWater?.toString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
