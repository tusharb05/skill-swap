import React from 'react';
import { motion } from 'framer-motion';

const FeedbackForm = ({ request, onSubmit, onClose }) => {
  const [rating, setRating] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert('Please provide a rating (1-5).');
      return;
    }
    onSubmit(rating, feedback);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close feedback form"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Provide Feedback</h2>
          <p className="text-gray-700 mb-4">You are completing the request with <span className="font-semibold">{request.name}</span>. Please provide a rating and optional feedback.</p>

          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5):</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Feedback (Optional):</label>
            <textarea
              id="feedback"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y"
              placeholder="Share your experience..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-green-600 text-white rounded-lg font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Submit & Complete
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm; 