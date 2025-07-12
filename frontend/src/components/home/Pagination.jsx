import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-12 mb-8">
      <nav className="flex space-x-2 bg-white/90 p-2.5 rounded-xl shadow-lg border border-gray-200">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
        >
          &lt; Previous
        </motion.button>
        {pages.map((page) => (
          <motion.button
            key={page}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg text-base font-medium transition-all shadow-sm
              ${page === currentPage
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold transform scale-105'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
          >
            {page}
          </motion.button>
        ))}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
        >
          Next &gt;
        </motion.button>
      </nav>
    </div>
  );
};

export default Pagination; 