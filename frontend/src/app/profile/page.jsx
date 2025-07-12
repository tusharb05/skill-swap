// app/profile/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialUserData } from '../../data/profileData';
import AnimatedInput from '../../components/profile/AnimatedInput';
import AnimatedTextarea from '../../components/profile/AnimatedTextarea';
import ProfilePhoto from '../../components/profile/ProfilePhoto';
import SkillsSection from '../../components/profile/SkillsSection';

export default function UserProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserData, setTempUserData] = useState(initialUserData); // Initialize with user data
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newSkillType, setNewSkillType] = useState('offered'); // 'offered' or 'wanted'
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setTempUserData(userData); // Load current data into temp when entering edit mode
    }
  }, [isEditing, userData]);

  const handleEditClick = () => {
    console.log('Edit button clicked, setting isEditing to true');
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewSkillInput(''); // Clear any pending skill input
    setTempUserData(userData); // Reset temp data to current data
  };

  const handleSaveClick = () => {
    setUserData(tempUserData); // Save changes from temp to actual data
    setIsEditing(false);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000); // Hide message after 3 seconds
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('Field changed:', { name, value, type, checked });
    setTempUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() === '') return;

    setTempUserData(prev => {
      const currentSkills = newSkillType === 'offered' ? prev.skillsOffered : prev.skillsWanted;
      if (currentSkills.includes(newSkillInput.trim())) return prev; // Prevent duplicates

      return {
        ...prev,
        [newSkillType === 'offered' ? 'skillsOffered' : 'skillsWanted']: [...currentSkills, newSkillInput.trim()]
      };
    });
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove, type) => {
    setTempUserData(prev => {
      const currentSkills = type === 'offered' ? prev.skillsOffered : prev.skillsWanted;
      return {
        ...prev,
        [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: currentSkills.filter(s => s !== skillToRemove)
      };
    });
  };

  const handleProfilePhotoAction = (action) => {
    if (action === 'addEdit') {
      const newSeed = prompt("Enter a new name/seed for your avatar (e.g., 'Jane Doe'):");
      if (newSeed && newSeed.trim()) {
        setTempUserData(prev => ({ ...prev, profilePhotoSeed: newSeed.trim() }));
      }
    } else if (action === 'remove') {
      setTempUserData(prev => ({ ...prev, profilePhotoSeed: null }));
    }
  };

  const currentData = isEditing ? tempUserData : userData; // Use temp data when editing
  console.log('Current state:', { isEditing, userData, tempUserData, currentData });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10 font-sans"
    >
      {/* Save Message */}
      <AnimatePresence>
        {showSaveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Profile saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto border border-gray-100">
        {/* Header and Edit Button */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">My Profile</h1>
          <div className="flex items-center space-x-4">
            {isEditing && (
              <span className="text-sm text-blue-600 font-medium">Editing Mode</span>
            )}
            {!isEditing && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleEditClick}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                <span>Edit Profile</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Left Column */}
          <div className="space-y-6">
            {isEditing && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4">
                <p className="text-sm text-blue-700">You are now in edit mode. Click on any field to edit it.</p>
              </div>
            )}
            <AnimatedInput
              label="Name"
              name="name"
              value={currentData.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Your Name"
            />
            <AnimatedInput
              label="Location"
              name="location"
              value={currentData.location}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="City, Country"
            />
            <AnimatedTextarea
              label="Bio"
              name="bio"
              value={currentData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Right Column (Profile Photo) */}
          <ProfilePhoto
            userData={currentData}
            isEditing={isEditing}
            onPhotoAction={handleProfilePhotoAction}
          />
        </div>

        {/* Skills Section */}
        <SkillsSection
          userData={currentData}
          isEditing={isEditing}
          newSkillInput={newSkillInput}
          setNewSkillInput={setNewSkillInput}
          newSkillType={newSkillType}
          setNewSkillType={setNewSkillType}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
        />

        {/* Availability and Profile Visibility */}
        <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <AnimatedInput
            label="Availability"
            name="availability"
            value={currentData.availability}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="e.g., Weekends, Evenings"
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Profile Visibility</label>
            <div className="flex items-center space-x-3 mt-1">
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={currentData.isPublic}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label htmlFor="isPublic" className={`text-base font-medium ${isEditing ? 'text-gray-800' : 'text-gray-600'}`}>
                {currentData.isPublic ? 'Public' : 'Private'}
              </label>
              <span className="text-sm text-gray-500">
                ({currentData.isPublic ? 'Visible to everyone' : 'Visible only to you'})
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Save/Cancel) */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end space-x-4 mt-12 pt-8 border-t border-gray-200"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelClick}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveClick}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
              >
                Save Changes
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}