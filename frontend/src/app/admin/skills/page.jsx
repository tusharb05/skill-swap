"use client";

import { skills } from "@/data/adminData";
import { useState } from "react";
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import SuccessMessage from "@/components/admin/SuccessMessage";

export default function SkillModerationSection() {
  const [skillList, setSkillList] = useState(skills);
  const [modalState, setModalState] = useState({ isOpen: false, action: null, skill: null });
  const [successMessage, setSuccessMessage] = useState({ isVisible: false, message: "" });

  const handleApprove = async (id) => {
    setSkillList(skillList.map(s => s.id === id ? { ...s, status: "approved" } : s));
    setSuccessMessage({ isVisible: true, message: "Skill approved successfully!" });
  };

  const handleReject = (skill) => {
    setModalState({ isOpen: true, action: "reject", skill });
  };

  const confirmReject = async (reason) => {
    const skill = modalState.skill;
    setSkillList(skillList.map(s => 
      s.id === skill.id 
        ? { ...s, status: "rejected", rejectionReason: reason } 
        : s
    ));
    setSuccessMessage({ isVisible: true, message: "Skill rejected successfully!" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Skill Moderation</h2>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Skill</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skillList.map(skill => (
            <tr key={skill.id} className="border-b last:border-none">
              <td className="p-3">{skill.user}</td>
              <td className="p-3">{skill.name}</td>
              <td className="p-3">{skill.description}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${skill.status === "pending" ? "bg-yellow-200 text-yellow-800" : skill.status === "approved" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{skill.status}</span>
              </td>
              <td className="p-3 flex gap-2">
                <button 
                  disabled={skill.status !== "pending"} 
                  onClick={() => handleApprove(skill.id)} 
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-all duration-200 hover:scale-105"
                >
                  Approve
                </button>
                <button 
                  disabled={skill.status !== "pending"} 
                  onClick={() => handleReject(skill)} 
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-all duration-200 hover:scale-105"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, action: null, skill: null })}
        onConfirm={confirmReject}
        title="Reject Skill"
        message={`Are you sure you want to reject "${modalState.skill?.name}" by ${modalState.skill?.user}?`}
        actionText="Reject Skill"
        reasonRequired={true}
      />
      
      <SuccessMessage
        message={successMessage.message}
        isVisible={successMessage.isVisible}
        onClose={() => setSuccessMessage({ isVisible: false, message: "" })}
      />
    </div>
  );
} 