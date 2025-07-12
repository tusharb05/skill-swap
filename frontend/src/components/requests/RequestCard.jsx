import React from 'react';
import { motion } from 'framer-motion';
import StatusPill from './StatusPill';
import SkillBadge from './SkillBadge';

const generateAvatarUrl = (seed) => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;

const RequestCard = ({ request, onAction, onClick }) => {
  const isPending = request.status === 'Pending';
  const isOngoing = request.status === 'Accepted';

  const handleActionClick = (e, actionType) => {
    e.stopPropagation(); // Prevent modal from opening
    onAction(request.id, actionType);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
      className="bg-white rounded-xl shadow-lg p-5 flex flex-col space-y-4 border border-gray-100 cursor-pointer"
      onClick={() => onClick(request)} // Open modal on card click
    >
      {/* Top Section: Profile and Name */}
      <div className="flex items-center space-x-3">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-blue-100">
          <img
            src={generateAvatarUrl(request.name)}
            alt={`${request.name}'s avatar`}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">{request.name}</h3>
          <p className="text-xs text-gray-600 mt-0.5">Rating: <span className="font-medium text-blue-600">{request.rating}</span></p>
        </div>
        <div className="flex-shrink-0">
          <StatusPill status={request.status} />
        </div>
      </div>

      {/* Middle Section: Skills */}
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Skills Offered:</p>
          <div className="flex flex-wrap gap-1.5">
            {request.skillsOffered.map((skill, index) => (
              <SkillBadge key={index} skill={skill} type="offered" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Skill Wanted:</p>
          <div className="flex flex-wrap gap-1.5">
            <SkillBadge skill={request.skillWanted} type="wanted" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Actions */}
      {isPending && (
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleActionClick(e, 'accept')}
            className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Accept
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleActionClick(e, 'reject')}
            className="flex-1 py-2 px-3 bg-red-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Reject
          </motion.button>
        </div>
      )}
      {isOngoing && (
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleActionClick(e, 'complete')} // Triggers feedback form
            className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Complete
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleActionClick(e, 'discard')}
            className="flex-1 py-2 px-3 bg-gray-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Discard
          </motion.button>
        </div>
      )}
      {!isPending && !isOngoing && (
        <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 text-right">
           Request {request.status.toLowerCase()} on {new Date(request.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      )}
    </motion.div>
  );
};

export default RequestCard; 