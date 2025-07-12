import React from 'react';
import { motion } from 'framer-motion';

const generateAvatarUrl = (seed) => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;

const ProfilePhoto = ({ userData, isEditing, onPhotoAction }) => {
  return (
    <div className="flex flex-col items-center md:items-end space-y-4">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 shadow-lg flex-shrink-0">
        {userData.profilePhotoSeed ? (
          <img
            src={generateAvatarUrl(userData.profilePhotoSeed)}
            alt={`${userData.name}'s avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
            No Photo
          </div>
        )}
      </div>
      {isEditing && (
        <div className="flex flex-col space-y-2 text-center md:text-right">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPhotoAction('addEdit')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            Add/Edit Photo
          </motion.button>
          {userData.profilePhotoSeed && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onPhotoAction('remove')}
              className="text-red-600 hover:text-red-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
            >
              Remove Photo
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto; 