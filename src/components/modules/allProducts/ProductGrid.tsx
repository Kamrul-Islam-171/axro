// components/products/ProductGrid.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Grid3X3,
  LayoutList,
  Heart,
  ShoppingBag,
  Star,
  Eye,
  X,
  Check,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  Flame,
  Zap,
} from "lucide-react";
import { PaginationWithInfo } from "@/components/shared/Pagination";
import { FilterState } from "./AllProductFilter";

// Types
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
}

interface ProductGridProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  activeFilters: FilterState;
  onRemoveFilter: (type: keyof FilterState, value?: string) => void;
  onOpenMobileFilter: () => void;
  isLoading?: boolean;
}

// Sort Options
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "bestselling", label: "Best Selling" },
];

// Badge Component
const ProductBadge = ({
  type,
  value,
}: {
  type: "discount" | "new" | "bestseller";
  value?: number;
}) => {
  const config = {
    discount: {
      bg: "bg-rose-500",
      icon: Zap,
      text: `-${value}%`,
    },
    new: {
      bg: "bg-emerald-500",
      icon: Sparkles,
      text: "NEW",
    },
    bestseller: {
      bg: "bg-[var(--color-gold)]",
      icon: Flame,
      text: "HOT",
    },
  };

  const { bg, icon: Icon, text } = config[type];

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wide
        text-white rounded-md shadow-sm ${bg}
      `}
    >
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
};

// Star Rating Component
const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const sizeClasses = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses} ${
            i < Math.floor(rating)
              ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
              : i < rating
              ? "fill-[var(--color-gold)]/40 text-[var(--color-gold)]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

// Color Selector Component
const ColorSelector = ({
  colors,
  selectedIndex,
  onSelect,
  maxShow = 4,
  size = "sm",
}: {
  colors: { name: string; hex: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  maxShow?: number;
  size?: "sm" | "md";
}) => {
  const sizeClasses = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const checkSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";

  return (
    <div className="flex items-center gap-1.5">
      {colors.slice(0, maxShow).map((color, idx) => (
        <button
          key={color.name}
          onClick={(e) => {
            e.preventDefault();
            onSelect(idx);
          }}
          className={`
            relative ${sizeClasses} rounded-full transition-all duration-200
            ${selectedIndex === idx 
              ? "ring-2 ring-[var(--color-gold)] ring-offset-1 scale-110" 
              : "ring-1 ring-gray-300 hover:ring-gray-400 hover:scale-105"
            }
          `}
          style={{ backgroundColor: color.hex }}
          title={color.name}
        >
          {selectedIndex === idx && (
            <Check
              className={`absolute inset-0 m-auto ${checkSize} ${
                ["#FFFFFF", "#FFF", "#fff", "white", "#FAFAFA", "#F5F5F5"].includes(color.hex)
                  ? "text-gray-800"
                  : "text-white"
              }`}
            />
          )}
        </button>
      ))}
      {colors.length > maxShow && (
        <span className="text-[11px] font-medium text-gray-400">
          +{colors.length - maxShow}
        </span>
      )}
    </div>
  );
};

// Size Display Component - Fixed height for consistency
const SizeDisplay = ({
  sizes,
  maxShow = 4,
  variant = "default",
}: {
  sizes: string[];
  maxShow?: number;
  variant?: "default" | "compact";
}) => {
  const displaySizes = sizes.slice(0, maxShow);
  const remaining = sizes.length - maxShow;

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1 h-6">
        {displaySizes.map((size) => (
          <span
            key={size}
            className="px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-100 rounded"
          >
            {size}
          </span>
        ))}
        {remaining > 0 && (
          <span className="text-[10px] font-medium text-gray-400">+{remaining}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 min-h-[28px]">
      {displaySizes.map((size) => (
        <span
          key={size}
          className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors cursor-pointer"
        >
          {size}
        </span>
      ))}
      {remaining > 0 && (
        <span className="text-xs font-medium text-gray-400">+{remaining}</span>
      )}
    </div>
  );
};

// Grid View Product Card
const GridProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div
      className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[var(--color-gold)]/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section - Fixed Aspect Ratio */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered && product.images?.[1] ? product.images[1] : product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        </Link>

        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && <ProductBadge type="discount" value={product.discount} />}
          {product.isNew && !product.discount && <ProductBadge type="new" />}
          {product.isBestSeller && <ProductBadge type="bestseller" />}
        </div>

        {/* Wishlist - Top Right */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`
            absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-200 backdrop-blur-sm
            ${isWishlisted
              ? "bg-rose-500 text-white shadow-lg"
              : "bg-white/90 text-gray-500 hover:text-rose-500 hover:bg-white shadow-md"
            }
          `}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Stock Status Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Actions - Bottom */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent
            transition-all duration-300 z-10
            ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <div className="flex gap-2">
            <button
              disabled={!product.inStock}
              className={`
                flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2
                transition-all duration-200
                ${product.inStock
                  ? "bg-white text-gray-900 hover:bg-[var(--color-gold)] hover:text-white"
                  : "bg-white/50 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section - Fixed Structure */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category & Stock Row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            {product.category}
          </span>
          {product.inStock && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              In Stock
            </span>
          )}
        </div>

        {/* Product Name - Fixed Height */}
        <Link href={`/product/${product.slug}`} className="block mb-2">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[40px] hover:text-[var(--color-gold)] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating Row */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        {/* Colors Row - Fixed Height */}
        <div className="mb-3 min-h-[24px]">
          <ColorSelector
            colors={product.colors}
            selectedIndex={selectedColor}
            onSelect={setSelectedColor}
            maxShow={4}
            size="sm"
          />
        </div>

        {/* Spacer to push price and sizes to bottom */}
        <div className="flex-1" />

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ৳{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
          {product.discount && (
            <span className="text-xs font-semibold text-emerald-600">
              Save {product.discount}%
            </span>
          )}
        </div>

        {/* Sizes Row - Fixed Height */}
        <div className="pt-3 border-t border-gray-100">
          <SizeDisplay sizes={product.sizes} maxShow={4} variant="compact" />
        </div>
      </div>
    </div>
  );
};

// List View Product Card
const ListProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="group flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[var(--color-gold)]/30 hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full md:w-64 lg:w-72 aspect-square md:aspect-auto md:h-auto flex-shrink-0 overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && <ProductBadge type="discount" value={product.discount} />}
          {product.isNew && !product.discount && <ProductBadge type="new" />}
          {product.isBestSeller && <ProductBadge type="bestseller" />}
        </div>

        {/* Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            {/* Category & Stock */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  In Stock
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-400">Out of Stock</span>
              )}
            </div>

            {/* Product Name */}
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
              ${isWishlisted
                ? "bg-rose-50 text-rose-500"
                : "bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500"
              }
            `}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} size="md" />
          <span className="text-sm font-medium text-gray-900">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
        </div>

        {/* Colors & Sizes Row */}
        <div className="flex flex-wrap items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Colors:</span>
            <ColorSelector
              colors={product.colors}
              selectedIndex={selectedColor}
              onSelect={setSelectedColor}
              maxShow={6}
              size="md"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sizes:</span>
            <SizeDisplay sizes={product.sizes} maxShow={6} />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-base text-gray-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discount && product.originalPrice && (
              <span className="px-2 py-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full">
                Save ৳{(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/product/${product.slug}`}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 border-2 border-gray-200 rounded-lg hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-200"
            >
              View Details
            </Link>
            <button
              disabled={!product.inStock}
              className={`
                flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
                ${product.inStock
                  ? "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/90 shadow-lg shadow-[var(--color-gold)]/20"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton - Grid
const GridSkeleton = () => (
  <div className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="aspect-[4/5] bg-gray-100" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-3 w-12 bg-gray-100 rounded" />
      </div>
      <div className="space-y-1.5 min-h-[40px]">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3.5 h-3.5 bg-gray-100 rounded" />
        ))}
      </div>
      <div className="flex gap-1.5 min-h-[24px]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-6 w-14 bg-gray-100 rounded" />
      </div>
      <div className="pt-3 border-t border-gray-100">
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 w-8 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Loading Skeleton - List
const ListSkeleton = () => (
  <div className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="w-full md:w-64 lg:w-72 aspect-square md:aspect-auto md:h-72 bg-gray-100 flex-shrink-0" />
    <div className="flex-1 p-5 md:p-6 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex gap-3">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-100 rounded" />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full" />
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-100 rounded" />
        ))}
      </div>
      <div className="flex gap-6">
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 w-10 bg-gray-100 rounded-md" />
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-between">
        <div className="flex gap-3">
          <div className="h-8 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-16 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-28 bg-gray-100 rounded-lg" />
          <div className="h-10 w-32 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

// Filter Tag Component
const FilterTag = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--color-gold)] bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 rounded-full">
    {label}
    <button
      onClick={onRemove}
      className="p-0.5 rounded-full hover:bg-[var(--color-gold)]/20 transition-colors"
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);

// Sort Dropdown Component
const SortDropdown = ({
  sortBy,
  onSortChange,
}: {
  sortBy: string;
  onSortChange: (sort: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentSort = sortOptions.find((o) => o.value === sortBy);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border-2 rounded-lg transition-all duration-200 min-w-[180px]
          ${isOpen 
            ? "border-[var(--color-gold)] text-[var(--color-gold)]" 
            : "border-gray-200 text-gray-700 hover:border-gray-300"
          }
        `}
      >
        <span className="flex-1 text-left">{currentSort?.label || "Sort by"}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={`
                flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors
                ${sortBy === option.value
                  ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-medium"
                  : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              {option.label}
              {sortBy === option.value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Product Grid Component
const ProductGrid = ({
  products,
  totalProducts,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  activeFilters,
  onRemoveFilter,
  onOpenMobileFilter,
  isLoading = false,
}: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchFocused, setSearchFocused] = useState(false);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Count active filters
  const activeFilterCount =
    activeFilters.categories.length +
    activeFilters.sizes.length +
    activeFilters.colors.length +
    (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 10000 ? 1 : 0) +
    (activeFilters.rating ? 1 : 0) +
    (activeFilters.inStock ? 1 : 0) +
    (activeFilters.onSale ? 1 : 0);

  return (
    <div className="flex-1 min-w-0">
      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        {/* Main Row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                searchFocused ? "text-[var(--color-gold)]" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`
                w-full pl-11 pr-10 py-2.5 text-sm bg-gray-50 border-2 rounded-lg transition-all duration-200
                placeholder:text-gray-400 focus:outline-none
                ${searchFocused
                  ? "border-[var(--color-gold)] bg-white"
                  : "border-transparent hover:bg-gray-100"
                }
              `}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter */}
            <button
              onClick={onOpenMobileFilter}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 text-xs font-bold text-white bg-[var(--color-gold)] rounded-full min-w-[18px] text-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />

            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-[var(--color-gold)] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white text-[var(--color-gold)] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Filters:</span>
            {activeFilters.categories.map((cat) => (
              <FilterTag key={cat} label={cat} onRemove={() => onRemoveFilter("categories", cat)} />
            ))}
            {activeFilters.sizes.map((size) => (
              <FilterTag key={size} label={`Size: ${size}`} onRemove={() => onRemoveFilter("sizes", size)} />
            ))}
            {activeFilters.colors.map((color) => (
              <FilterTag key={color} label={color} onRemove={() => onRemoveFilter("colors", color)} />
            ))}
            {(activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 10000) && (
              <FilterTag
                label={`৳${activeFilters.priceRange[0]} - ৳${activeFilters.priceRange[1]}`}
                onRemove={() => onRemoveFilter("priceRange")}
              />
            )}
            {activeFilters.rating && (
              <FilterTag label={`${activeFilters.rating}+ Stars`} onRemove={() => onRemoveFilter("rating")} />
            )}
            {activeFilters.inStock && (
              <FilterTag label="In Stock" onRemove={() => onRemoveFilter("inStock")} />
            )}
            {activeFilters.onSale && (
              <FilterTag label="On Sale" onRemove={() => onRemoveFilter("onSale")} />
            )}
            <button
              onClick={() => {
                // Clear all filters
              }}
              className="text-sm text-gray-500 hover:text-[var(--color-gold)] transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts)}-
              {Math.min(currentPage * itemsPerPage, totalProducts)}
            </span>
            {" of "}
            <span className="font-semibold text-gray-900">{totalProducts}</span> products
            {searchQuery && (
              <span>
                {" "}for "<span className="font-medium text-[var(--color-gold)]">{searchQuery}</span>"
              </span>
            )}
          </p>

          {/* Mobile View Toggle */}
          <div className="sm:hidden flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-all ${
                viewMode === "grid" ? "bg-white text-[var(--color-gold)] shadow-sm" : "text-gray-500"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-all ${
                viewMode === "list" ? "bg-white text-[var(--color-gold)] shadow-sm" : "text-gray-500"
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid / List */}
      {isLoading ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : "space-y-4"
          }
        >
          {[...Array(itemsPerPage)].map((_, i) =>
            viewMode === "grid" ? <GridSkeleton key={i} /> : <ListSkeleton key={i} />
          )}
        </div>
      ) : products.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : "space-y-4"
          }
        >
          {products.map((product, index) =>
            viewMode === "grid" ? (
              <GridProductCard key={product.id} product={product} index={index} />
            ) : (
              <ListProductCard key={product.id} product={product} index={index} />
            )
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            We couldn&apos;t find any products matching your criteria. Try adjusting your filters.
          </p>
          <button
            onClick={() => onSearchChange("")}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-gold)] rounded-lg hover:bg-[var(--color-gold)]/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="mt-6 bg-white rounded-xl px-4 border border-gray-200">
          <PaginationWithInfo
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalProducts}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            showItemsInfo={true}
            showPageSizeSelector={true}
            pageSizeOptions={[12, 24, 48, 96]}
            onPageSizeChange={onItemsPerPageChange}
            variant="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;