"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Award } from 'lucide-react';
import { homeUsers } from '../data/homeUsers';
import UserProfilePage from './userProfile/page';
import SkillBadge from '../components/home/SkillBadge';
import UserCard from '../components/home/UserCard';
import Pagination from '../components/home/Pagination';
import RequestModal from '../components/home/RequestModal';

const AVAILABILITIES = [
  'All',
  'Weekdays',
  'Weekends',
  'Mornings',
  'Evenings',
  'Flexible',
];

const YOUR_SKILLS = ['JavaScript', 'React', 'UI/UX', 'Python', 'Node.js'];
const YOUR_WANTED_SKILLS = ['Graphic designer', 'Vue.js', 'Branding', 'DevOps', 'Web3'];

const generateAvatarUrl = (seed) => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewProfileUser, setViewProfileUser] = useState(null);
  const USERS_PER_PAGE = 6;

  const filteredUsers = useMemo(() => {
    return homeUsers.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.skillsOffered.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(search.toLowerCase()));
      const matchesAvailability =
        availability === 'All' || user.availability === availability;
      return matchesSearch && matchesAvailability;
    });
  }, [search, availability]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  const handleRequest = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    setModalOpen(false);
  };

  const handleViewProfile = (user) => {
    setViewProfileUser(user);
  };

  const handleBackFromProfile = () => {
    setViewProfileUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 md:px-10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 md:mb-0 tracking-tight drop-shadow-sm">
            Skill Swap Platform
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name or skill..."
                  className="w-full px-5 py-3 rounded-lg border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400" size={22} />
              </div>
              <div className="flex gap-2">
                <select
                  value={availability}
                  onChange={e => setAvailability(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
                >
                  {AVAILABILITIES.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {viewProfileUser ? (
            <UserProfilePage user={viewProfileUser} onBack={handleBackFromProfile} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onRequest={handleRequest}
                    onCardClick={handleViewProfile}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </AnimatePresence>
        <RequestModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          user={selectedUser}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
}