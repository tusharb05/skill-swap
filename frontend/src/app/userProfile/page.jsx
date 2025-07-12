// app/UserProfilePage.jsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Briefcase, ChevronLeft, Lock, Users, Send } from 'lucide-react'; // Added icons

// Helper to generate a consistent avatar URL (same as in HomePage)
const generateAvatarUrl = (seed) => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;

// --- SkillBadge Component (re-used from HomePage) ---
const SkillBadge = ({ skill, type }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap mr-1.5 mb-1.5
    ${type === 'offered' ? 'bg-green-100 text-green-800 shadow-sm' : 'bg-blue-100 text-blue-800 shadow-sm'}`}>
    {skill}
  </span>
);

export default function UserProfilePage({ user, onBack }) {
  if (!user) {
    return null; // Or render a loading/error state
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-12 px-6 relative z-10"
    >
      {/* Background circles (re-used from HomePage for consistency) */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Back Button */}
      <div className="w-full max-w-4xl mb-8 flex justify-start relative z-20">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="inline-flex items-center px-5 py-2.5 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200 font-semibold border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-70"
        >
          <ChevronLeft size={20} className="mr-2" /> Back to Swappers
        </motion.button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-4xl border border-gray-100 relative overflow-hidden"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mb-8 pb-6 border-b border-gray-100">
          <div className="flex-shrink-0 relative mb-6 md:mb-0 md:mr-8">
            <img
              src={generateAvatarUrl(user.profilePhotoSeed)}
              alt={`${user.name}'s avatar`}
              className="w-32 h-32 rounded-full border-6 border-blue-400 shadow-xl object-cover bg-white animate-fade-in"
            />
            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white animate-pulse"></span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {user.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start text-lg text-gray-700 mb-2">
              <MapPin size={20} className="text-gray-500 mr-2" /> {user.location || 'Not specified'}
            </div>
            <div className="flex items-center justify-center md:justify-start text-lg text-gray-700">
              <Star size={20} className="text-yellow-400 mr-2" fill="currentColor" />
              <span className="font-bold text-blue-600">{user.rating.toFixed(1)}/5</span> (Based on {user.reviewsCount || 0} reviews)
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Briefcase size={22} className="text-green-500 mr-2" /> Skills Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.length > 0 ? (
                user.skillsOffered.map((skill, i) => (
                  <SkillBadge key={i} skill={skill} type="offered" />
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No skills offered yet.</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Users size={22} className="text-purple-500 mr-2" /> Skills Wanted
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.length > 0 ? (
                user.skillsWanted.map((skill, i) => (
                  <SkillBadge key={i} skill={skill} type="wanted" />
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No skills wanted yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Availability & Profile Status */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Availability & Status</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg">
            <div className="flex items-center text-gray-700 bg-blue-50 px-4 py-2 rounded-lg shadow-sm border border-blue-100">
              <span className="font-semibold mr-2">Availability:</span>
              <span className="text-blue-700">{user.availability}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-purple-50 px-4 py-2 rounded-lg shadow-sm border border-purple-100">
              <span className="font-semibold mr-2">Profile Status:</span>
              <span className="text-purple-700 flex items-center">
                {user.isPublic ? (
                  <>
                    <Users size={18} className="mr-1" /> Public
                  </>
                ) : (
                  <>
                    <Lock size={18} className="mr-1" /> Private
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button (e.g., Send Request - if not already on modal, or a "Connect" button) */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          // This button could open the request modal or directly send a request
          // For now, let's keep it similar to the request button on the home page
          onClick={() => alert(`Simulating request to ${user.name}`)}
          className="w-full px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-70 flex items-center justify-center space-x-2 mt-6"
        >
          <Send size={20} />
          <span>Send Swap Request</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}