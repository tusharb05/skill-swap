// components/Footer.jsx
"use client"; // Necessary for Framer Motion

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // For the mini-branding link
import { Sparkles } from 'lucide-react'; // Import a cool icon

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 py-8 px-6 text-center border-t-4 border-blue-200 shadow-lg"
    >
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
        {/* Mini SkillSwap Branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 100 }}
          className="flex items-center justify-center space-x-2 text-blue-700"
        >
          <Sparkles size={24} className="text-yellow-500 transform rotate-12" /> {/* Thematic Icon */}
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-blue-800 transition-colors">
            SkillSwap
          </Link>
        </motion.div>

        {/* Copyright Text */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm text-gray-600 font-medium tracking-wide"
        >
          © {new Date().getFullYear()} SkillSwap Platform. All rights reserved.
        </motion.span>
      </div>
    </motion.footer>
  );
}