// components/ui/Pagination.tsx
"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "rounded";
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
  size = "md",
  variant = "default",
  className = "",
}: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      
      // Calculate start and end of visible range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, maxVisiblePages - 1);
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - maxVisiblePages + 2);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const sizeClasses = {
    sm: {
      button: "w-8 h-8 text-sm",
      icon: "w-4 h-4",
    },
    md: {
      button: "w-10 h-10 text-sm",
      icon: "w-5 h-5",
    },
    lg: {
      button: "w-12 h-12 text-base",
      icon: "w-5 h-5",
    },
  };

  const variantClasses = {
    default: {
      base: "rounded-lg",
      active: "bg-[var(--color-gold)] text-white shadow-lg",
      inactive: "bg-white text-gray-700 hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)] border border-gray-200",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200",
    },
    minimal: {
      base: "rounded-lg",
      active: "bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-semibold",
      inactive: "text-gray-600 hover:text-[var(--color-gold)] hover:bg-gray-100",
      disabled: "text-gray-300 cursor-not-allowed",
    },
    rounded: {
      base: "rounded-full",
      active: "bg-[var(--color-gold)] text-white shadow-lg",
      inactive: "bg-gray-100 text-gray-700 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)]",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
  };

  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-center gap-1.5 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          ${sizes.button} ${variants.base}
          flex items-center justify-center transition-all duration-200
          ${currentPage === 1 ? variants.disabled : variants.inactive}
        `}
        aria-label="Previous page"
      >
        <ChevronLeft className={sizes.icon} />
      </button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className={`${sizes.button} flex items-center justify-center text-gray-400`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  ${sizes.button} ${variants.base}
                  flex items-center justify-center font-medium transition-all duration-200
                  ${currentPage === page ? variants.active : variants.inactive}
                `}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          ${sizes.button} ${variants.base}
          flex items-center justify-center transition-all duration-200
          ${currentPage === totalPages ? variants.disabled : variants.inactive}
        `}
        aria-label="Next page"
      >
        <ChevronRight className={sizes.icon} />
      </button>
    </nav>
  );
};

// Extended Pagination with Info
interface PaginationWithInfoProps extends PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  showItemsInfo?: boolean;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
}

export const PaginationWithInfo = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showItemsInfo = true,
  showPageSizeSelector = false,
  pageSizeOptions = [5, 10, 20, 50, 100],
  onPageSizeChange,
  ...paginationProps
}: PaginationWithInfoProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Items Info */}
      {showItemsInfo && (
        <p className="text-sm text-gray-600 order-2 sm:order-1">
          Showing{" "}
          <span className="font-semibold text-gray-900">{startItem}</span>
          {" - "}
          <span className="font-semibold text-gray-900">{endItem}</span>
          {" of "}
          <span className="font-semibold text-gray-900">{totalItems}</span>
          {" products"}
        </p>
      )}

      {/* Pagination */}
      <div className="order-1 sm:order-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          {...paginationProps}
        />
      </div>

      {/* Page Size Selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div className="flex items-center gap-2 order-3">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent bg-white"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;