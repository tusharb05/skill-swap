import React from 'react';

const FilterSearchBar = ({ filterStatus, searchTerm, onFilterChange, onSearchChange }) => {
  return (
    <div className="mb-12 bg-white p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 max-w-4xl mx-auto border border-gray-100">
      <div className="flex-1 w-full sm:w-auto">
        <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
        <select
          id="status-filter"
          className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white text-base appearance-none pr-8"
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Past">Past</option>
        </select>
      </div>

      <div className="relative flex-1 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search by name, skill, or message..."
          className="block w-full p-2.5 pl-9 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-base"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <svg
          className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default FilterSearchBar; 