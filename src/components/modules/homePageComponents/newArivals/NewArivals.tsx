// components/home/NewArrivals.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  Heart,
  ShoppingBag,
  Eye,
  TrendingUp,
  Zap,
  ArrowRight,
  BadgeCheck,
  Clock,
  Shield,
} from "lucide-react";

// ============ TYPES ============
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  rating: number;
  reviewCount: number;
  colors: { name: string; hex: string }[];
  badge?: "NEW" | "TRENDING" | "LIMITED";
  discount?: number;
}

// ============ FAKE DATA ============
const newArrivalsData: Product[] = [
  {
    id: "new-1",
    slug: "premium-leather-jacket",
    name: "Premium Leather Biker Jacket",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1548126032-079675493d0e?w=500&h=600&fit=crop",
    category: "Jackets",
    rating: 4.9,
    reviewCount: 128,
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Tan", hex: "#D2B48C" },
    ],
    badge: "NEW",
    discount: 31,
  },
  {
    id: "new-2",
    slug: "minimalist-watch-collection",
    name: "Minimalist Watch Collection",
    price: 3499,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop",
    category: "Watches",
    rating: 4.8,
    reviewCount: 256,
    colors: [
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Gold", hex: "#FFD700" },
      { name: "Black", hex: "#000000" },
    ],
    badge: "TRENDING",
  },
  {
    id: "new-3",
    slug: "oversized-hoodie-comfort",
    name: "Oversized Comfort Hoodie",
    price: 2299,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop",
    category: "Hoodies",
    rating: 4.7,
    reviewCount: 189,
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Navy", hex: "#000080" },
    ],
    badge: "NEW",
    discount: 23,
  },
  {
    id: "new-4",
    slug: "designer-sneakers-limited",
    name: "Designer Sneakers Limited Edition",
    price: 4799,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop",
    category: "Sneakers",
    rating: 5.0,
    reviewCount: 342,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Triple Black", hex: "#1a1a1a" },
    ],
    badge: "LIMITED",
  },
  {
    id: "new-5",
    slug: "classic-denim-jacket",
    name: "Classic Vintage Denim Jacket",
    price: 3299,
    originalPrice: 4499,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500&h=600&fit=crop",
    category: "Denim",
    rating: 4.6,
    reviewCount: 167,
    colors: [
      { name: "Light Wash", hex: "#B0C4DE" },
      { name: "Dark Wash", hex: "#1E3A5F" },
    ],
    badge: "NEW",
    discount: 27,
  },
  {
    id: "new-6",
    slug: "premium-backpack",
    name: "Premium Leather Backpack",
    price: 5999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&h=600&fit=crop",
    category: "Bags",
    rating: 4.9,
    reviewCount: 201,
    colors: [
      { name: "Cognac", hex: "#8B4513" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1E3A5F" },
    ],
    badge: "TRENDING",
  },
  {
    id: "new-7",
    slug: "sunglasses-aviator",
    name: "Classic Aviator Sunglasses",
    price: 1899,
    originalPrice: 2599,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop",
    category: "Accessories",
    rating: 4.8,
    reviewCount: 412,
    colors: [
      { name: "Gold", hex: "#FFD700" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Black", hex: "#000000" },
    ],
    badge: "NEW",
    discount: 27,
  },
];

// ============ BADGE COMPONENT ============
const ProductBadge = ({ type }: { type: "NEW" | "TRENDING" | "LIMITED" }) => {
  const config = {
    NEW: {
      bg: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      icon: Sparkles,
      text: "NEW",
      shadow: "shadow-emerald-500/50",
    },
    TRENDING: {
      bg: "bg-gradient-to-r from-[var(--color-gold)] to-amber-500",
      icon: TrendingUp,
      text: "HOT",
      shadow: "shadow-[var(--color-gold)]/50",
    },
    LIMITED: {
      bg: "bg-gradient-to-r from-rose-500 to-pink-600",
      icon: Zap,
      text: "LIMITED",
      shadow: "shadow-rose-500/50",
    },
  };

  const { bg, icon: Icon, text, shadow } = config[type];

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide
        text-white rounded-lg ${bg} shadow-lg ${shadow} backdrop-blur-sm
      `}
    >
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
};

// ============ STAR RATING ============
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 transition-colors ${
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

// ============ COLOR SELECTOR ============
const ColorSelector = ({
  colors,
  selectedIndex,
  onSelect,
}: {
  colors: { name: string; hex: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) => {
  const maxShow = 4;

  return (
    <div className="flex items-center gap-1.5">
      {colors.slice(0, maxShow).map((color, idx) => {
        const isWhite = ["#FFFFFF", "#FFF", "#fff", "white"].includes(color.hex);
        return (
          <button
            key={color.name}
            onClick={(e) => {
              e.preventDefault();
              onSelect(idx);
            }}
            className={`
              relative w-6 h-6 rounded-full transition-all duration-200 ring-offset-2
              ${
                selectedIndex === idx
                  ? "ring-2 ring-[var(--color-gold)] scale-110 shadow-md"
                  : `ring-1 ${isWhite ? "ring-gray-300" : "ring-gray-300/50"} hover:ring-gray-400 hover:scale-105`
              }
            `}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {selectedIndex === idx && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isWhite ? "bg-gray-700" : "bg-white"
                  }`}
                />
              </span>
            )}
          </button>
        );
      })}
      {colors.length > maxShow && (
        <span className="text-xs font-medium text-gray-400">
          +{colors.length - maxShow}
        </span>
      )}
    </div>
  );
};

// ============ PRODUCT CARD ============
const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[var(--color-gold)]/40 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 h-full flex flex-col group">
        {/* Image Section */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            {/* Main Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered && product.hoverImage
                  ? "opacity-0 scale-110"
                  : "opacity-100 scale-100"
              } ${imageLoaded ? "blur-0" : "blur-sm"}`}
              onLoad={() => setImageLoaded(true)}
              priority
            />
            {/* Hover Image */}
            {product.hoverImage && (
              <Image
                src={product.hoverImage}
                alt={`${product.name} - alternate view`}
                fill
                className={`object-cover transition-all duration-700 ${
                  isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              />
            )}

            {/* Overlay Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.badge && <ProductBadge type={product.badge} />}
            {product.discount && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold uppercase text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg shadow-lg shadow-rose-500/50">
                <Zap className="w-3 h-3" />
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`
              absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-300 backdrop-blur-md
              ${
                isWishlisted
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-110"
                  : "bg-white/90 text-gray-500 hover:text-rose-500 hover:bg-white shadow-md hover:scale-110"
              }
            `}
          >
            <Heart className={`w-4.5 h-4.5 transition-all ${isWishlisted ? "fill-current scale-110" : ""}`} />
          </button>

          {/* Quick Actions - Show on Hover */}
          <div
            className={`
              absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent
              transition-all duration-500 z-10
              ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
            `}
          >
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-[var(--color-gold)] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="w-11 h-11 bg-white rounded-xl flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-white transition-all duration-200 shadow-lg"
              >
                <Eye className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating} />
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.slug}`} className="block mb-3 group/title">
            <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2 min-h-[44px] group-hover/title:text-[var(--color-gold)] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating Details */}
          <div className="flex items-center gap-1.5 mb-4 text-xs">
            <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{product.reviewCount} reviews</span>
          </div>

          {/* Colors */}
          <div className="mb-4">
            <ColorSelector
              colors={product.colors}
              selectedIndex={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl font-bold text-gray-900">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <BadgeCheck className="w-3.5 h-3.5" />
                Save ৳{(product.originalPrice - product.price).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ NAVIGATION BUTTON ============
const NavButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={`
        absolute top-1/2 -translate-y-1/2 z-30
        ${direction === "prev" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}
        w-12 h-12 lg:w-14 lg:h-14 rounded-full
        bg-white border-2 border-gray-200
        flex items-center justify-center shadow-2xl
        transition-all duration-300
        ${
          disabled
            ? "opacity-0 pointer-events-none"
            : "opacity-100 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white hover:scale-110 active:scale-95"
        }
      `}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

// ============ DOT INDICATORS ============
const DotIndicators = ({
  totalSlides,
  currentSlide,
  onDotClick,
}: {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {[...Array(totalSlides)].map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`
            transition-all duration-300 rounded-full
            ${
              currentSlide === index
                ? "w-10 h-2.5 bg-gradient-to-r from-[var(--color-gold)] to-amber-500 shadow-lg shadow-[var(--color-gold)]/50"
                : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 hover:scale-125"
            }
          `}
        />
      ))}
    </div>
  );
};

// ============ MAIN NEW ARRIVALS COMPONENT ============
const NewArrivals = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Responsive slides per view
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1280) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.max(1, newArrivalsData.length - slidesPerView + 1);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, nextSlide]);

  // Mouse/Touch drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setIsAutoPlaying(false);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (translateX > threshold && currentSlide > 0) {
      prevSlide();
    } else if (translateX < -threshold && currentSlide < totalSlides - 1) {
      nextSlide();
    }

    setTranslateX(0);
    setIsAutoPlaying(true);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-gold)]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-gold)]/10 to-amber-50 border border-[var(--color-gold)]/20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
              <span className="text-sm font-bold text-[var(--color-gold)] uppercase tracking-wide">
                Fresh & Trending
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              New Arrivals
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Discover the latest additions to our collection. Handpicked styles crafted with passion, delivered with care.
            </p>
          </div>

          {/* View All Button */}
          <Link
            href="/products?filter=new-arrivals"
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-[var(--color-gold)] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[var(--color-gold)]/20 hover:scale-105 active:scale-95"
          >
            View All Collection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative -mx-4 sm:mx-0">
          {/* Slider Wrapper */}
          <div
            ref={sliderRef}
            className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${currentSlide * (100 / slidesPerView)}% + ${translateX}px))`,
              }}
            >
              {newArrivalsData.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Hidden on mobile */}
          <div className="hidden sm:block">
            <NavButton
              direction="prev"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            />
            <NavButton
              direction="next"
              onClick={nextSlide}
              disabled={currentSlide >= totalSlides - 1}
            />
          </div>
        </div>

        {/* Dot Indicators */}
        <DotIndicators
          totalSlides={totalSlides}
          currentSlide={currentSlide}
          onDotClick={goToSlide}
        />

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 sm:mt-16">
          {[
            {
              icon: Sparkles,
              title: "Latest Styles",
              desc: "Updated weekly",
              color: "text-purple-500",
              bg: "bg-purple-50",
            },
            {
              icon: TrendingUp,
              title: "Trending Now",
              desc: "Most popular",
              color: "text-[var(--color-gold)]",
              bg: "bg-amber-50",
            },
            {
              icon: Shield,
              title: "Quality Assured",
              desc: "Premium products",
              color: "text-blue-500",
              bg: "bg-blue-50",
            },
            {
              icon: Clock,
              title: "Fast Delivery",
              desc: "2-3 business days",
              color: "text-emerald-500",
              bg: "bg-emerald-50",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-[var(--color-gold)]/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className={`relative w-11 h-11 ${feature.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <div className="relative min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500 truncate">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;