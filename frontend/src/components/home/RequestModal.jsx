import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const YOUR_SKILLS = ['JavaScript', 'React', 'UI/UX', 'Python', 'Node.js'];
const YOUR_WANTED_SKILLS = ['Graphic designer', 'Vue.js', 'Branding', 'DevOps', 'Web3'];

function RequestModal({ open, onClose, user, onSubmit }) {
  if (!open || !user) return null;
  const offeredOptions = YOUR_SKILLS.filter(skill => user.skillsWanted.includes(skill));
  const wantedOptions = YOUR_WANTED_SKILLS.filter(skill => user.skillsOffered.includes(skill));
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setOfferedSkill('');
      setWantedSkill('');
      setMessage('');
      setSubmitted(false);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if ((offeredOptions.length && !offeredSkill) || (wantedOptions.length && !wantedSkill)) {
      return;
    }
    onSubmit({ offeredSkill, wantedSkill, message });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-200"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
          Send a Skill Swap Request to <span className="text-cyan-700">{user.name}</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="offeredSkill" className="block text-sm font-medium text-gray-700 mb-2">
              Choose one of your offered skills (they want)
            </label>
            <div className="relative">
              <select
                id="offeredSkill"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-700 bg-white appearance-none pr-10"
                value={offeredSkill}
                onChange={e => setOfferedSkill(e.target.value)}
                required={offeredOptions.length > 0}
                disabled={!offeredOptions.length}
              >
                <option value="">{offeredOptions.length ? 'Select a skill you offer...' : 'No matching skills you offer'}</option>
                {offeredOptions.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {submitted && !offeredSkill && offeredOptions.length > 0 && <div className="text-xs text-red-500 mt-1">Please select a skill you offer.</div>}
          </div>
          <div>
            <label htmlFor="wantedSkill" className="block text-sm font-medium text-gray-700 mb-2">
              Choose one of your wanted skills (they offer)
            </label>
            <div className="relative">
              <select
                id="wantedSkill"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-700 bg-white appearance-none pr-10"
                value={wantedSkill}
                onChange={e => setWantedSkill(e.target.value)}
                required={wantedOptions.length > 0}
                disabled={!wantedOptions.length}
              >
                <option value="">{wantedOptions.length ? 'Select a skill you want...' : 'No matching skills they offer'}</option>
                {wantedOptions.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {submitted && !wantedSkill && wantedOptions.length > 0 && <div className="text-xs text-red-500 mt-1">Please select a skill you want.</div>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-gray-700 bg-white"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              placeholder="Add a message (optional)"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow-sm hover:bg-gray-200 transition-all border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-70"
            >
              Send Request
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default RequestModal; 