"use client";

import { useState } from "react";
import { messages as initialMessages } from "@/data/adminData";
import SuccessMessage from "@/components/admin/SuccessMessage";

export default function PlatformMessagesSection() {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ isVisible: false, message: "" });

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsSending(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessages([
      { id: Date.now(), text, date: new Date().toLocaleString() },
      ...messages,
    ]);
    setText("");
    setIsSending(false);
    setSuccessMessage({ isVisible: true, message: "Message sent to all users!" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Platform-wide Messages</h2>
      <form onSubmit={handleSend} className="flex gap-4 mb-8">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={isSending}
          className="flex-1 px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          placeholder="Type your message..."
        />
        <button 
          type="submit" 
          disabled={isSending || !text.trim()}
          className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 hover:scale-105"
        >
          {isSending && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={msg.id} 
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col animate-fade-in hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-blue-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-blue-900 font-medium text-lg mb-2">{msg.text}</span>
            <span className="text-xs text-blue-400">{msg.date}</span>
          </div>
        ))}
      </div>
      
      <SuccessMessage
        message={successMessage.message}
        isVisible={successMessage.isVisible}
        onClose={() => setSuccessMessage({ isVisible: false, message: "" })}
      />
    </div>
  );
} 