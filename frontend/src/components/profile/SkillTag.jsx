import React from 'react';
import { motion } from 'framer-motion';

const SkillTag = ({ skill, onRemove, editable }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.2 }}
    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
  >
    <span>{skill}</span>
    {editable && (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        aria-label={`Remove ${skill}`}
      >
        &times;
      </motion.button>
    )}
  </motion.div>
);

export default SkillTag; 