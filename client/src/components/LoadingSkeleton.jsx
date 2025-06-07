import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full animate-pulse">
      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-md">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="w-48 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton; 