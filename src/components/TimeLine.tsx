import React from 'react';
import { formatAddress } from '../utils/address';
import { formatDate } from '../utils/time';

const TimeLine: React.FC<{
  events: any[],
  historicalEvents: any[],
  isLoading?: boolean
}> = ({ events, historicalEvents, isLoading }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Event Timeline</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {historicalEvents.map((event) => (
            <div key={event.transactionHash} className="mb-8 relative">
              <div className="absolute left-4 -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
              
              <div className="ml-12 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {formatDate(event.args.when.toString())}
                  </span>
                  <span className="text-sm text-gray-400">
                    Block #{event.blockNumber.toString()}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium">Address: </span>
                  <span className="font-mono text-sm">
                    {formatAddress(event.args.player)}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium mr-2">Action:</span>
                  <span className="text-green-600">
                    {event.args.action}
                  </span>
                </div>

                <a
                  href={`https://block-explorer.testnet.lens.dev/tx/${event.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-500 hover:text-green-600 mt-2 inline-block"
                >
                  View on Block Explorer →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {events.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">New Events</h3>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div 
                key={index}
                className="p-4 bg-green-50 border border-green-100 rounded-lg animate-fade-in"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">
                    {formatAddress(event.args.player)}
                  </span>
                  <span className="text-green-600 font-medium">
                    Action: {event.args.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeLine