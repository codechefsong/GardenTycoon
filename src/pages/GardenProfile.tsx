import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Droplets, Flower, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useWatchContractEvent,
  usePublicClient,
  useBlockNumber,
 } from 'wagmi';
import { gardenFactoryConfig, gardenyConfig } from '../contracts';
import { formatDate } from '../utils/time';

export default function GardenProfile() {
  const { address: myAddress } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const publicClient = usePublicClient();

  const { playeraddress } = useParams();

  const [newPlantName, setNewPlantName] = useState('');
  const [coOwner, setCoOwner] = useState<string>('');
  const [events, setEvents] = useState<any[]>([]);
  const [historicalEvents, setHistoricalEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const { data: coOwnerAddress } = useReadContract({
    address: playerGardenAddress,
    abi: gardenyConfig.abi,
    functionName: 'coOwner',
  });

  useWatchContractEvent({
    address: playerGardenAddress,
    abi: gardenyConfig.abi,
    eventName: 'Timeline',
    onLogs: (logs) => {
      setEvents(prev => [...prev, ...logs])
    },
  })

  useEffect(() => {
    async function getEvents() {
      if (!blockNumber) return;
      
      setIsLoading(true);
      try {
        const logs = await publicClient.getContractEvents({
          address: playerGardenAddress,
          abi: gardenyConfig.abi,
          eventName: 'Timeline',
          fromBlock: blockNumber - BigInt(1000), // Last 1000 blocks
          toBlock: blockNumber
        })
        setHistoricalEvents(logs)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
      setIsLoading(false)
    }

    getEvents()
  }, [blockNumber, publicClient])

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
      args: [newPlantName],
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

  const addCoOwner = () => {
    writeContract({
      address: playerGardenAddress,
      abi: gardenyConfig.abi,
      functionName: 'setCoOwner',
      args: [coOwner]
    })
  };

  console.log(events, historicalEvents);

  const plantCardVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        bounce: 0.3,
        type: "spring"
      }
    }
  };

  const sproutVariants = {
    hidden: { 
      height: 0,
      opacity: 0 
    },
    visible: { 
      height: 24,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{playeraddress.slice(0, 6)}...{playeraddress.slice(-4)} Garden</h1>
          <p className='mb-3'>Garden Address {playerGardenAddress}</p>
          <p className='mb-3'>Co Owner {coOwnerAddress}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <AnimatePresence>
              {playerPlants?.map((plant) => (
                <motion.div
                  key={plant.id.toString()}
                  layout
                  initial="hidden"
                  animate="visible"
                  variants={plantCardVariants}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {plant.name}
                        <span className="text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full text-sm">
                          Level {plant.level.toString()}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">
                        Planted: {formatDate(plant?.timeBorn?.toString())}
                      </p>
                    </div>
                    {myAddress === playeraddress && <div className="flex gap-2">
                      <motion.button
                        onClick={() => waterPlant(plant.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        <Droplets className="mr-2 h-4 w-4" />
                        Water
                      </motion.button>
                      <button
                        onClick={() => collectPoints(plant.id)}
                        className="flex items-center px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors border-green-300 bg-green-50 hover:bg-green-100 text-green-700">
                        <Flower className="mr-2 h-4 w-4" />
                        Collect
                      </button>
                    </div>}
                  </div>

                  <motion.div 
                    className="flex justify-center mb-4"
                    variants={sproutVariants}
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      width="24" 
                      height="24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path 
                        d="M12 2L12 22M12 2C12 2 18 8 18 12M12 2C12 2 6 8 6 12" 
                        stroke="#16a34a"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>XP: {plant.exp}</span>
                      <span>Next Level: {5 - plant.exp}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${(plant.exp / 5) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Last Time Collected: {formatDate(plant.lastTimeCollected.toString())}
                  </p>

                  <p className="text-sm text-gray-500">
                    Last Watered: {formatDate(plant?.lastTimeWater?.toString())}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

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
             <motion.button
                onClick={plantSeed}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Plant Seed
              </motion.button>
            </div>
          </div>}

          {myAddress === playeraddress && <div className="bg-white rounded-lg shadow-md mb-6 p-6">
            <h2 className="text-xl font-semibold mb-4">Garden Co-owners</h2>
            <div className="flex gap-4 mb-4">
              <input
                placeholder="Enter co-owner address"
                value={coOwner}
                onChange={(e) => setCoOwner(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addCoOwner}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Co-owner
              </button>
            </div>
          </div>}

          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Real-time Events</h2>
            {events.map((event, index) => (
              <div key={index} className="mb-2 p-2 border">
                <p>Player: {event.args.player}</p>
                <p>Action: {event.args.action}</p>
                <p>When: {event.args.when.toString()}</p>
              </div>
            ))}

            <h2 className="text-xl font-bold mb-4 mt-8">Historical Events</h2>
            {isLoading ? (
              <div>Loading historical events...</div>
            ) : (
              historicalEvents.map((event, index) => (
                <div key={index} className="mb-2 p-2 border">
                  <p>Player: {event.args.player}</p>
                  <p>Action: {event.args.action}</p>
                  <p>When: {event.args.when.toString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
