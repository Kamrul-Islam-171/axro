// app/cart/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  X,
  ChevronRight,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Check,
  AlertCircle,
  Loader2,
  Gift,
  Sparkles,
  Package,
  Clock,
  Star,
  Zap,
  Info,
  ChevronDown,
  Percent,
  BadgeCheck,
} from "lucide-react";

// ============ TYPES ============
interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  size: string;
  color: { name: string; hex: string };
  quantity: number;
  maxQuantity: number;
  inStock: boolean;
}

interface PromoCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

// ============ FAKE DATA ============
const initialCartItems: CartItem[] = [
  {
    id: "cart-1",
    productId: "prod-1",
    slug: "premium-cotton-oversized-tshirt",
    name: "Premium Cotton Oversized T-Shirt - Limited Edition",
    price: 1299,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "T-Shirts",
    size: "L",
    color: { name: "Midnight Black", hex: "#1a1a1a" },
    quantity: 2,
    maxQuantity: 10,
    inStock: true,
  },
  {
    id: "cart-2",
    productId: "prod-2",
    slug: "classic-denim-jacket-vintage",
    name: "Classic Denim Jacket - Vintage Wash",
    price: 3499,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    category: "Jackets",
    size: "M",
    color: { name: "Washed Blue", hex: "#6B8CAE" },
    quantity: 1,
    maxQuantity: 5,
    inStock: true,
  },
  {
    id: "cart-3",
    productId: "prod-3",
    slug: "leather-crossbody-bag-premium",
    name: "Premium Leather Crossbody Bag",
    price: 2199,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "Bags",
    size: "One Size",
    color: { name: "Cognac Brown", hex: "#8B4513" },
    quantity: 1,
    maxQuantity: 3,
    inStock: true,
  },
  {
    id: "cart-4",
    productId: "prod-4",
    slug: "minimalist-analog-watch",
    name: "Minimalist Analog Watch - Rose Gold Edition",
    price: 4999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    category: "Watches",
    size: "38mm",
    color: { name: "Rose Gold", hex: "#B76E79" },
    quantity: 1,
    maxQuantity: 2,
    inStock: false,
  },
];

const recommendedProducts = [
  {
    id: "rec-1",
    slug: "premium-sneakers",
    name: "Premium Sneakers",
    price: 3299,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    badge: "SALE",
  },
  {
    id: "rec-2",
    slug: "casual-hoodie",
    name: "Casual Comfort Hoodie",
    price: 1899,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 189,
    badge: "NEW",
  },
  {
    id: "rec-3",
    slug: "aviator-sunglasses",
    name: "Classic Aviator Sunglasses",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 412,
  },
  {
    id: "rec-4",
    slug: "canvas-backpack",
    name: "Canvas Travel Backpack",
    price: 2499,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    badge: "HOT",
  },
];

// ============ CONSTANTS ============
const TAX_RATE = 0.05;
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 120;

// ============ QUANTITY SELECTOR ============
const QuantitySelector = ({
  quantity,
  maxQuantity,
  onUpdate,
  disabled = false,
  size = "default",
}: {
  quantity: number;
  maxQuantity: number;
  onUpdate: (qty: number) => void;
  disabled?: boolean;
  size?: "default" | "compact";
}) => {
  const isCompact = size === "compact";

  return (
    <div
      className={`
        inline-flex items-center border-2 rounded-lg overflow-hidden transition-colors
        ${disabled ? "border-gray-100 bg-gray-50" : "border-gray-200 hover:border-[var(--color-gold)]/30"}
        ${isCompact ? "h-9" : "h-11"}
      `}
    >
      <button
        onClick={() => onUpdate(quantity - 1)}
        disabled={quantity <= 1 || disabled}
        className={`
          flex items-center justify-center transition-all duration-200
          ${isCompact ? "w-9 h-9" : "w-11 h-11"}
          ${
            quantity <= 1 || disabled
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-[var(--color-gold)] hover:text-white"
          }
        `}
      >
        <Minus className={isCompact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
      <span
        className={`
          flex items-center justify-center font-semibold border-x-2 border-gray-200
          ${disabled ? "text-gray-400" : "text-gray-900"}
          ${isCompact ? "w-12 text-sm" : "w-14 text-base"}
        `}
      >
        {quantity}
      </span>
      <button
        onClick={() => onUpdate(quantity + 1)}
        disabled={quantity >= maxQuantity || disabled}
        className={`
          flex items-center justify-center transition-all duration-200
          ${isCompact ? "w-9 h-9" : "w-11 h-11"}
          ${
            quantity >= maxQuantity || disabled
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-[var(--color-gold)] hover:text-white"
          }
        `}
      >
        <Plus className={isCompact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
    </div>
  );
};

// ============ STAR RATING ============
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating)
            ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ))}
  </div>
);

// ============ CART ITEM CARD ============
const CartItemCard = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onMoveToWishlist: (id: string) => void;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const savings = item.originalPrice
    ? (item.originalPrice - item.price) * item.quantity
    : 0;
  const discountPercent = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0;

  const handleRemove = async () => {
    setIsRemoving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onRemove(item.id);
  };

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div
      className={`
        group relative bg-white rounded-2xl border border-gray-200 overflow-hidden
        hover:border-[var(--color-gold)]/30 hover:shadow-xl hover:shadow-black/5 
        transition-all duration-300
        ${isRemoving ? "opacity-50 scale-[0.98]" : ""}
        ${!item.inStock ? "bg-gray-50/50" : ""}
      `}
    >
      {/* Out of Stock Overlay */}
      {!item.inStock && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full mb-2">
              <AlertCircle className="w-4 h-4" />
              Out of Stock
            </div>
            <p className="text-sm text-gray-600">This item is currently unavailable</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative sm:w-48 md:w-56 flex-shrink-0">
          <Link
            href={`/product/${item.slug}`}
            className="block aspect-square sm:aspect-[4/5] overflow-hidden bg-gray-100"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {item.originalPrice && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase text-white bg-rose-500 rounded-md shadow-sm">
                <Zap className="w-3 h-3" />
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Quick Remove - Mobile */}
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="sm:hidden absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-rose-500 hover:bg-white shadow-md transition-all"
          >
            {isRemoving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0 flex-1">
              {/* Category */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                  {item.category}
                </span>
                {item.inStock && (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Product Name */}
              <Link href={`/product/${item.slug}`}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-[var(--color-gold)] transition-colors line-clamp-2 leading-snug">
                  {item.name}
                </h3>
              </Link>
            </div>

            {/* Remove Button - Desktop */}
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 flex-shrink-0"
            >
              {isRemoving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Variants */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            {/* Color */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Color:</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-5 h-5 rounded-full ring-2 ring-offset-1 ring-gray-200 shadow-sm"
                  style={{ backgroundColor: item.color.hex }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {item.color.name}
                </span>
              </div>
            </div>

            {/* Size */}
            <div className="relative">
              <button
                onClick={() => setShowSizeSelector(!showSizeSelector)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[var(--color-gold)] transition-colors"
              >
                <span>Size:</span>
                <span className="px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)] transition-colors">
                  {item.size}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSizeSelector ? "rotate-180" : ""}`} />
              </button>

              {/* Size Dropdown */}
              {showSizeSelector && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded-lg shadow-xl border border-gray-200 z-10 min-w-[120px]">
                  <div className="grid grid-cols-3 gap-1">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setShowSizeSelector(false)}
                        className={`
                          px-2 py-1.5 text-xs font-medium rounded transition-colors
                          ${item.size === size
                            ? "bg-[var(--color-gold)] text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]"
                          }
                        `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-gray-100">
            {/* Quantity & Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <QuantitySelector
                quantity={item.quantity}
                maxQuantity={item.maxQuantity}
                onUpdate={(qty) => onUpdateQuantity(item.id, qty)}
                disabled={!item.inStock}
                size="compact"
              />

              <div className="hidden sm:block w-px h-6 bg-gray-200" />

              <button
                onClick={() => onMoveToWishlist(item.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 rounded-lg transition-all duration-200"
              >
                <Heart className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Save for Later</span>
              </button>
            </div>

            {/* Price */}
            <div className="flex flex-col items-start sm:items-end">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ৳{(item.originalPrice * item.quantity).toLocaleString()}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-0.5">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  You save ৳{savings.toLocaleString()}
                </span>
              )}
              {item.quantity > 1 && (
                <span className="text-[11px] text-gray-400 mt-0.5">
                  ৳{item.price.toLocaleString()} × {item.quantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ PROMO CODE INPUT ============
const PromoCodeInput = ({
  appliedCode,
  onApply,
  onRemove,
  isLoading,
}: {
  appliedCode: PromoCode | null;
  onApply: (code: string) => Promise<{ success: boolean; message: string }>;
  onRemove: () => void;
  isLoading: boolean;
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;
    setError("");
    setSuccess("");

    const result = await onApply(code);
    if (result.success) {
      setSuccess(result.message);
      setCode("");
    } else {
      setError(result.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[var(--color-gold)]/10 rounded-lg flex items-center justify-center">
          <Tag className="w-4 h-4 text-[var(--color-gold)]" />
        </div>
        <span className="text-sm font-semibold text-gray-900">Promo Code</span>
      </div>

      {appliedCode ? (
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-emerald-50/50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-700 tracking-wide">
                {appliedCode.code}
              </p>
              <p className="text-xs text-emerald-600">
                {appliedCode.type === "percentage"
                  ? `${appliedCode.discount}% discount applied`
                  : `৳${appliedCode.discount} discount applied`}
              </p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter promo code"
                className={`
                  w-full px-4 py-3 text-sm font-medium border-2 rounded-xl transition-all duration-200 
                  placeholder:text-gray-400 focus:outline-none
                  ${error
                    ? "border-rose-300 focus:border-rose-500 bg-rose-50/50"
                    : "border-gray-200 focus:border-[var(--color-gold)] bg-gray-50 focus:bg-white"
                  }
                `}
              />
              {code && (
                <button
                  onClick={() => setCode("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleApply}
              disabled={!code.trim() || isLoading}
              className={`
                px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 min-w-[100px]
                ${
                  code.trim() && !isLoading
                    ? "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/90 shadow-lg shadow-[var(--color-gold)]/20"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Apply"
              )}
            </button>
          </div>

          {error && (
            <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </p>
          )}

          {success && (
            <p className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <Check className="w-3.5 h-3.5" />
              {success}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">Try these:</span>
            {["WELCOME10", "SAVE500", "FLAT15"].map((promoCode) => (
              <button
                key={promoCode}
                onClick={() => setCode(promoCode)}
                className="group px-2.5 py-1 text-xs font-semibold text-[var(--color-gold)] bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 rounded-lg hover:bg-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/40 transition-all duration-200"
              >
                <span className="flex items-center gap-1">
                  <Percent className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  {promoCode}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ============ ORDER SUMMARY ============
const OrderSummary = ({
  subtotal,
  itemCount,
  discount,
  shipping,
  tax,
  total,
  promoCode,
  onApplyPromo,
  onRemovePromo,
  isLoading,
  onCheckout,
}: {
  subtotal: number;
  itemCount: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode: PromoCode | null;
  onApplyPromo: (code: string) => Promise<{ success: boolean; message: string }>;
  onRemovePromo: () => void;
  isLoading: boolean;
  onCheckout: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onCheckout();
    setIsProcessing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-24 shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--color-gold)]" />
            <h2 className="text-lg font-bold text-white">Order Summary</h2>
          </div>
          <span className="px-3 py-1 text-xs font-bold text-gray-900 bg-[var(--color-gold)] rounded-full">
            {itemCount} {itemCount === 1 ? "Item" : "Items"}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Free Shipping Progress */}
        {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? (
          <div className="p-4 bg-gradient-to-r from-[var(--color-gold)]/5 to-amber-50 border border-[var(--color-gold)]/20 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-[var(--color-gold)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-[var(--color-gold)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Add ৳{remainingForFreeShipping.toLocaleString()} more for{" "}
                  <span className="text-[var(--color-gold)]">FREE shipping!</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Free delivery on orders over ৳{FREE_SHIPPING_THRESHOLD.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-gold)] to-amber-400 rounded-full transition-all duration-700 ease-out relative"
                style={{
                  width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-medium text-gray-500">
              <span>৳0</span>
              <span>৳{FREE_SHIPPING_THRESHOLD.toLocaleString()}</span>
            </div>
          </div>
        ) : subtotal >= FREE_SHIPPING_THRESHOLD ? (
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-50/50 border border-emerald-200 rounded-xl">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Free Shipping Unlocked!
              </p>
              <p className="text-xs text-emerald-600">Enjoy free delivery on this order</p>
            </div>
          </div>
        ) : null}

        {/* Promo Code */}
        <PromoCodeInput
          appliedCode={promoCode}
          onApply={onApplyPromo}
          onRemove={onRemovePromo}
          isLoading={isLoading}
        />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ৳{subtotal.toLocaleString()}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-500" />
                Promo Discount
              </span>
              <span className="font-bold text-emerald-600">
                -৳{discount.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-gray-400" />
              Shipping
            </span>
            {shipping === 0 ? (
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                FREE
              </span>
            ) : (
              <span className="font-semibold text-gray-900">
                ৳{shipping.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-gray-400" />
              Tax (5%)
            </span>
            <span className="font-semibold text-gray-900">
              ৳{tax.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-900">
          <div>
            <span className="text-lg font-bold text-gray-900">Total</span>
            <p className="text-[11px] text-gray-500">Including all taxes</p>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-bold text-[var(--color-gold)]">
              ৳{total.toLocaleString()}
            </span>
            {discount > 0 && (
              <p className="text-xs font-semibold text-emerald-600 flex items-center justify-end gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                You save ৳{discount.toLocaleString()}!
              </p>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isProcessing || itemCount === 0}
          className="w-full py-4 bg-[var(--color-gold)] text-white font-bold text-base rounded-xl hover:bg-[var(--color-gold)]/90 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-[var(--color-gold)]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </>
          )}
        </button>

        {/* Alternative Payment */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500 font-medium">or pay with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "bKash", icon: "🅱️", color: "hover:border-pink-400" },
            { name: "Nagad", icon: "🟠", color: "hover:border-orange-400" },
            { name: "Rocket", icon: "🚀", color: "hover:border-purple-400" },
          ].map((method) => (
            <button
              key={method.name}
              className={`flex flex-col items-center justify-center gap-1 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 ${method.color} hover:shadow-md`}
            >
              <span className="text-xl">{method.icon}</span>
              <span className="text-[10px] font-semibold text-gray-600">{method.name}</span>
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
          {[
            { icon: ShieldCheck, text: "Secure Checkout", color: "text-emerald-500" },
            { icon: RotateCcw, text: "7-Day Returns", color: "text-blue-500" },
            { icon: Package, text: "Quality Assured", color: "text-purple-500" },
            { icon: Clock, text: "Fast Delivery", color: "text-orange-500" },
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
              <badge.icon className={`w-4 h-4 ${badge.color}`} />
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ EMPTY CART ============
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-gray-200">
    <div className="relative mb-8">
      <div className="w-40 h-40 bg-gradient-to-br from-[var(--color-gold)]/10 via-[var(--color-gold)]/5 to-transparent rounded-full flex items-center justify-center">
        <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-14 h-14 text-gray-300" />
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <span className="text-3xl">🛒</span>
      </div>
    </div>

    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
      Your cart feels lonely
    </h2>
    <p className="text-gray-500 text-center mb-8 max-w-md leading-relaxed">
      Looks like you haven't added anything to your cart yet. 
      Explore our amazing collection and find something you'll love!
    </p>

    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href="/products"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-gold)] text-white font-semibold rounded-xl hover:bg-[var(--color-gold)]/90 transition-all duration-200 shadow-lg shadow-[var(--color-gold)]/25 transform hover:scale-105"
      >
        <Sparkles className="w-5 h-5" />
        Start Shopping
      </Link>
      <Link
        href="/wishlist"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-200"
      >
        <Heart className="w-5 h-5" />
        View Wishlist
      </Link>
    </div>
  </div>
);

// ============ CART SKELETON ============
const CartSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
      >
        <div className="sm:w-48 md:w-56 aspect-square sm:aspect-[4/5] bg-gray-100 flex-shrink-0" />
        <div className="flex-1 p-5 space-y-4">
          <div className="flex justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-12 bg-gray-100 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full" />
          </div>
          <div className="flex gap-4">
            <div className="h-6 w-24 bg-gray-100 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded" />
          </div>
          <div className="flex justify-between items-end pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="h-9 w-28 bg-gray-100 rounded-lg" />
              <div className="h-9 w-24 bg-gray-50 rounded-lg" />
            </div>
            <div className="space-y-1 text-right">
              <div className="h-7 w-28 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-100 rounded ml-auto" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ============ RECOMMENDED PRODUCTS ============
const RecommendedProducts = () => {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            You May Also Like
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Based on your cart items
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] hover:gap-2 transition-all"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[var(--color-gold)]/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.badge && (
                <span
                  className={`
                    absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase text-white rounded-md
                    ${product.badge === "SALE" ? "bg-rose-500" : product.badge === "NEW" ? "bg-emerald-500" : "bg-[var(--color-gold)]"}
                  `}
                >
                  {product.badge}
                </span>
              )}
              <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-[var(--color-gold)] hover:text-white">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-[var(--color-gold)] transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={product.rating} />
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-base font-bold text-gray-900">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ============ FEATURES SECTION ============
const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On orders over ৳5,000",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      desc: "7-day return policy",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% secure checkout",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      desc: "2-3 business days",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[var(--color-gold)]/30 hover:shadow-lg transition-all duration-300"
        >
          <div className={`w-10 h-10 ${feature.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <feature.icon className={`w-5 h-5 ${feature.color}`} />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {feature.title}
            </h4>
            <p className="text-xs text-gray-500 truncate">{feature.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

// ============ MAIN CART PAGE ============
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Initialize cart with fake data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems(initialCartItems);
      setPageLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate totals
  const inStockItems = cartItems.filter((item) => item.inStock);
  const subtotal = inStockItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = inStockItems.reduce((sum, item) => sum + item.quantity, 0);

  let discount = 0;
  if (promoCode) {
    if (promoCode.type === "percentage") {
      discount = Math.round((subtotal * promoCode.discount) / 100);
    } else {
      discount = promoCode.discount;
    }
  }

  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const total = Math.max(0, afterDiscount + shipping + tax);

  // Handlers
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToWishlist = (id: string) => {
    // In real app, add to wishlist first
    removeItem(id);
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
  };

  const applyPromoCode = async (
    code: string
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const promoCodes: Record<string, PromoCode> = {
      WELCOME10: { code: "WELCOME10", discount: 10, type: "percentage" },
      SAVE500: { code: "SAVE500", discount: 500, type: "fixed" },
      FLAT15: { code: "FLAT15", discount: 15, type: "percentage" },
    };

    const promo = promoCodes[code.toUpperCase()];
    setIsLoading(false);

    if (!promo) {
      return { success: false, message: "Invalid promo code. Please try again." };
    }

    if (promo.type === "fixed" && subtotal < 3000) {
      return {
        success: false,
        message: "Minimum order ৳3,000 required for this code",
      };
    }

    setPromoCode(promo);
    return {
      success: true,
      message:
        promo.type === "percentage"
          ? `${promo.discount}% discount applied successfully!`
          : `৳${promo.discount} discount applied successfully!`,
    };
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...", { cartItems, total });
    // Navigate to checkout page
  };

  const outOfStockCount = cartItems.filter((item) => !item.inStock).length;

  return (
    <div className="min-h-screen bg-gray-50/80">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-[var(--color-gold)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-[var(--color-gold)]">
              Shopping Cart
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-[var(--color-gold)]" />
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-1">
              {pageLoading ? (
                <span className="inline-block w-48 h-4 bg-gray-200 rounded animate-pulse" />
              ) : cartItems.length > 0 ? (
                <>
                  {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                  {outOfStockCount > 0 && (
                    <span className="text-rose-500 ml-2">
                      ({outOfStockCount} unavailable)
                    </span>
                  )}
                </>
              ) : (
                "Your cart is waiting to be filled"
              )}
            </p>
          </div>

          {cartItems.length > 0 && !pageLoading && (
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 border-2 border-gray-200 rounded-xl hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all bg-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {pageLoading ? (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <CartSkeleton />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 animate-pulse">
                <div className="h-12 bg-gray-200 rounded-xl" />
                <div className="h-24 bg-gray-100 rounded-xl" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded" />
                </div>
                <div className="h-14 w-full bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Out of Stock Warning */}
              {outOfStockCount > 0 && (
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">
                      {outOfStockCount} {outOfStockCount === 1 ? "item is" : "items are"} currently out of stock
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      These items won't be included in your order. Remove them or save for later.
                    </p>
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onMoveToWishlist={moveToWishlist}
                />
              ))}

              {/* Gift Message */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center">
                    <Gift className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900">
                      Add a Gift Message
                    </span>
                    <p className="text-xs text-gray-500">Optional - make it special!</p>
                  </div>
                </div>
                <textarea
                  placeholder="Write your personalized message here..."
                  rows={3}
                  className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                itemCount={itemCount}
                discount={discount}
                shipping={shipping}
                tax={tax}
                total={total}
                promoCode={promoCode}
                onApplyPromo={applyPromoCode}
                onRemovePromo={removePromoCode}
                isLoading={isLoading}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {cartItems.length > 0 && !pageLoading && <RecommendedProducts />}

        {/* Features */}
        <Features />
      </main>
    </div>
  );
}