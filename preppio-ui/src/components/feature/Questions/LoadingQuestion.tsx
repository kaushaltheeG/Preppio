import React from 'react';

const LoadingQuestion: React.FC = () => {
  return (
    <div className="
      flex
      gap-4
      items-center
      justify-between
      bg-white
      border
      border-gray-200
      shadow-sm
      p-2
      rounded-md
      animate-pulse"
    >
      <div className="min-w-[40px] h-8 bg-gray-200 rounded"></div>
      <div className="flex-grow space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="flex items-center gap-2 pl-2 ml-auto">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingQuestion;
