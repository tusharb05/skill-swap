// app/auth/page.jsx
"use client"; // This is necessary for using client-side features like useState

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper for Avatar Generation (for aesthetic background) ---
const generateRandomAvatarUrl = () => {
  const seed = Math.random().toString(36).substring(2, 15); // Random string for unique avatar
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
};

// --- Animated Input Component (reused from profile page, slightly adapted) ---
const AnimatedInput = ({ label, name, value, onChange, placeholder, type = 'text', error = '', className = '' }) => (
  <div className={`relative flex flex-col ${className}`}>
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <motion.input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-800 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500 transition-all duration-200`}
      whileFocus={{ scale: 1.01, boxShadow: `0 0 0 4px ${error ? 'rgba(239, 68, 68, 0.25)' : 'rgba(59, 130, 246, 0.25)'}` }}
    />
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-red-500 text-xs mt-1"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// --- Main Auth Page Component ---
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});

  // Signup form states
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupErrors, setSignupErrors] = useState({});

  const [authMessage, setAuthMessage] = useState({ type: '', text: '' }); // 'success' or 'error'

  // Clear messages and errors when switching forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setAuthMessage({ type: '', text: '' });
    setLoginErrors({});
    setSignupErrors({});
    // Clear signup form fields when switching
    if (isLogin) {
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupConfirmPassword('');
    }
  };

  // --- Validation Functions ---
  const validateName = (name) => {
    if (!name) return 'Name is required.';
    if (name.trim().length < 2) return 'Name must be at least 2 characters.';
    if (name.trim().length > 50) return 'Name must be less than 50 characters.';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email address is invalid.';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const validateLoginForm = () => {
    const errors = {};
    errors.email = validateEmail(loginEmail);
    errors.password = validatePassword(loginPassword);
    setLoginErrors(errors);
    return Object.values(errors).every(error => !error); // True if no errors
  };

  const validateSignupForm = () => {
    const errors = {};
    errors.name = validateName(signupName);
    errors.email = validateEmail(signupEmail);
    errors.password = validatePassword(signupPassword);
    if (signupPassword !== signupConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    setSignupErrors(errors);
    return Object.values(errors).every(error => !error);
  };

  // --- Form Submission Handlers ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthMessage({ type: '', text: '' }); // Clear previous messages

    if (validateLoginForm()) {
      // Simulate API call
      console.log('Attempting login with:', { email: loginEmail, password: loginPassword });
      // In a real app, you'd send this to your backend
      // Example: await loginUser(loginEmail, loginPassword);

      // Simulate success/failure
      if (loginEmail === 'test@example.com' && loginPassword === 'password123') {
        setAuthMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        // Simulate redirection
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          // window.location.href = '/dashboard'; // Actual redirection
        }, 1500);
      } else {
        setAuthMessage({ type: 'error', text: 'Invalid email or password.' });
      }
    } else {
      setAuthMessage({ type: 'error', text: 'Please correct the errors in the form.' });
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setAuthMessage({ type: '', text: '' }); // Clear previous messages

    if (validateSignupForm()) {
      // Simulate API call
      console.log('Attempting signup with:', { name: signupName, email: signupEmail, password: signupPassword });
      // In a real app, you'd send this to your backend
      // Example: await signupUser(signupName, signupEmail, signupPassword);

      // Simulate success
      setAuthMessage({ type: 'success', text: 'Account created successfully! Please log in.' });
      // Optionally switch to login form after successful signup
      setTimeout(() => {
        setIsLogin(true);
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setSignupErrors({});
      }, 1500);
    } else {
      setAuthMessage({ type: 'error', text: 'Please correct the errors in the form.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Avatar Element */}
      <motion.img
        src={generateRandomAvatarUrl()}
        alt="Background Avatar"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 blur-lg pointer-events-none select-none"
        initial={{ scale: 0.8, rotate: -15 }}
        animate={{ scale: 1, rotate: 15 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md border border-gray-100"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          {isLogin ? 'Welcome Back!' : 'Join SkillSwap'}
        </h1>

        {/* Auth Message */}
        <AnimatePresence>
          {authMessage.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-3 rounded-lg text-center mb-4 text-sm font-medium ${
                authMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {authMessage.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsLogin(true);
              // Clear login form when switching to login
              setLoginEmail('');
              setLoginPassword('');
              setLoginErrors({});
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
              isLogin ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Login
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsLogin(false);
              // Clear signup form when switching to signup
              setSignupName('');
              setSignupEmail('');
              setSignupPassword('');
              setSignupConfirmPassword('');
              setSignupErrors({});
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
              !isLogin ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sign Up
          </motion.button>
        </div>

        {/* Login Form */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="loginForm"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleLoginSubmit}
              className="space-y-5"
            >
              <AnimatedInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                error={loginErrors.email}
              />
              <AnimatedInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                error={loginErrors.password}
              />

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 mt-6"
              >
                Login
              </motion.button>
            </motion.form>
          ) : (
            /* Sign Up Form */
            <motion.form
              key="signupForm"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSignupSubmit}
              className="space-y-5"
            >
              <AnimatedInput
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                error={signupErrors.name}
              />
              <AnimatedInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                error={signupErrors.email}
              />
              <AnimatedInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                error={signupErrors.password}
              />
              <AnimatedInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                error={signupErrors.confirmPassword}
              />

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 mt-6"
              >
                Sign Up
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleForm}
            className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
}