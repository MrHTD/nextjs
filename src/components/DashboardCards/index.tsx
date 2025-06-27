import React from 'react';

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 text-gray-500 text-center py-4 rounded-lg shadow-sm w-3/4 sm:w-full mx-auto"
        >
          {index + 1} Yesterday
        </div>
      ))}
    </div>
  );
}
