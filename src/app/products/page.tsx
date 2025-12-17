// app/products/page.tsx
"use client";

import FilterSidebar from "@/components/modules/allProducts/AllProductFilter";
import ProductGrid from "@/components/modules/allProducts/ProductGrid";
import { useState, useEffect, useCallback } from "react";


// Sample Product Data
const sampleProducts = [
  {
    id: "1",
    slug: "premium-cotton-oversized-tshirt",
    name: "Premium Cotton Oversized T-Shirt",
    price: 890,
    originalPrice: 1190,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
    images: [
      "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
      "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    ],
    category: "T-Shirts",
    rating: 4.8,
    reviewCount: 124,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    inStock: true,
    isNew: true,
    discount: 25,
  },
  {
    id: "2",
    slug: "vintage-wash-hoodie",
    name: "Vintage Wash Hoodie",
    price: 1490,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    category: "Hoodies",
    rating: 4.6,
    reviewCount: 89,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Gray", hex: "#6B7280" },
      { name: "Black", hex: "#000000" },
    ],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "3",
    slug: "slim-fit-chino-pants",
    name: "Slim Fit Chino Pants",
    price: 1290,
    originalPrice: 1590,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg",
    category: "Pants",
    rating: 4.5,
    reviewCount: 67,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Khaki", hex: "#C3B091" },
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Black", hex: "#000000" },
    ],
    inStock: true,
    discount: 19,
  },
  {
    id: "4",
    slug: "classic-polo-shirt",
    name: "Classic Polo Shirt",
    price: 990,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
    category: "Shirts",
    rating: 4.7,
    reviewCount: 156,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Blue", hex: "#2563EB" },
      { name: "Green", hex: "#16A34A" },
    ],
    inStock: true,
  },
  {
    id: "5",
    slug: "denim-jacket-classic",
    name: "Classic Denim Jacket",
    price: 2490,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    category: "Jackets",
    rating: 4.9,
    reviewCount: 45,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "#2563EB" },
      { name: "Black", hex: "#000000" },
    ],
    inStock: false,
    isNew: true,
  },
  {
    id: "6",
    slug: "graphic-print-tee",
    name: "Graphic Print T-Shirt",
    price: 690,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg",
    category: "T-Shirts",
    rating: 4.4,
    reviewCount: 98,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    inStock: true,
  },
  {
    id: "7",
    slug: "cotton-crew-sweatshirt",
    name: "Cotton Crew Sweatshirt",
    price: 1190,
    originalPrice: 1490,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
    category: "Hoodies",
    rating: 4.6,
    reviewCount: 72,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gray", hex: "#6B7280" },
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Black", hex: "#000000" },
    ],
    inStock: true,
    discount: 20,
  },
  {
    id: "8",
    slug: "leather-belt-premium",
    name: "Premium Leather Belt",
    price: 790,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    category: "Accessories",
    rating: 4.8,
    reviewCount: 134,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Brown", hex: "#78350F" },
      { name: "Black", hex: "#000000" },
    ],
    inStock: true,
    isBestSeller: true,
  },
];

// Duplicate products for demo
const allProducts = [...sampleProducts, ...sampleProducts, ...sampleProducts, ...sampleProducts]
  .map((p, i) => ({ ...p, id: `${p.id}-${i}` }));

const defaultFilters: FilterState = {
  categories: [],
  sizes: [],
  colors: [],
  priceRange: [0, 10000],
  rating: null,
  inStock: false,
  onSale: false,
  sortBy: "featured",
};

export default function ProductsPage() {
  // State
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter Products
  const filteredProducts = useCallback(() => {
    let result = [...allProducts];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.some(
          (cat) => p.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((size) =>
          filters.sizes.includes(size.toLowerCase())
        )
      );
    }

    // Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((color) =>
          filters.colors.includes(color.name.toLowerCase())
        )
      );
    }

    // Price Range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating
    if (filters.rating) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }

    // In Stock
    if (filters.inStock) {
      result = result.filter((p) => p.inStock);
    }

    // On Sale
    if (filters.onSale) {
      result = result.filter((p) => p.discount);
    }

    // Sorting
    switch (filters.sortBy) {
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case "bestselling":
        result = result.filter((p) => p.isBestSeller).concat(result.filter((p) => !p.isBestSeller));
        break;
    }

    return result;
  }, [filters, searchQuery]);

  const products = filteredProducts();
  const totalProducts = products.length;

  // Paginate
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, itemsPerPage]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filters, searchQuery, currentPage]);

  const handleRemoveFilter = (type: keyof FilterState, value?: string) => {
    if (type === "categories" && value) {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== value),
      }));
    } else if (type === "sizes" && value) {
      setFilters((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((s) => s !== value),
      }));
    } else if (type === "colors" && value) {
      setFilters((prev) => ({
        ...prev,
        colors: prev.colors.filter((c) => c !== value),
      }));
    } else if (type === "priceRange") {
      setFilters((prev) => ({ ...prev, priceRange: [0, 10000] }));
    } else if (type === "rating") {
      setFilters((prev) => ({ ...prev, rating: null }));
    } else if (type === "inStock") {
      setFilters((prev) => ({ ...prev, inStock: false }));
    } else if (type === "onSale") {
      setFilters((prev) => ({ ...prev, onSale: false }));
    }
  };

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-[var(--color-gold)]">Home</a>
            <span>/</span>
            <span className="text-gray-900">All Products</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            All Products
          </h1>
          <p className="mt-2 text-gray-600">
            Discover our complete collection of premium clothing and accessories
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearAllFilters}
          />

          {/* Mobile Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearAllFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            isMobile={true}
          />

          {/* Product Grid */}
          <ProductGrid
            products={paginatedProducts}
            totalProducts={totalProducts}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={filters.sortBy}
            onSortChange={(sort) => setFilters((prev) => ({ ...prev, sortBy: sort }))}
            activeFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onOpenMobileFilter={() => setIsFilterOpen(true)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}