"use client";

import { users } from "@/data/adminData";
import { useState } from "react";
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import SuccessMessage from "@/components/admin/SuccessMessage";

export default function UserManagementSection() {
  const [userList, setUserList] = useState(users);
  const [modalState, setModalState] = useState({ isOpen: false, action: null, user: null });
  const [successMessage, setSuccessMessage] = useState({ isVisible: false, message: "" });

  const handleBan = (user) => {
    setModalState({ isOpen: true, action: "ban", user });
  };

  const handleUnban = async (id) => {
    setUserList(userList.map(u => u.id === id ? { ...u, banned: false } : u));
    setSuccessMessage({ isVisible: true, message: "User unbanned successfully!" });
  };

  const confirmBan = async (reason) => {
    const user = modalState.user;
    setUserList(userList.map(u => 
      u.id === user.id 
        ? { ...u, banned: true, banReason: reason } 
        : u
    ));
    setSuccessMessage({ isVisible: true, message: "User banned successfully!" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-800">User Management</h2>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id} className="border-b last:border-none">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${user.banned ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>{user.banned ? "Banned" : "Active"}</span>
              </td>
              <td className="p-3 flex gap-2">
                {user.banned ? (
                  <button 
                    onClick={() => handleUnban(user.id)} 
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-200 hover:scale-105"
                  >
                    Unban
                  </button>
                ) : (
                  <button 
                    onClick={() => handleBan(user)} 
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-200 hover:scale-105"
                  >
                    Ban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, action: null, user: null })}
        onConfirm={confirmBan}
        title="Ban User"
        message={`Are you sure you want to ban ${modalState.user?.name} (${modalState.user?.email})?`}
        actionText="Ban User"
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