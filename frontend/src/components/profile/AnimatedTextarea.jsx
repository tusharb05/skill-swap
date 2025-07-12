import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTextarea = ({ 
  label, 
  name,
  value, 
  onChange, 
  placeholder, 
  disabled = false, 
  className = '' 
}) => (
  <div className={`relative flex flex-col ${className}`}>
    <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
    <motion.textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows="4"
      className={`w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.25)" }}
    />
  </div>
);

export default AnimatedTextarea; 