import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower2 } from 'lucide-react';

type Plant = {
  id: string;
  name: string;
  growthStage: number;
};

type Garden = {
  owner: string;
  plants: Plant[];
};

const Gardens = () => {
  const navigate = useNavigate();

  const [gardens] = useState<Garden[]>([
    {
      owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      plants: [
        {
          id: "1",
          name: "Sunny Sunflower",
          growthStage: 3,
        },
        {
          id: "2",
          name: "Magic Mushroom",
          growthStage: 2,
        }
      ]
    },
    {
      owner: "0x123...abc",
      plants: [
        {
          id: "3",
          name: "Royal Rose",
          growthStage: 4,
        }
      ]
    }
  ]);

  const GrowthStages = ({ stage }: { stage: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`w-2 h-2 rounded-full ${
              level <= stage ? 'bg-green-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleViewGarden = (owner: string) => {
    console.log(`Viewing garden of ${owner}`);
    navigate("/gardenprofile");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Player Gardens</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {gardens.map((garden) => (
          <div key={garden.owner} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <span className="text-sm font-mono">
                {garden.owner.slice(0, 6)}...{garden.owner.slice(-4)}
              </span>
              <button 
                onClick={() => handleViewGarden(garden.owner)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                View Garden
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {garden.plants.slice(0, 3).map((plant) => (
                  <div
                    key={plant.id}
                    className="p-4 border rounded-lg bg-white/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <Flower2 className="w-4 h-4" />
                          {plant.name}
                        </h3>
                        <GrowthStages stage={plant.growthStage} />
                      </div>
                    </div>
                  </div>
                ))}
                {garden.plants.length > 3 && (
                  <div className="text-sm text-gray-500 text-center">
                    +{garden.plants.length - 3} more plants
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gardens;