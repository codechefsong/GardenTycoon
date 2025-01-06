import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectKitButton } from "connectkit";
import { Menu, X } from 'lucide-react';
import { useReadContract, useAccount } from 'wagmi';
import { stemPointsConfig } from '../contracts';

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: stemPointsConfig.address,
    abi: stemPointsConfig.abi,
    functionName: 'balanceOf',
    args: [address],
  })

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Gardens', href: '/gardens' },
    { label: 'Buy Garden', href: '/buyGarden' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="w-[100px]">
              <img src="logo.png" alt="logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
             <div>{balance?.toString()} SP</div>
            <ConnectKitButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className='ml-3'>{balance?.toString()} SP</div>
            <div className="pt-2">
              <ConnectKitButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
