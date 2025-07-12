// app/requests/page.jsx
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialRequestsData } from '../../data/requestsData';
import RequestModal from '../../components/requests/RequestModal';
import FeedbackForm from '../../components/requests/FeedbackForm';
import RequestsSection from '../../components/requests/RequestsSection';
import FilterSearchBar from '../../components/requests/FilterSearchBar';

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequestsData);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingCurrentPage, setPendingCurrentPage] = useState(1);
  const [ongoingCurrentPage, setOngoingCurrentPage] = useState(1);
  const [pastCurrentPage, setPastCurrentPage] = useState(1);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // State for feedback form (when completing without modal)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackRequest, setFeedbackRequest] = useState(null);

  // Centralized action handler for all status changes
  const handleRequestAction = (id, actionType, rating = null, feedback = null) => {
    // Special handling for complete action from card (without modal)
    if (actionType === 'complete' && !rating && !feedback) {
      const request = requests.find(req => req.id === id);
      if (request) {
        setFeedbackRequest(request);
        setShowFeedbackForm(true);
        return;
      }
    }

    setRequests(prevRequests =>
      prevRequests.map(req => {
        if (req.id === id) {
          const newDate = new Date().toISOString().split('T')[0];
          let newStatus = req.status;
          let newRating = req.rating;
          let newFeedback = req.message;

          switch (actionType) {
            case 'accept':
              newStatus = 'Accepted';
              break;
            case 'reject':
              newStatus = 'Rejected';
              break;
            case 'complete':
              newStatus = 'Completed';
              newRating = rating ? `${rating}/5` : req.rating;
              newFeedback = feedback || req.message;
              break;
            case 'discard':
              newStatus = 'Discarded';
              break;
            default:
              break;
          }

          return {
            ...req,
            status: newStatus,
            rating: newRating,
            message: newFeedback,
            date: newDate,
          };
        }
        return req;
      })
    );
    handleCloseModal();
    setPendingCurrentPage(1);
    setOngoingCurrentPage(1);
    setPastCurrentPage(1);
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = (rating, feedback) => {
    handleRequestAction(feedbackRequest.id, 'complete', rating, feedback);
    setShowFeedbackForm(false);
    setFeedbackRequest(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  // Close feedback form
  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
    setFeedbackRequest(null);
  };

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus = filterStatus === 'All' ||
                            (filterStatus === 'Ongoing' && request.status === 'Accepted') ||
                            (filterStatus === 'Past' && ['Completed', 'Rejected', 'Discarded'].includes(request.status)) ||
                            (filterStatus !== 'Ongoing' && filterStatus !== 'Past' && request.status === filterStatus);
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const matchesSearch =
        request.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        request.skillsOffered.some((skill) => skill.toLowerCase().includes(lowerCaseSearchTerm)) ||
        request.skillWanted.toLowerCase().includes(lowerCaseSearchTerm) ||
        (request.message && request.message.toLowerCase().includes(lowerCaseSearchTerm));
      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchTerm, requests]);

  const pendingRequests = filteredRequests.filter((req) => req.status === 'Pending');
  const ongoingRequests = filteredRequests.filter((req) => req.status === 'Accepted');
  const pastRequests = filteredRequests.filter((req) => ['Completed', 'Rejected', 'Discarded'].includes(req.status)).sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    setPendingCurrentPage(1);
    setOngoingCurrentPage(1);
    setPastCurrentPage(1);
  }, [filterStatus, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8 lg:px-12 font-sans"
    >
      {/* Header */}
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight sm:text-5xl">Skill Swap Requests</h1>
        <p className="text-gray-600 text-lg sm:text-xl">Manage your skill exchange requests efficiently.</p>
      </header>

      {/* Filter and Search Bar */}
      <FilterSearchBar
        filterStatus={filterStatus}
        searchTerm={searchTerm}
        onFilterChange={setFilterStatus}
        onSearchChange={setSearchTerm}
          />

      {/* Pending Requests Section */}
      <RequestsSection
        title="Pending Requests"
        requests={pendingRequests}
            currentPage={pendingCurrentPage}
            onPageChange={setPendingCurrentPage}
                onAction={handleRequestAction}
        onCardClick={request => {
          setSelectedRequest(request);
          setShowModal(true);
        }}
        emptyMessage="No pending requests matching your criteria."
      />

      {/* Ongoing Requests Section */}
      <RequestsSection
        title="Ongoing Requests"
        requests={ongoingRequests}
            currentPage={ongoingCurrentPage}
            onPageChange={setOngoingCurrentPage}
        onAction={handleRequestAction}
        onCardClick={request => {
          setSelectedRequest(request);
          setShowModal(true);
        }}
        emptyMessage="No ongoing requests matching your criteria."
      />

      {/* Past Requests Section */}
      <RequestsSection
        title="Past Requests"
        requests={pastRequests}
            currentPage={pastCurrentPage}
            onPageChange={setPastCurrentPage}
        onAction={handleRequestAction}
        onCardClick={request => {
          setSelectedRequest(request);
          setShowModal(true);
        }}
        emptyMessage="No past requests found."
      />

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && selectedRequest && (
          <RequestModal
            request={selectedRequest}
            onClose={() => {
              setShowModal(false);
              setSelectedRequest(null);
            }}
            onActionFromModal={handleRequestAction}
          />
        )}
      </AnimatePresence>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showFeedbackForm && feedbackRequest && (
          <FeedbackForm
            request={feedbackRequest}
            onSubmit={handleFeedbackSubmit}
            onClose={handleCloseFeedbackForm}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}