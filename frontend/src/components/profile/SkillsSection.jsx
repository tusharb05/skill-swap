import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillTag from './SkillTag';

const SkillsSection = ({ 
  userData, 
  isEditing, 
  newSkillInput, 
  setNewSkillInput, 
  newSkillType, 
  setNewSkillType, 
  onAddSkill, 
  onRemoveSkill 
}) => {
  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Skills Offered */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Skills Offered</h3>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
            <AnimatePresence>
              {userData.skillsOffered.map((skill, index) => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  onRemove={() => onRemoveSkill(skill, 'offered')}
                  editable={isEditing}
                />
              ))}
            </AnimatePresence>
          </div>
          {isEditing && (
            <form onSubmit={onAddSkill} className="flex space-x-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add new skill..."
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newSkillType}
                onChange={(e) => setNewSkillType(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="offered">Offered</option>
                <option value="wanted">Wanted</option>
              </select>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </motion.button>
            </form>
          )}
        </div>

        {/* Skills Wanted */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Skills Wanted</h3>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
            <AnimatePresence>
              {userData.skillsWanted.map((skill, index) => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  onRemove={() => onRemoveSkill(skill, 'wanted')}
                  editable={isEditing}
                />
              ))}
            </AnimatePresence>
          </div>
          {/* Add skill input is shared above, so no separate input here */}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection; 