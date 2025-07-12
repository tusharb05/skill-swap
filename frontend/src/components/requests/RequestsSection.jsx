import React from 'react';
import RequestCard from './RequestCard';
import Pagination from './Pagination';

const RequestsSection = ({ 
  title, 
  requests, 
  currentPage, 
  onPageChange, 
  onAction, 
  onCardClick,
  emptyMessage = "No requests found."
}) => {
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="mb-14 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
        {title} <span className="ml-3 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-lg font-semibold">{requests.length}</span>
      </h2>
      {paginatedRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAction={onAction}
              onClick={onCardClick}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg p-6 bg-white rounded-xl shadow-sm text-center border border-gray-100">
          {emptyMessage}
        </p>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
};

export default RequestsSection; 