// components/products/FilterSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Star,
  Package,
} from "lucide-react";

// Types
export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  rating: number | null;
  inStock: boolean;
  onSale: boolean;
  sortBy: string;
}

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface ColorOption extends FilterOption {
  hex: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

// Filter Data
const categories: FilterOption[] = [
  { id: "tshirts", label: "T-Shirts", count: 156 },
  { id: "shirts", label: "Shirts", count: 89 },
  { id: "hoodies", label: "Hoodies & Sweatshirts", count: 67 },
  { id: "pants", label: "Pants & Jeans", count: 124 },
  { id: "jackets", label: "Jackets & Coats", count: 45 },
  { id: "accessories", label: "Accessories", count: 78 },
];

const sizes: FilterOption[] = [
  { id: "xs", label: "XS", count: 45 },
  { id: "s", label: "S", count: 89 },
  { id: "m", label: "M", count: 156 },
  { id: "l", label: "L", count: 134 },
  { id: "xl", label: "XL", count: 98 },
  { id: "xxl", label: "2XL", count: 67 },
  { id: "xxxl", label: "3XL", count: 34 },
];

const colors: ColorOption[] = [
  { id: "black", label: "Black", hex: "#000000", count: 234 },
  { id: "white", label: "White", hex: "#FFFFFF", count: 189 },
  { id: "navy", label: "Navy Blue", hex: "#1e3a5f", count: 145 },
  { id: "gray", label: "Gray", hex: "#6B7280", count: 123 },
  { id: "red", label: "Red", hex: "#DC2626", count: 78 },
  { id: "green", label: "Green", hex: "#16A34A", count: 56 },
  { id: "blue", label: "Blue", hex: "#2563EB", count: 89 },
  { id: "yellow", label: "Yellow", hex: "#EAB308", count: 34 },
  { id: "pink", label: "Pink", hex: "#EC4899", count: 45 },
  { id: "purple", label: "Purple", hex: "#9333EA", count: 67 },
  { id: "orange", label: "Orange", hex: "#EA580C", count: 41 },
  { id: "brown", label: "Brown", hex: "#78350F", count: 52 },
];

const priceRanges = [
  { min: 0, max: 500, label: "Under ৳500" },
  { min: 500, max: 1000, label: "৳500 - ৳1,000" },
  { min: 1000, max: 2000, label: "৳1,000 - ৳2,000" },
  { min: 2000, max: 5000, label: "৳2,000 - ৳5,000" },
  { min: 5000, max: 10000, label: "৳5,000+" },
];

// Accordion Component
const FilterAccordion = ({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left group"
      >
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-gray-400 group-hover:text-[var(--color-gold)] transition-colors">
              {icon}
            </span>
          )}
          <span className="font-semibold text-gray-900">{title}</span>
          {badge !== undefined && badge > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// Checkbox Component
const FilterCheckbox = ({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer group">
    <div
      className={`
        w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
        ${
          checked
            ? "bg-[var(--color-gold)] border-[var(--color-gold)]"
            : "border-gray-300 group-hover:border-[var(--color-gold)]"
        }
      `}
    >
      {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </div>
    <span
      className={`flex-1 text-sm ${
        checked ? "text-gray-900 font-medium" : "text-gray-600"
      }`}
    >
      {label}
    </span>
    {count !== undefined && (
      <span className="text-xs text-gray-400">({count})</span>
    )}
  </label>
);

// Price Range Slider Component
const PriceRangeSlider = ({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - 100);
    setLocalValue([newMin, localValue[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + 100);
    setLocalValue([localValue[0], newMax]);
  };

  const handleMouseUp = () => {
    onChange(localValue);
  };

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      {/* Slider Track */}
      <div className="relative h-2 bg-gray-200 rounded-full">
        {/* Active Range */}
        <div
          className="absolute h-full bg-[var(--color-gold)] rounded-full"
          style={{
            left: `${getPercent(localValue[0])}%`,
            right: `${100 - getPercent(localValue[1])}%`,
          }}
        />

        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-gold)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />

        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-gold)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>

      {/* Input Fields */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Min</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              ৳
            </span>
            <input
              type="number"
              value={localValue[0]}
              onChange={(e) => {
                const val = Math.min(
                  Number(e.target.value),
                  localValue[1] - 100
                );
                setLocalValue([val, localValue[1]]);
                onChange([val, localValue[1]]);
              }}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
            />
          </div>
        </div>
        <div className="text-gray-400 mt-5">—</div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Max</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              ৳
            </span>
            <input
              type="number"
              value={localValue[1]}
              onChange={(e) => {
                const val = Math.max(
                  Number(e.target.value),
                  localValue[0] + 100
                );
                setLocalValue([localValue[0], val]);
                onChange([localValue[0], val]);
              }}
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Quick Select */}
      <div className="flex flex-wrap gap-2">
        {priceRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => onChange([range.min, range.max])}
            className={`
              px-3 py-1.5 text-xs rounded-full border transition-all duration-200
              ${
                localValue[0] === range.min && localValue[1] === range.max
                  ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)]"
                  : "border-gray-200 text-gray-600 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              }
            `}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Rating Filter Component
const RatingFilter = ({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (rating: number | null) => void;
}) => (
  <div className="space-y-2">
    {[5, 4, 3, 2, 1].map((rating) => (
      <button
        key={rating}
        onClick={() => onChange(value === rating ? null : rating)}
        className={`
          flex items-center gap-2 w-full py-2 px-3 rounded-lg transition-all duration-200
          ${
            value === rating
              ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
              : "hover:bg-gray-100"
          }
        `}
      >
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm">
          {rating === 5 ? "5 Stars" : `${rating} & Up`}
        </span>
      </button>
    ))}
  </div>
);

// Main Filter Sidebar Component
const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen = true,
  onClose,
  isMobile = false,
}: FilterSidebarProps) => {
  const activeFiltersCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0) +
    (filters.rating ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (
    key: "categories" | "sizes" | "colors",
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[var(--color-gold)]" />
          <h2 className="font-bold text-lg text-gray-900">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-gold)] text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-[var(--color-gold)] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear all</span>
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Sections - HIDDEN SCROLLBAR */}
      <div 
        className="flex-1 overflow-y-auto py-2 
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] 
          [scrollbar-width:none]"
      >
        {/* Categories */}
        <FilterAccordion title="Categories" badge={filters.categories.length}>
          <div 
            className="space-y-1 max-h-48 overflow-y-auto 
              [&::-webkit-scrollbar]:hidden 
              [-ms-overflow-style:none] 
              [scrollbar-width:none]"
          >
            {categories.map((category) => (
              <FilterCheckbox
                key={category.id}
                checked={filters.categories.includes(category.id)}
                onChange={() => toggleArrayFilter("categories", category.id)}
                label={category.label}
                count={category.count}
              />
            ))}
          </div>
        </FilterAccordion>

        {/* Price Range */}
        <FilterAccordion
          title="Price Range"
          badge={
            filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0
          }
        >
          <PriceRangeSlider
            min={0}
            max={10000}
            value={filters.priceRange}
            onChange={(value) => updateFilter("priceRange", value)}
          />
        </FilterAccordion>

        {/* Sizes */}
        <FilterAccordion title="Sizes" badge={filters.sizes.length}>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => toggleArrayFilter("sizes", size.id)}
                className={`
                  min-w-[48px] px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200
                  ${
                    filters.sizes.includes(size.id)
                      ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)]"
                      : "border-gray-200 text-gray-700 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  }
                `}
              >
                {size.label}
              </button>
            ))}
          </div>
        </FilterAccordion>

        {/* Colors */}
        <FilterAccordion title="Colors" badge={filters.colors.length}>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => toggleArrayFilter("colors", color.id)}
                className={`
                  group relative w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${
                    filters.colors.includes(color.id)
                      ? "border-[var(--color-gold)] scale-110"
                      : "border-gray-200 hover:scale-105"
                  }
                `}
                title={color.label}
              >
                <span
                  className="absolute inset-1 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                {filters.colors.includes(color.id) && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={`w-5 h-5 ${
                        ["white", "yellow"].includes(color.id)
                          ? "text-gray-900"
                          : "text-white"
                      }`}
                      strokeWidth={3}
                    />
                  </span>
                )}
                {color.id === "white" && (
                  <span className="absolute inset-1 rounded-full border border-gray-300" />
                )}
              </button>
            ))}
          </div>
          {/* Selected Colors Text */}
          {filters.colors.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {filters.colors.map((colorId) => {
                const color = colors.find((c) => c.id === colorId);
                return color ? (
                  <span
                    key={colorId}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.label}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleArrayFilter("colors", colorId);
                      }}
                      className="hover:text-[var(--color-gold)]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          )}
        </FilterAccordion>

        {/* Rating */}
        <FilterAccordion title="Rating" badge={filters.rating ? 1 : 0}>
          <RatingFilter
            value={filters.rating}
            onChange={(rating) => updateFilter("rating", rating)}
          />
        </FilterAccordion>

        {/* Availability */}
        <FilterAccordion title="Availability">
          <div className="space-y-2">
            <label className="flex items-center gap-3 py-2 cursor-pointer group">
              <div
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200
                  ${filters.inStock ? "bg-[var(--color-gold)]" : "bg-gray-300"}
                `}
                onClick={() => updateFilter("inStock", !filters.inStock)}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200
                    ${filters.inStock ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </div>
            </label>

            <label className="flex items-center gap-3 py-2 cursor-pointer group">
              <div
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200
                  ${filters.onSale ? "bg-[var(--color-gold)]" : "bg-gray-300"}
                `}
                onClick={() => updateFilter("onSale", !filters.onSale)}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200
                    ${filters.onSale ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded">
                  SALE
                </span>
                <span className="text-sm text-gray-700">On Sale</span>
              </div>
            </label>
          </div>
        </FilterAccordion>
      </div>

      {/* Apply Button (Mobile) */}
      {isMobile && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[var(--color-gold)] text-white font-semibold rounded-xl hover:bg-[var(--color-gold)]/90 transition-colors"
          >
            Apply Filters
            {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
          </button>
        </div>
      )}
    </>
  );

  // Mobile Drawer
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          className={`
            fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={onClose}
        />

        {/* Drawer */}
        <div
          className={`
            fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl
            transition-transform duration-300 ease-out lg:hidden flex flex-col p-4
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex flex-col max-h-[calc(100vh-120px)]">
          {sidebarContent}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;