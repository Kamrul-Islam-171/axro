// components/checkout/CheckoutPage.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Building2,
  Map,
  Globe,
  FileText,
  Truck,
  Shield,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Loader2,
  ShoppingBag,
  Clock,
  CreditCard,
  Banknote,
  Package,
  Tag,
  X,
  Sparkles,
  BadgeCheck,
  Info,
  CircleDollarSign,
} from "lucide-react";

// Types
interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: React.ReactNode;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

// Sample Cart Items (Replace with your actual cart data)
const sampleCartItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Cotton Comfort Fit T-Shirt",
    slug: "premium-cotton-tshirt",
    price: 1299,
    originalPrice: 1599,
    quantity: 2,
    image: "/api/placeholder/100/100",
    color: "Navy Blue",
    size: "L",
  },
  {
    id: "2",
    name: "Classic Denim Jacket - Vintage Wash",
    slug: "classic-denim-jacket",
    price: 3499,
    quantity: 1,
    image: "/api/placeholder/100/100",
    color: "Light Blue",
    size: "M",
  },
  {
    id: "3",
    name: "Slim Fit Chino Pants",
    slug: "slim-fit-chino",
    price: 1899,
    originalPrice: 2299,
    quantity: 1,
    image: "/api/placeholder/100/100",
    color: "Khaki",
    size: "32",
  },
];

// Shipping Methods
const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Regular delivery within city",
    price: 60,
    estimatedDays: "3-5 business days",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "Fast delivery with priority handling",
    price: 120,
    estimatedDays: "1-2 business days",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "free",
    name: "Free Delivery",
    description: "Free on orders above ৳3000",
    price: 0,
    estimatedDays: "5-7 business days",
    icon: <Package className="w-5 h-5" />,
  },
];

// Bangladesh Divisions
const divisions = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

// Progress Steps Component
const CheckoutProgress = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, name: "Cart", icon: ShoppingBag },
    { id: 2, name: "Information", icon: User },
    { id: 3, name: "Confirmation", icon: Check },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 border-2
                  ${
                    isCompleted
                      ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-white"
                      : isCurrent
                      ? "bg-[var(--color-gold)]/10 border-[var(--color-gold)] text-[var(--color-gold)]"
                      : "bg-gray-100 border-gray-200 text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                {isCurrent && (
                  <span className="absolute -inset-1 rounded-full border-2 border-[var(--color-gold)] animate-ping opacity-20" />
                )}
              </div>
              <span
                className={`
                  mt-2 text-xs sm:text-sm font-medium transition-colors
                  ${isCurrent ? "text-[var(--color-gold)]" : isCompleted ? "text-gray-700" : "text-gray-400"}
                `}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  w-12 sm:w-20 lg:w-32 h-0.5 mx-2 sm:mx-4 -mt-6 transition-colors duration-300
                  ${isCompleted ? "bg-[var(--color-gold)]" : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Form Input Component
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  required = false,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ElementType;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-[var(--color-gold)]">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`
              absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors
              ${focused ? "text-[var(--color-gold)]" : error ? "text-red-400" : "text-gray-400"}
            `}
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 text-sm bg-gray-50 border-2 rounded-xl
            transition-all duration-200 outline-none
            placeholder:text-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${
              error
                ? "border-red-300 focus:border-red-500 bg-red-50/50"
                : focused
                ? "border-[var(--color-gold)] bg-white shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }
          `}
        />
        {error && (
          <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

// Form Select Component
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  icon: Icon,
  error,
  required = false,
  placeholder = "Select option",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  icon?: React.ElementType;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-[var(--color-gold)]">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`
              absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors
              ${focused ? "text-[var(--color-gold)]" : error ? "text-red-400" : "text-gray-400"}
            `}
          />
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full ${Icon ? "pl-10" : "pl-4"} pr-10 py-3 text-sm bg-gray-50 border-2 rounded-xl
            transition-all duration-200 outline-none appearance-none cursor-pointer
            ${!value ? "text-gray-400" : "text-gray-900"}
            ${
              error
                ? "border-red-300 focus:border-red-500 bg-red-50/50"
                : focused
                ? "border-[var(--color-gold)] bg-white shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronRight
          className={`
            absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-transform
            ${focused ? "rotate-90 text-[var(--color-gold)]" : "rotate-0 text-gray-400"}
          `}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

// Form Textarea Component
const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
        <span className="text-gray-400 font-normal">(Optional)</span>
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-3 text-sm bg-gray-50 border-2 rounded-xl
          transition-all duration-200 outline-none resize-none
          placeholder:text-gray-400
          ${
            focused
              ? "border-[var(--color-gold)] bg-white shadow-sm"
              : "border-gray-200 hover:border-gray-300"
          }
        `}
      />
    </div>
  );
};

// Cart Item Component
const CartItemRow = ({ item }: { item: CartItem }) => {
  const savings = item.originalPrice
    ? (item.originalPrice - item.price) * item.quantity
    : 0;

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gold)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {item.quantity}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.slug}`}
          className="text-sm font-medium text-gray-900 hover:text-[var(--color-gold)] transition-colors line-clamp-2"
        >
          {item.name}
        </Link>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          {item.color && <span>{item.color}</span>}
          {item.color && item.size && <span>•</span>}
          {item.size && <span>Size: {item.size}</span>}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-gray-900">
            ৳{(item.price * item.quantity).toLocaleString()}
          </span>
          {item.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ৳{(item.originalPrice * item.quantity).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({
  items,
  shippingCost,
  promoCode,
  promoDiscount,
  onApplyPromo,
  onRemovePromo,
}: {
  items: CartItem[];
  shippingCost: number;
  promoCode: string;
  promoDiscount: number;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
}) => {
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalSavings = items.reduce(
    (sum, item) =>
      sum +
      (item.originalPrice
        ? (item.originalPrice - item.price) * item.quantity
        : 0),
    0
  );
  const total = subtotal + shippingCost - promoDiscount;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    // Simulate promo validation
    if (promoInput.toUpperCase() === "SAVE10") {
      onApplyPromo(promoInput.toUpperCase());
      setShowPromoInput(false);
      setPromoInput("");
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)]/80 px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Order Summary</h3>
          <span className="px-2.5 py-1 text-xs font-bold text-[var(--color-gold)] bg-white rounded-full">
            {items.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-5 max-h-64 overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      {/* Promo Code */}
      <div className="px-5 py-4 border-t border-gray-100">
        {promoCode ? (
          <div className="flex items-center justify-between bg-emerald-50 px-3 py-2.5 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                {promoCode}
              </span>
              <span className="text-xs text-emerald-600">applied</span>
            </div>
            <button
              onClick={onRemovePromo}
              className="p-1 text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : showPromoInput ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError("");
                }}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-[var(--color-gold)] focus:bg-white outline-none transition-all"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--color-gold)] rounded-lg hover:bg-[var(--color-gold)]/90 transition-colors"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {promoError}
              </p>
            )}
            <button
              onClick={() => {
                setShowPromoInput(false);
                setPromoInput("");
                setPromoError("");
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowPromoInput(true)}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-gold)] hover:text-[var(--color-gold)]/80 transition-colors"
          >
            <Tag className="w-4 h-4" />
            Have a promo code?
          </button>
        )}
      </div>

      {/* Calculations */}
      <div className="px-5 py-4 space-y-3 border-t border-gray-100 bg-gray-50/50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            ৳{subtotal.toLocaleString()}
          </span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600">Product Discount</span>
            <span className="font-medium text-emerald-600">
              -৳{totalSavings.toLocaleString()}
            </span>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600">Promo Discount</span>
            <span className="font-medium text-emerald-600">
              -৳{promoDiscount.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {shippingCost === 0 ? (
              <span className="text-emerald-600">Free</span>
            ) : (
              `৳${shippingCost.toLocaleString()}`
            )}
          </span>
        </div>

        <div className="flex justify-between pt-3 border-t border-gray-200">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">
              ৳{total.toLocaleString()}
            </span>
            {(totalSavings > 0 || promoDiscount > 0) && (
              <p className="text-xs text-emerald-600 font-medium">
                You save ৳{(totalSavings + promoDiscount).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Shield className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="text-[10px] text-gray-500">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Truck className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="text-[10px] text-gray-500">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <BadgeCheck className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="text-[10px] text-gray-500">Authentic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// COD Payment Section
const CODPaymentSection = () => {
  return (
    <div className="bg-gradient-to-br from-[var(--color-gold)]/5 to-[var(--color-gold)]/10 rounded-2xl border-2 border-[var(--color-gold)]/30 p-5 sm:p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--color-gold)]/5 rounded-full blur-2xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold)]/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--color-gold)]/20">
            <Banknote className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Cash on Delivery
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white bg-[var(--color-gold)] rounded-full">
                Selected
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Pay with cash when your order is delivered to your doorstep
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: CircleDollarSign,
              title: "No Advance Payment",
              desc: "Pay only when you receive",
            },
            {
              icon: Package,
              title: "Inspect Before Pay",
              desc: "Check your items first",
            },
            {
              icon: Shield,
              title: "100% Secure",
              desc: "Risk-free transaction",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-[var(--color-gold)]/10"
            >
              <div className="w-8 h-8 bg-[var(--color-gold)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-[var(--color-gold)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">
                  {feature.title}
                </p>
                <p className="text-[11px] text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-2 mt-4 p-3 bg-white/80 rounded-xl border border-[var(--color-gold)]/20">
          <Info className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">
            Please keep the exact amount ready for a smooth delivery experience.
            Our delivery partner will contact you before arrival.
          </p>
        </div>
      </div>
    </div>
  );
};

// Shipping Method Selector
const ShippingMethodSelector = ({
  methods,
  selectedMethod,
  onSelect,
  subtotal,
}: {
  methods: ShippingMethod[];
  selectedMethod: string;
  onSelect: (id: string) => void;
  subtotal: number;
}) => {
  const eligibleForFree = subtotal >= 3000;

  return (
    <div className="space-y-3">
      {methods.map((method) => {
        const isSelected = selectedMethod === method.id;
        const isFreeMethod = method.id === "free";
        const isDisabled = isFreeMethod && !eligibleForFree;

        return (
          <button
            key={method.id}
            onClick={() => !isDisabled && onSelect(method.id)}
            disabled={isDisabled}
            className={`
              relative w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${
                isSelected
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                  : isDisabled
                  ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                  : "border-gray-200 hover:border-[var(--color-gold)]/50 bg-white"
              }
            `}
          >
            {/* Radio Indicator */}
            <div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                ${
                  isSelected
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]"
                    : "border-gray-300"
                }
              `}
            >
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>

            {/* Icon */}
            <div
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                ${
                  isSelected
                    ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                    : "bg-gray-100 text-gray-500"
                }
              `}
            >
              {method.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{method.name}</span>
                {isFreeMethod && !eligibleForFree && (
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    Min. ৳3000
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                {method.estimatedDays}
              </p>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              {method.price === 0 ? (
                <span className="text-sm font-bold text-emerald-600">FREE</span>
              ) : (
                <span className="text-sm font-bold text-gray-900">
                  ৳{method.price}
                </span>
              )}
            </div>

            {/* Selected Badge */}
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-gold)] rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Success Order Modal
const OrderSuccessModal = ({
  isOpen,
  orderId,
  onClose,
}: {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold)]/80 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-[var(--color-gold)]/30">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-600">
            Thank you for your order. You will pay when your package arrives.
          </p>
        </div>

        {/* Order ID */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-500 mb-1">Order ID</p>
          <p className="text-lg font-mono font-bold text-[var(--color-gold)] tracking-wider">
            {orderId}
          </p>
        </div>

        {/* Info */}
        <div className="space-y-3 mb-8">
          {[
            { icon: Mail, text: "Confirmation email has been sent" },
            { icon: Phone, text: "We'll call you before delivery" },
            { icon: Truck, text: "Track your order in My Orders" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
              <item.icon className="w-4 h-4 text-[var(--color-gold)]" />
              {item.text}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/orders"
            className="w-full py-3 text-center text-sm font-semibold text-white bg-[var(--color-gold)] rounded-xl hover:bg-[var(--color-gold)]/90 transition-colors"
          >
            Track Order
          </Link>
          <Link
            href="/"
            className="w-full py-3 text-center text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main Checkout Component
const CheckoutPage = () => {
  const [currentStep] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Bangladesh",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Calculate totals
  const subtotal = sampleCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const selectedShippingMethod = shippingMethods.find(
    (m) => m.id === selectedShipping
  );
  const shippingCost = selectedShippingMethod?.price || 0;

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/\s|-/g, ""))) {
      newErrors.phone = "Please enter a valid Bangladesh phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state) {
      newErrors.state = "Please select a division";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle promo code
  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
    // Example: 10% discount
    setPromoDiscount(Math.round(subtotal * 0.1));
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setPromoDiscount(0);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".text-red-500");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order ID
      const newOrderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase()}`;
      setOrderId(newOrderId);
      setShowSuccess(true);
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-xl font-bold text-[var(--color-gold)]"
            >
              YourBrand
            </Link>
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <CheckoutProgress currentStep={currentStep} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-7 xl:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Contact Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      We&apos;ll use this to contact you about your order
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    icon={User}
                    error={errors.firstName}
                    required
                  />
                  <FormInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    icon={User}
                    error={errors.lastName}
                    required
                  />
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    icon={Mail}
                    error={errors.email}
                    required
                  />
                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    icon={Phone}
                    error={errors.phone}
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Shipping Address
                    </h2>
                    <p className="text-sm text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <FormInput
                    label="Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House #, Road #, Area"
                    icon={Home}
                    error={errors.address}
                    required
                  />

                  <FormInput
                    label="Apartment, Suite, etc."
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    icon={Building2}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      icon={Building2}
                      error={errors.city}
                      required
                    />
                    <FormSelect
                      label="Division"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      options={divisions}
                      icon={Map}
                      error={errors.state}
                      required
                      placeholder="Select division"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Postal Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="1234"
                      icon={MapPin}
                      error={errors.zipCode}
                      required
                    />
                    <FormInput
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      icon={Globe}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Shipping Method
                    </h2>
                    <p className="text-sm text-gray-500">
                      Choose your preferred delivery option
                    </p>
                  </div>
                </div>

                <ShippingMethodSelector
                  methods={shippingMethods}
                  selectedMethod={selectedShipping}
                  onSelect={setSelectedShipping}
                  subtotal={subtotal}
                />
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Order Notes
                    </h2>
                    <p className="text-sm text-gray-500">
                      Any special instructions for delivery
                    </p>
                  </div>
                </div>

                <FormTextarea
                  label="Additional Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g., Leave at door, call before delivery, specific delivery time preferences..."
                  rows={3}
                />
              </div>

              {/* Payment Method - COD */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Payment Method
                    </h2>
                    <p className="text-sm text-gray-500">
                      Secure payment options
                    </p>
                  </div>
                </div>

                <CODPaymentSection />
              </div>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-4 text-base font-semibold rounded-xl flex items-center justify-center gap-2
                    transition-all duration-200 shadow-lg shadow-[var(--color-gold)]/20
                    ${
                      isSubmitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/90"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Place Order - ৳
                      {(subtotal + shippingCost - promoDiscount).toLocaleString()}
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <OrderSummary
              items={sampleCartItems}
              shippingCost={shippingCost}
              promoCode={promoCode}
              promoDiscount={promoDiscount}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
            />

            {/* Submit Button - Desktop */}
            <div className="hidden lg:block mt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  w-full py-4 text-base font-semibold rounded-xl flex items-center justify-center gap-2
                  transition-all duration-200 shadow-lg shadow-[var(--color-gold)]/20
                  ${
                    isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/90"
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                By placing your order, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-[var(--color-gold)] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--color-gold)] hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Back to Cart */}
            <Link
              href="/cart"
              className="flex items-center justify-center gap-2 mt-4 py-3 text-sm font-medium text-gray-600 hover:text-[var(--color-gold)] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Return to Cart
            </Link>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccess}
        orderId={orderId}
        onClose={() => setShowSuccess(false)}
      />

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-gold);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-gold);
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;