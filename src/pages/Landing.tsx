import React from 'react';
import { ChevronRight, } from 'lucide-react';

const LandingPage: React.FC = () => {
  const howItWorks = [
    {
      icon: <img className="w-16 h-16 text-green-500" src="/icon1.png" alt="Icon 1"/>,
      title: "Plant Your Seeds",
      description: "Start your journey by planting flower seeds in your virtual garden. Choose from a variety of beautiful species."
    },
    {
      icon: <img className="w-16 h-16 text-red-500" src="/icon2.png" alt="Icon 2"/>,
      title: "Care Together",
      description: "Tend to your garden with your loved one. Water the flowers, remove weeds, and watch your relationship bloom alongside your garden."
    },
    {
      icon: <img className="w-16 h-16 text-yellow-500" src="/icon3.png" alt="Icon 3"/>,
      title: "Collect Rewards",
      description: "Harvest daily tokens from your thriving flowers. The better you care for them, the more rewards you'll receive."
    },
    {
      icon: <img className="w-16 h-16 text-purple-500" src="/icon4.png" alt="Icon 4"/>,
      title: "Mint Memory NFTs",
      description: "Transform your most beautiful blooms into NFTs, creating lasting digital mementos of your shared gardening journey."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-green-800 mb-6">
            A Bonding Game between You and Your Loved Ones
          </h1>
          <p className="text-xl text-green-700 mb-8">
            by nourishing a garden of flowers with collaborative care
          </p>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            Start Gardening Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 bg-white/40">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {howItWorks.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="flex justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                {step.title}
              </h3>
              <p className="text-green-700">
                {step.description}
              </p>
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 -right-4 transform translate-x-1/2">
                  <ChevronRight className="w-8 h-8 text-green-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Ready to Start Your Garden Adventure?
        </h2>
        <p className="text-lg text-green-700 mb-8 max-w-2xl mx-auto">
          Join thousands of gardeners creating their own virtual paradise. Start with your first flower today!
        </p>
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full transition-colors duration-200 flex items-center justify-center mx-auto"
        >
          Play Now
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
