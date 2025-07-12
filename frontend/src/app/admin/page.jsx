// app/admin/page.jsx (or app/admin/dashboard/page.jsx)
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Crown, Wrench, Users, RefreshCw, Megaphone } from 'lucide-react';

export default function AdminDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger for smaller items
        delayChildren: 0.2,   // Reduced delay
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 }, // Reduced y translation
    visible: { y: 0, opacity: 1 },
  };

  const cardVariants = {
    initial: { y: 0, scale: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }, // Smaller initial shadow
    hover: {
      y: -5, // Reduced lift
      scale: 1.02, // Reduced scale
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)', // Reduced hover shadow
      transition: { type: "spring", stiffness: 300, damping: 20 } // Slightly more subtle spring
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6 lg:px-8" // py-10 -> py-6
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div
        className="mb-8 text-center" // mb-12 -> mb-8
        variants={itemVariants}
      >
        <motion.div
          className="mb-4 flex justify-center" // mb-6 -> mb-4
          initial={{ rotate: 0, scale: 0.8 }}
          animate={{ rotate: 10, scale: 1 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 3, ease: "easeInOut" }}
        >
          <Crown size={64} className="text-yellow-500 drop-shadow-md" /> {/* size={96} -> size={64}, shadow-lg -> shadow-md */}
        </motion.div>
        <motion.h2
          className="text-4xl font-extrabold text-blue-800 mb-2 tracking-tight" // text-6xl -> text-4xl, mb-4 -> mb-2
          initial={{ y: -15, opacity: 0 }} // Reduced y translation
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }} // Reduced delay and duration
        >
          Welcome, Admin!
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 max-w-2xl leading-relaxed" // text-xl -> text-lg, max-w-3xl -> max-w-2xl
          initial={{ y: -5, opacity: 0 }} // Reduced y translation
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }} // Reduced delay and duration
        >
          Take control of your platform! Manage skills, users, swaps, and send platform-wide messages with powerful admin tools.
        </motion.p>
      </motion.div>

      {/* Admin Action Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl" // gap-8 -> gap-6, max-w-5xl -> max-w-4xl
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card 1: Moderate Skills */}
        <Link href="/admin/skills" passHref>
          <motion.a
            className="block p-6 bg-white rounded-2xl shadow-md border border-blue-100 text-center cursor-pointer overflow-hidden relative group" // p-10 -> p-6, rounded-3xl -> rounded-2xl, shadow-xl -> shadow-md
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <motion.div
                className="mb-4 flex justify-center text-blue-600 group-hover:text-white transition-colors duration-300" // mb-5 -> mb-4
                initial={{ rotate: 0 }}
                group-hover="rotate"
                variants={{ rotate: { rotate: [0, 10, -10, 0], transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } } }}
              >
                <Wrench size={48} /> {/* size={64} -> size={48} */}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">Moderate Skills</h3> {/* text-2xl -> text-xl, mb-3 -> mb-2 */}
              <p className="text-sm text-gray-600 group-hover:text-blue-100 transition-colors duration-300">Approve or reject skill submissions to maintain quality.</p> {/* text-base -> text-sm */}
            </div>
          </motion.a>
        </Link>

        {/* Card 2: Manage Users */}
        <Link href="/admin/users" passHref>
          <motion.a
            className="block p-6 bg-white rounded-2xl shadow-md border border-purple-100 text-center cursor-pointer overflow-hidden relative group"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <motion.div
                className="mb-4 flex justify-center text-purple-600 group-hover:text-white transition-colors duration-300"
                initial={{ y: 0 }}
                group-hover="bounceY"
                variants={{ bounceY: { y: [0, -7, 0], transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } } }} // Reduced bounce height
              >
                <Users size={48} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">Manage Users</h3>
              <p className="text-sm text-gray-600 group-hover:text-purple-100 transition-colors duration-300">Oversee user accounts, ban, or unban platform members.</p>
            </div>
          </motion.a>
        </Link>

        {/* Card 3: Monitor Swaps */}
        <Link href="/admin/swaps" passHref>
          <motion.a
            className="block p-6 bg-white rounded-2xl shadow-md border border-green-100 text-center cursor-pointer overflow-hidden relative group"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <motion.div
                className="mb-4 flex justify-center text-green-600 group-hover:text-white transition-colors duration-300"
                initial={{ rotate: 0 }}
                group-hover="spin"
                variants={{ spin: { rotate: 360, transition: { duration: 1.5, repeat: Infinity, ease: "linear" } } }} // Faster spin
              >
                <RefreshCw size={48} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">Monitor Swaps</h3>
              <p className="text-sm text-gray-600 group-hover:text-green-100 transition-colors duration-300">Track all skill exchange activities and resolve disputes.</p>
            </div>
          </motion.a>
        </Link>

        {/* Card 4: Send Messages */}
        <Link href="/admin/messages" passHref>
          <motion.a
            className="block p-6 bg-white rounded-2xl shadow-md border border-red-100 text-center cursor-pointer overflow-hidden relative group"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <motion.div
                className="mb-4 flex justify-center text-red-600 group-hover:text-white transition-colors duration-300"
                initial={{ x: 0 }}
                group-hover="shake"
                variants={{ shake: { x: [0, -3, 3, -3, 3, 0], transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" } } }} // Reduced shake intensity and duration
              >
                <Megaphone size={48} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">Send Messages</h3>
              <p className="text-sm text-gray-600 group-hover:text-red-100 transition-colors duration-300">Broadcast important announcements to all platform users.</p>
            </div>
          </motion.a>
        </Link>
      </motion.div>
    </motion.div>
  );
}