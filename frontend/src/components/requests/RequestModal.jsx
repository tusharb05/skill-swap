import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatusPill from './StatusPill';
import SkillBadge from './SkillBadge';

const generateAvatarUrl = (seed) => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;

const RequestModal = ({ request, onClose, onActionFromModal }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');

  // Reset form when request changes or modal reopens
  useEffect(() => {
    setShowFeedbackForm(false);
    setRating('');
    setFeedback('');
  }, [request]);

  const handleCompleteClick = () => {
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!rating) {
      alert('Please provide a rating (1-5).');
      return;
    }
    // Action 'complete' from modal, along with rating/feedback
    onActionFromModal(request.id, 'complete', rating, feedback);
  };

  const isPending = request.status === 'Pending';
  const isOngoing = request.status === 'Accepted';
  const isPast = request.status === 'Completed' || request.status === 'Rejected' || request.status === 'Discarded';

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
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md lg:max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        {!showFeedbackForm && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{request.name}'s Request</h2>

            <div className="flex items-center space-x-4 mb-4">
              <img
                src={generateAvatarUrl(request.name)}
                alt={`${request.name}'s avatar`}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-200"
              />
              <div>
                <p className="text-xl font-semibold text-gray-800">{request.name}</p>
                <p className="text-sm text-gray-600">Rating: <span className="font-medium text-blue-600">{request.rating}</span></p>
                <StatusPill status={request.status} />
              </div>
            </div>

            <div className="mb-4">
              <p className="text-md font-medium text-gray-700 mb-1">Skills Offered:</p>
              <div className="flex flex-wrap gap-1.5">
                {request.skillsOffered.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} type="offered" />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-md font-medium text-gray-700 mb-1">Skill Wanted:</p>
              <div className="flex flex-wrap gap-1.5">
                <SkillBadge skill={request.skillWanted} type="wanted" />
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 max-h-40 overflow-y-auto">
              <p className="text-md font-medium text-gray-700 mb-2">Message:</p>
              <p className="text-gray-800 text-sm leading-relaxed">{request.message}</p>
            </div>

            {isPending && (
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onActionFromModal(request.id, 'accept')}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Accept Request
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onActionFromModal(request.id, 'reject')}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Reject Request
                </motion.button>
              </div>
            )}

            {isOngoing && (
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCompleteClick}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Complete Request
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onActionFromModal(request.id, 'discard')}
                  className="px-5 py-2 bg-gray-600 text-white rounded-lg font-medium shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Discard Request
                </motion.button>
              </div>
            )}

            {isPast && (
                <div className="pt-3 border-t border-gray-100 text-sm text-gray-500 text-right">
                    This request was {request.status.toLowerCase()} on {new Date(request.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}.
                </div>
            )}
          </>
        )}

        {showFeedbackForm && (
          <form onSubmit={handleSubmitFeedback}>
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
                onClick={() => setShowFeedbackForm(false)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Back
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
        )}
      </motion.div>
    </motion.div>
  );
};

export default RequestModal; 