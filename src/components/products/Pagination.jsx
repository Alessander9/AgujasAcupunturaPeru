import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate pagination items with ellipses
  const getPaginationItems = () => {
    const pages = [];
    const delta = 2; // number of pages around current

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always include page 1
    pages.push(1);

    const left = currentPage - delta;
    const right = currentPage + delta;

    if (left > 2) {
      pages.push('...');
    }

    const start = Math.max(2, left);
    const end = Math.min(totalPages - 1, right);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push('...');
    }

    // Always include last page
    pages.push(totalPages);

    return pages;
  };

  const pages = getPaginationItems();

  return (
    <nav className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 mb-6" aria-label="Paginación de productos">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
          currentPage === 1
            ? 'border-[#EDE4D6] text-[#A8B2AC] cursor-not-allowed opacity-50'
            : 'border-[#E2D9CC] text-[#18221D] bg-white hover:bg-[#F9F6F0] hover:border-[#123329] active:scale-95 shadow-xs cursor-pointer'
        }`}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers and Ellipses */}
      {pages.map((item, index) => {
        if (item === '...') {
          return (
            <span key={`dots-${index}`} className="w-8 h-8 flex items-center justify-center text-xs text-[#8C9690] select-none font-bold">
              ...
            </span>
          );
        }

        const pageNum = Number(item);
        const isActive = pageNum === currentPage;

        return (
          <button
            key={`page-${pageNum}`}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? 'page' : undefined}
            className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
              isActive
                ? 'bg-[#123329] text-white shadow-md scale-105 pointer-events-none'
                : 'bg-white border border-[#E2D9CC] text-[#46534C] hover:bg-[#F9F6F0] hover:border-[#123329] hover:text-[#123329] shadow-xs cursor-pointer'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
          currentPage === totalPages
            ? 'border-[#EDE4D6] text-[#A8B2AC] cursor-not-allowed opacity-50'
            : 'border-[#E2D9CC] text-[#18221D] bg-white hover:bg-[#F9F6F0] hover:border-[#123329] active:scale-95 shadow-xs cursor-pointer'
        }`}
        aria-label="Página siguiente"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
