// app/admin/layout.jsx
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Wrench, RefreshCw, Megaphone, LogOut, ChevronRight } from 'lucide-react';

import "../../app/globals.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/skills", icon: Wrench, label: "Manage Skills" },
    { href: "/admin/users", icon: Users, label: "Manage Users" },
    { href: "/admin/swaps", icon: RefreshCw, label: "Monitor Swaps" },
    { href: "/admin/messages", icon: Megaphone, label: "Send Messages" },
  ];

  const sidebarVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15, staggerChildren: 0.1 } },
  };

  const navItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    hover: { scale: 1.05, x: 5, color: 'rgba(255, 255, 255, 0.9)' },
    tap: { scale: 0.98 },
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Admin Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="w-64 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex flex-col py-8 px-6 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zm1 6v-1L1 0h1L6 4V0h-1z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <motion.h1
          className="text-4xl font-extrabold mb-12 tracking-tight flex items-center gap-3 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <LayoutDashboard size={32} className="text-blue-300" />
          Admin Panel
        </motion.h1>

        <motion.nav className="flex flex-col gap-4 text-lg font-semibold relative z-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/admin" && pathname === "/admin/dashboard");
            return (
              <Link key={item.href} href={item.href} passHref>
                <motion.a
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ease-out cursor-pointer group
                    ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-200 hover:bg-blue-600/30 hover:text-white'}`}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <item.icon size={22} className={`transition-transform duration-200 ${isActive ? 'text-blue-50' : 'text-blue-300 group-hover:text-white'}`} />
                  <span>{item.label}</span>
                  <motion.div
                    className="ml-auto"
                    initial={{ x: -10, opacity: 0 }}
                    animate={isActive ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                </motion.a>
              </Link>
            );
          })}
        </motion.nav>

        {/* Logout Button */}
        <motion.button
          onClick={() => console.log("Admin Logout")}
          className="mt-auto flex items-center gap-3 py-3 px-4 rounded-lg text-red-300 hover:bg-red-600 hover:text-white transition-all duration-300 font-semibold relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.03, x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={22} />
          <span>Log Out</span>
        </motion.button>
      </motion.aside>

      {/* Main Content Area: Padding decreased from p-10 to p-6 */}
      <main
        className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-white overflow-y-auto"
      >
        {children}
      </main>
    </div>
  );
}