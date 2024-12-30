import { useState } from 'react';
import { Plus, Droplets } from 'lucide-react';
import { useReadContract, useAccount } from 'wagmi';
import { gardenFactoryConfig } from '../contracts';

interface Plant {
  id: string;
  name: string;
  waterLevel: number;
  plantedDate: Date;
  lastWatered: Date;
}

export default function GardenProfile() {
  const { address } = useAccount();

  const [plants, setPlants] = useState<Plant[]>([]);
  const [newPlantName, setNewPlantName] = useState('');

  const { data: playerGardenAddress } = useReadContract({
    address: gardenFactoryConfig.address,
    abi: gardenFactoryConfig.abi,
    functionName: 'getPlayerGardenAddresses',
    args: [address]
  });

  const plantSeed = () => {
    if (!newPlantName.trim()) return;

    const newPlant: Plant = {
      id: Math.random().toString(36).substring(7),
      name: newPlantName,
      waterLevel: 100,
      plantedDate: new Date(),
      lastWatered: new Date(),
    };

    setPlants([...plants, newPlant]);
    setNewPlantName('');
  };

  const waterPlant = (plantId: string) => {
    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        return {
          ...plant,
          waterLevel: Math.min(plant.waterLevel + 25, 100),
          lastWatered: new Date(),
        };
      }
      return plant;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Garden</h1>
          <p>{playerGardenAddress}</p>
          <div className="bg-white rounded-lg shadow-md mb-6 p-6">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plants.map((plant) => (
              <div key={plant.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{plant.name}</h3>
                    <p className="text-sm text-gray-500">
                      Planted: {plant.plantedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => waterPlant(plant.id)}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    <Droplets className="mr-2 h-4 w-4" />
                    Water
                  </button>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${plant.waterLevel}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Water Level: {plant.waterLevel}%
                </p>
                <p className="text-sm text-gray-500">
                  Last Watered: {plant.lastWatered.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
