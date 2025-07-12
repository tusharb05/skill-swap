"use client";

import { swaps } from "@/data/adminData";
import { useState } from "react";

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  accepted: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
};

export default function SwapMonitoringSection() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSwaps = swaps.filter(swap => {
    const matchesFilter = filter === "all" || swap.status === filter;
    const matchesSearch = searchTerm === "" || 
      swap.user1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      swap.user2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      swap.skill1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      swap.skill2.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Swap Monitoring</h2>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setFilter("all")} 
            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${filter === "all" ? "bg-blue-700 text-white shadow-lg" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
          >
            All ({swaps.length})
          </button>
          <button 
            onClick={() => setFilter("pending")} 
            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${filter === "pending" ? "bg-blue-700 text-white shadow-lg" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
          >
            Pending ({swaps.filter(s => s.status === "pending").length})
          </button>
          <button 
            onClick={() => setFilter("accepted")} 
            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${filter === "accepted" ? "bg-blue-700 text-white shadow-lg" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
          >
            Accepted ({swaps.filter(s => s.status === "accepted").length})
          </button>
          <button 
            onClick={() => setFilter("cancelled")} 
            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${filter === "cancelled" ? "bg-blue-700 text-white shadow-lg" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
          >
            Cancelled ({swaps.filter(s => s.status === "cancelled").length})
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search swaps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 text-left font-semibold text-blue-800">User 1</th>
              <th className="p-4 text-left font-semibold text-blue-800">User 2</th>
              <th className="p-4 text-left font-semibold text-blue-800">Skill 1</th>
              <th className="p-4 text-left font-semibold text-blue-800">Skill 2</th>
              <th className="p-4 text-left font-semibold text-blue-800">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSwaps.map((swap, index) => (
              <tr 
                key={swap.id} 
                className="border-b last:border-none hover:bg-blue-50 transition-colors duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="p-4 font-medium">{swap.user1}</td>
                <td className="p-4 font-medium">{swap.user2}</td>
                <td className="p-4 text-blue-600">{swap.skill1}</td>
                <td className="p-4 text-blue-600">{swap.skill2}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[swap.status]} animate-pulse`}>
                    {swap.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredSwaps.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg">No swaps found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
} 