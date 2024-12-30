import { useState } from 'react';
import { Trees, Flower2, Loader2 } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { gardenFactoryConfig } from '../contracts';

interface Garden {
  id: string;
  name: string;
  theme: string;
  features: string[];
  size: string;
  price: number;
  imageUrl: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
}

const BuyGardenNFT = () => {
  const [isLoading, setIsLoading] = useState(false);

  const garden: Garden = {
    id: "1",
    name: "Zen Paradise Garden",
    theme: "Japanese Garden",
    features: ["Koi Pond", "Cherry Blossoms", "Stone Lanterns", "Bamboo Grove"],
    size: "1,000 sq ft",
    price: 0.8,
    imageUrl: "/api/placeholder/300/300",
    rarity: "Rare"
  };

  const getRarityColor = (rarity: Garden['rarity']) => {
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

  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    })

  const handlePurchase = async () => {
    setIsLoading(true);

    writeContract({
      address: gardenFactoryConfig.address,
      abi: gardenFactoryConfig.abi,
      functionName: 'buyGarden',
    })

    setIsLoading(false);
    alert('Purchase successful! (This is a demo)');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{garden.name}</h2>
              <div className="flex gap-2">
                <Trees className="h-6 w-6 text-green-500" />
                <Flower2 className="h-6 w-6 text-pink-500" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
              <img
                src={garden.imageUrl}
                alt={garden.name}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Theme:</span>
                <span className="text-sm font-medium text-gray-900">{garden.theme}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Size:</span>
                <span className="text-sm font-medium text-gray-900">{garden.size}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rarity:</span>
                <span className={`text-sm font-medium ${getRarityColor(garden.rarity)}`}>
                  {garden.rarity}
                </span>
              </div>

              <div className="mt-4">
                <span className="text-sm text-gray-600">Features:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {garden.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {garden.price} ETH
                  </div>
                  <div className="text-sm text-gray-500">
                    ≈ ${(garden.price * 3000).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                'Purchase Garden NFT'
              )}
            </button>
          </div>
          {error && <div className="text-red-500 mt-2">Error: {error.message}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div className="text-green-500">Transaction confirmed!</div>}
        </div>
      </div>
    </div>
  );
};

export default BuyGardenNFT;