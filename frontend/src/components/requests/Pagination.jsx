import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10">
      <nav className="flex space-x-1.5 bg-white p-1.5 rounded-lg shadow-sm border border-gray-200">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          &lt; Previous
        </motion.button>
        {pages.map((page) => (
          <motion.button
            key={page}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium ${
              page === currentPage
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            {page}
          </motion.button>
        ))}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          Next &gt;
        </motion.button>
      </nav>
    </div>
  );
};

export default Pagination; 