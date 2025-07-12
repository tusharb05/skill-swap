import React from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import SkillBadge from "./SkillBadge";

const generateAvatarUrl = (seed) => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;

const UserCard = ({ user, onRequest, onCardClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
    whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)", y: -5 }}
    className="bg-white rounded-3xl shadow-lg p-7 flex flex-col h-full border border-gray-100 cursor-pointer overflow-hidden relative group"
    onClick={() => onCardClick(user)}
    style={{ minHeight: 320 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl pointer-events-none"></div>
    <div className="flex-shrink-0 relative z-10">
      <img
        src={generateAvatarUrl(user.profilePhotoSeed)}
        alt={`${user.name}'s avatar`}
        className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-xl object-cover bg-white animate-fade-in"
      />
    </div>
    <div className="flex-1 w-full relative z-10 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-2">
        <h2 className="text-2xl font-extrabold text-gray-900 leading-tight md:mb-0">{user.name}</h2>
        <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full shadow-sm">{user.availability}</span>
      </div>
      <div className="mt-3 mb-2">
        <span className="text-sm font-semibold text-green-700 block mb-1">Skills Offered:</span>
        <div className="flex flex-wrap">
          {user.skillsOffered.map((skill, i) => (
            <SkillBadge key={i} skill={skill} type="offered" />
          ))}
        </div>
      </div>
      <div className="mb-3">
        <span className="text-sm font-semibold text-purple-700 block mb-1">Skill Wanted:</span>
        <div className="flex flex-wrap">
          {user.skillsWanted.map((skill, i) => (
            <SkillBadge key={i} skill={skill} type="wanted" />
          ))}
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
          Rating <span className="font-bold text-blue-600 ml-1">{user.rating.toFixed(1)}/5</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={(e) => { e.stopPropagation(); onRequest(user); }}
          className="px-7 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-70 flex items-center space-x-2"
        >
          <Send size={18} />
          <span>Request</span>
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default UserCard;