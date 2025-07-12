import React from 'react';

const SkillBadge = ({ skill, type = 'offered' }) => {
  const badgeColor = type === 'offered' ? 'bg-indigo-50 text-indigo-700' : 'bg-teal-50 text-teal-700';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
      {skill}
    </span>
  );
};

export default SkillBadge; 