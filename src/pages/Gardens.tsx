import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReadContract } from 'wagmi';
import { Flower } from 'lucide-react';
import { gardenFactoryConfig } from '../contracts';
import { plantCardVariants } from '../utils/plants';

const Gardens = () => {
  const navigate = useNavigate();

  const { data: playerGardens } = useReadContract({
    address: gardenFactoryConfig.address,
    abi: gardenFactoryConfig.abi,
    functionName: 'getGardens',
  });

  const handleViewGarden = (owner: string) => {
    console.log(`Viewing garden of ${owner}`);
    navigate("/gardenprofile/" + owner);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Player Gardens</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {playerGardens?.map((garden) => (
              <motion.div
                key={garden.owner}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -5 }}
                variants={plantCardVariants}
              >
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Flower className="mr-2" /> 
                      <span className="text-sm font-mono">
                        {garden?.gardenAddress.slice(0, 6)}...{garden?.gardenAddress.slice(-4)}
                      </span>
                      <Flower className="ml-2" /> 
                    </div>
                    <button 
                      onClick={() => handleViewGarden(garden?.owner)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      View Garden
                    </button>
                  </div>
                
                  <p className="mt-3">
                    Owner: {garden?.owner.slice(0, 6)}...{garden?.owner.slice(-4)}
                  </p>
                </div>
                
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
};

export default Gardens;