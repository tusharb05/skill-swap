"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LogIn, LogOut, UserCog, MessageSquareMore } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowProfileDropdown(false);
    console.log("User logged in!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    console.log("User logged out!");
  };

  const handleLinkClick = () => {
    setShowProfileDropdown(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className="bg-white shadow-lg py-4 px-6 md:px-12 flex items-center relative z-40 border-b border-gray-100"
    >
      <div className="flex-1 flex items-center"></div>
      <Link href="/" className="flex items-center justify-center group flex-grow-0 flex-shrink-0">
        <motion.span
          className="text-4xl font-extrabold text-blue-600 tracking-tight whitespace-nowrap"
          whileHover={{ scale: 1.05, color: "#4A90E2" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          SkillSwap
        </motion.span>
      </Link>
      <div className="flex-1 flex items-center justify-end space-x-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200"
          aria-label="Notifications"
        >
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </motion.button>
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-haspopup="true"
            aria-expanded={showProfileDropdown}
          >
            <User size={24} />
            <span className="hidden md:inline text-sm font-medium">
              {isLoggedIn ? 'Account' : 'Guest'}
            </span>
            <motion.svg
              className="w-4 h-4 ml-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: showProfileDropdown ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </motion.svg>
          </motion.button>
          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 origin-top-right"
              >
                {!isLoggedIn ? (
                  <>
                    <motion.div
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center space-x-2"
                      onClick={() => { handleLogin(); handleLinkClick(); }}
                    >
                      <LogIn size={18} />
                      <span>Login (Simulated)</span>
                    </motion.div>
                    <Link href="/auth" passHref>
                      <motion.div
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center space-x-2"
                        onClick={handleLinkClick}
                      >
                        <UserCog size={18} />
                        <span>Sign Up</span>
                      </motion.div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/profile" passHref>
                      <motion.div
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center space-x-2"
                        onClick={handleLinkClick}
                      >
                        <UserCog size={18} />
                        <span>My Profile</span>
                      </motion.div>
                    </Link>
                    <Link href="/requests" passHref>
                      <motion.div
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center space-x-2"
                        onClick={handleLinkClick}
                      >
                        <MessageSquareMore size={18} />
                        <span>Requests</span>
                      </motion.div>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <motion.div
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      className="block px-4 py-2 text-sm text-red-600 hover:text-red-700 cursor-pointer flex items-center space-x-2"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span>Log out (Simulated)</span>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}