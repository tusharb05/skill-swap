import React from 'react';

const StatusPill = ({ status }) => {
  let bgColor;
  let textColor;
  let statusText = status;

  switch (status) {
    case 'Pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      break;
    case 'Accepted': // For Ongoing
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
      statusText = 'Ongoing'; // Display "Ongoing" for "Accepted" status
      break;
    case 'Completed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'Rejected':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
    case 'Discarded': // New status
      bgColor = 'bg-gray-200';
      textColor = 'text-gray-700';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-700';
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} flex items-center whitespace-nowrap`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: textColor.replace('text-', '') }}></span>
      {statusText}
    </span>
  );
};

export default StatusPill; 