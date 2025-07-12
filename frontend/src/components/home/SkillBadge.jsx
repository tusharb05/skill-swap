import React from "react";

const SkillBadge = ({ skill, type }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap mr-1.5 mb-1.5 ${type === 'offered' ? 'bg-green-100 text-green-800 shadow-sm' : 'bg-blue-100 text-blue-800 shadow-sm'}`}>
    {skill}
  </span>
);

export default SkillBadge; 