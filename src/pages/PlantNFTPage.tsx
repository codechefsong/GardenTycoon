import { useState } from 'react';
import { Leaf, Loader2 } from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  species: string;
  price: number;
  imageUrl: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
}

const PlantNFTPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const plant: Plant = {
    id: "1",
    name: "Ethereal Monstera",
    species: "Monstera Deliciosa",
    price: 0.05,
    imageUrl: "/api/placeholder/300/300",
    rarity: "Rare"
  };

  const getRarityColor = (rarity: Plant['rarity']) => {
    switch (rarity) {
      case 'Common':
        return 'text-gray-500';
      case 'Uncommon':
        return 'text-green-500';
      case 'Rare':
        return 'text-purple-500';
      case 'Legendary':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    setIsLoading(false);
    alert('Purchase successful!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{plant.name}</h2>
              <Leaf className="h-6 w-6 text-green-500" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Species:</span>
                <span className="text-sm font-medium text-gray-900">{plant.species}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rarity:</span>
                <span className={`text-sm font-medium ${getRarityColor(plant.rarity)}`}>
                  {plant.rarity}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {plant.price} ETH
                  </div>
                  <div className="text-sm text-gray-500">
                    ≈ ${(plant.price * 3000).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50">
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-semibold text-white
                ${isLoading 
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                } transition-colors duration-200`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Purchase NFT'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantNFTPage;