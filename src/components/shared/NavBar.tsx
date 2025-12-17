"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  Heart,
  Search,
  User,
  LogOut,
  Settings,
  Package,
  MapPin,
  Phone,
  Mail,
  Truck,
  Gift,
  Clock,
  Sparkles,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  Globe,
  CreditCard,
  Shield,
  RotateCcw,
  Headphones,
} from "lucide-react";

// ============ Types ============
interface NavChild {
  name: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface NavCategory {
  title: string;
  items: NavChild[];
}

interface NavLink {
  name: string;
  href: string;
  type: "link" | "dropdown" | "mega";
  badge?: string;
  categories?: NavCategory[];
  featured?: {
    title: string;
    subtitle: string;
    image: string;
    href: string;
    cta: string;
  }[];
  promos?: {
    icon: React.ReactNode;
    text: string;
  }[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  slug: string;
}

interface SearchSuggestion {
  type: "product" | "category" | "brand";
  name: string;
  href: string;
  image?: string;
  price?: number;
}

// ============ Navigation Data ============
const navLinks: NavLink[] = [
  { name: "Home", href: "/", type: "link" },
  {
    name: "Shop",
    href: "/products",
    type: "mega",
    categories: [
      {
        title: "Clothing",
        items: [
          { name: "All Clothing", href: "/products", description: "Browse our full collection" },
          { name: "T-Shirts", href: "/category/tshirts", description: "Casual & Premium tees" },
          { name: "Shirts", href: "/category/shirts", description: "Formal & Casual shirts" },
          { name: "Hoodies & Sweatshirts", href: "/category/hoodies", description: "Cozy essentials" },
          { name: "Pants & Jeans", href: "/category/pants", description: "Perfect fit guaranteed" },
          { name: "Jackets & Coats", href: "/category/jackets", description: "Outerwear collection" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { name: "All Accessories", href: "/category/accessories" },
          { name: "Caps & Hats", href: "/category/caps", badge: "Popular" },
          { name: "Bags & Backpacks", href: "/category/bags" },
          { name: "Belts", href: "/category/belts" },
          { name: "Watches", href: "/category/watches" },
          { name: "Sunglasses", href: "/category/sunglasses" },
        ],
      },
      {
        title: "Collections",
        items: [
          { name: "New Arrivals", href: "/new-arrivals", badge: "New" },
          { name: "Best Sellers", href: "/best-sellers" },
          { name: "Summer 2024", href: "/collections/summer-2024" },
          { name: "Streetwear", href: "/collections/streetwear" },
          { name: "Premium Line", href: "/collections/premium" },
          { name: "Essentials", href: "/collections/essentials" },
        ],
      },
    ],
    featured: [
      {
        title: "Summer Collection",
        subtitle: "Discover the new season",
        image: "/images/featured-summer.jpg",
        href: "/collections/summer-2024",
        cta: "Shop Now",
      },
      {
        title: "Premium Line",
        subtitle: "Luxury meets comfort",
        image: "/images/featured-premium.jpg",
        href: "/collections/premium",
        cta: "Explore",
      },
    ],
    promos: [
      { icon: <Truck className="w-4 h-4" />, text: "Free shipping over ৳1000" },
      { icon: <RotateCcw className="w-4 h-4" />, text: "30-day returns" },
      { icon: <Shield className="w-4 h-4" />, text: "2-year warranty" },
    ],
  },
  {
    name: "New In",
    href: "/new-arrivals",
    type: "dropdown",
    badge: "New",
    categories: [
      {
        title: "New Arrivals",
        items: [
          { name: "This Week", href: "/new-arrivals?filter=week", icon: <Sparkles className="w-4 h-4" /> },
          { name: "This Month", href: "/new-arrivals?filter=month" },
          { name: "Coming Soon", href: "/coming-soon", badge: "Soon" },
        ],
      },
    ],
  },
  {
    name: "Sale",
    href: "/sale",
    type: "dropdown",
    badge: "Up to 50%",
    categories: [
      {
        title: "Sale",
        items: [
          { name: "All Sale Items", href: "/sale" },
          { name: "Under ৳500", href: "/sale?max=500" },
          { name: "Under ৳1000", href: "/sale?max=1000" },
          { name: "Clearance", href: "/sale/clearance", badge: "Final Sale" },
        ],
      },
    ],
  },
  { name: "Brands", href: "/brands", type: "link" },
  { name: "About", href: "/about", type: "link" },
];

// Sample Data
const sampleCartItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Cotton Oversized T-Shirt",
    price: 490,
    originalPrice: 690,
    quantity: 2,
    image: "/images/product-1.jpg",
    size: "M",
    color: "Charcoal Black",
    slug: "premium-cotton-oversized-tshirt",
  },
  {
    id: "2",
    name: "Vintage Wash Hoodie",
    price: 1290,
    quantity: 1,
    image: "/images/product-2.jpg",
    size: "L",
    color: "Navy Blue",
    slug: "vintage-wash-hoodie",
  },
];

const searchSuggestions: SearchSuggestion[] = [
  { type: "product", name: "Oversized Cotton T-Shirt", href: "/product/1", image: "/images/product-1.jpg", price: 490 },
  { type: "product", name: "Premium Hoodie", href: "/product/2", image: "/images/product-2.jpg", price: 1290 },
  { type: "category", name: "T-Shirts", href: "/category/tshirts" },
  { type: "category", name: "Hoodies", href: "/category/hoodies" },
  { type: "brand", name: "AXRO Premium", href: "/brands/axro-premium" },
];

const recentSearches = ["Oversized T-Shirt", "Black Hoodie", "Summer Collection"];
const trendingSearches = ["Linen Shirts", "Cargo Pants", "Minimalist", "Streetwear"];

// ============ Components ============

// Animated Counter Badge
const AnimatedBadge = ({ count, variant = "primary" }: { count: number; variant?: "primary" | "secondary" }) => {
  const [animate, setAnimate] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      prevCount.current = count;
      return () => clearTimeout(timer);
    }
  }, [count]);

  if (count === 0) return null;

  return (
    <span
      className={`
        absolute -top-1.5 -right-1.5 min-w-[20px] h-5 flex items-center justify-center
        text-xs font-bold rounded-full px-1.5 transition-transform duration-300
        ${animate ? "scale-125" : "scale-100"}
        ${variant === "primary" 
          ? "bg-[var(--color-gold)] text-white shadow-lg" 
          : "bg-rose-500 text-white shadow-lg"
        }
      `}
      style={variant === "primary" ? { boxShadow: "0 4px 14px rgba(var(--color-gold-rgb, 212, 175, 55), 0.4)" } : undefined}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

// Icon Button Component
const IconButton = ({
  children,
  onClick,
  label,
  className = "",
  active = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
  className?: string;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`
      relative w-11 h-11 flex items-center justify-center rounded-full
      transition-all duration-300 ease-out
      ${active 
        ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)]" 
        : "text-gray-700 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)]"
      }
      ${className}
    `}
    aria-label={label}
  >
    {children}
  </button>
);

// Main NavBar Component
const NavBar = () => {
  const pathname = usePathname();
  
  // States
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sample data
  const isLoggedIn = false;
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const wishlistCount = 3;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartSavings = cartItems.reduce(
    (acc, item) => acc + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );

  const announcements = [
    { icon: <Truck className="w-4 h-4" />, text: "Free shipping on orders over ৳1000" },
    { icon: <Gift className="w-4 h-4" />, text: "Use code SAVE20 for 20% off your first order" },
    { icon: <Clock className="w-4 h-4" />, text: "Same day delivery in Dhaka" },
  ];

  // Scroll handling with hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Announcement rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Lock body scroll for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen, searchOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setUserMenuOpen(false);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Dropdown hover handlers with delay
  const handleDropdownEnter = useCallback((idx: number) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(idx);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 py-2.5 relative">
          <div className="flex items-center justify-center gap-3 min-h-[24px]">
            {announcements.map((announcement, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
                  idx === announcementIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <span className="text-[var(--color-gold)]">{announcement.icon}</span>
                <span className="whitespace-nowrap">
                  {announcement.text.includes("SAVE20") ? (
                    <>
                      Use code{" "}
                      <span className="font-bold text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-1.5 py-0.5 rounded">
                        SAVE20
                      </span>{" "}
                      for 20% off your first order
                    </>
                  ) : (
                    announcement.text
                  )}
                </span>
              </div>
            ))}
          </div>
          
          {/* Announcement Indicators */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5">
            {announcements.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setAnnouncementIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === announcementIndex
                    ? "bg-[var(--color-gold)] w-4"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Announcement ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`
          bg-white/95 backdrop-blur-lg sticky top-0 z-50
          transition-all duration-500 ease-out
          ${isScrolled ? "shadow-lg shadow-black/5" : "shadow-sm"}
          ${isHidden && !isMobileOpen && !cartOpen ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        {/* Top Bar - Desktop Only */}
        <div className="hidden lg:block border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-6 text-gray-600">
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[var(--color-gold)]/10 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+880 1700-000000</span>
              </a>
              <a
                href="mailto:hello@axro.com"
                className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[var(--color-gold)]/10 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>hello@axro.com</span>
              </a>
            </div>
            
            <div className="flex items-center divide-x divide-gray-200">
              <Link
                href="/track-order"
                className="flex items-center gap-2 px-4 text-gray-600 hover:text-[var(--color-gold)] transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>Track Order</span>
              </Link>
              <Link
                href="/stores"
                className="flex items-center gap-2 px-4 text-gray-600 hover:text-[var(--color-gold)] transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Find Store</span>
              </Link>
              <button className="flex items-center gap-2 pl-4 text-gray-600 hover:text-[var(--color-gold)] transition-colors">
                <Globe className="w-4 h-4" />
                <span>EN</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="border-b border-gray-100/50">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden relative w-11 h-11 flex items-center justify-center text-gray-700 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)] rounded-full transition-colors"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                <span className="sr-only">Menu</span>
                <div className="relative w-5 h-5">
                  <span
                    className={`absolute left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileOpen ? "top-[9px] rotate-45" : "top-1"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[9px] w-5 h-0.5 bg-current transition-all duration-300 ${
                      isMobileOpen ? "opacity-0 scale-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileOpen ? "top-[9px] -rotate-45" : "top-[17px]"
                    }`}
                  />
                </div>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <div
                    className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center bg-[var(--color-gold)] shadow-lg transition-shadow duration-300 group-hover:shadow-xl"
                  >
                    <span className="text-white font-bold text-lg lg:text-xl">A</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl lg:text-[1.75rem] font-extrabold tracking-tight leading-none">
                    <span className="text-[var(--color-gold)]">AX</span>
                    <span className="text-gray-900">RO</span>
                  </h1>
                  <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium -mt-0.5">
                    Premium Wear
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((navItem, idx) => (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => navItem.type !== "link" && handleDropdownEnter(idx)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={navItem.href}
                      className={`
                        relative flex items-center gap-1.5 px-4 py-2.5 font-medium text-[15px]
                        transition-all duration-200 rounded-xl group
                        ${isActiveLink(navItem.href)
                          ? "text-[var(--color-gold)] bg-[var(--color-gold)]/10"
                          : navItem.name === "Sale"
                          ? "text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                          : "text-gray-700 hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
                        }
                      `}
                    >
                      <span className="relative">
                        {navItem.name}
                      </span>
                      
                      {/* Badge */}
                      {navItem.badge && (
                        <span
                          className={`
                            text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide
                            ${navItem.name === "Sale"
                              ? "bg-rose-100 text-rose-600"
                              : "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                            }
                          `}
                        >
                          {navItem.badge}
                        </span>
                      )}
                      
                      {navItem.type !== "link" && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === idx ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Mega Menu */}
                    {navItem.type === "mega" && navItem.categories && (
                      <div
                        className={`
                          absolute top-full -left-8 pt-4 transition-all duration-300 ease-out
                          ${activeDropdown === idx
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-4 pointer-events-none"
                          }
                        `}
                      >
                        <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden w-[800px]">
                          <div className="grid grid-cols-12 gap-0">
                            {/* Categories */}
                            <div className="col-span-8 p-6 grid grid-cols-3 gap-6 border-r border-gray-100">
                              {navItem.categories.map((category, catIdx) => (
                                <div key={catIdx}>
                                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                    {category.title}
                                  </h3>
                                  <ul className="space-y-1">
                                    {category.items.map((item, itemIdx) => (
                                      <li key={itemIdx}>
                                        <Link
                                          href={item.href}
                                          className="group flex items-center gap-2 py-2 text-gray-600 hover:text-[var(--color-gold)] transition-colors"
                                          onClick={() => setActiveDropdown(null)}
                                        >
                                          {item.icon}
                                          <span className="text-sm">{item.name}</span>
                                          {item.badge && (
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                                              {item.badge}
                                            </span>
                                          )}
                                          <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-auto" />
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {/* Featured Section */}
                            <div className="col-span-4 p-4 bg-gray-50/50">
                              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide px-2">
                                Featured
                              </h3>
                              <div className="space-y-3">
                                {navItem.featured?.map((feature, featIdx) => (
                                  <Link
                                    key={featIdx}
                                    href={feature.href}
                                    className="block relative h-32 rounded-xl overflow-hidden group"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <Image
                                      src={feature.image}
                                      alt={feature.title}
                                      fill
                                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                      <p className="font-bold text-white text-sm">
                                        {feature.title}
                                      </p>
                                      <p className="text-white/70 text-xs mt-0.5">
                                        {feature.subtitle}
                                      </p>
                                    </div>
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              {/* Promos */}
                              {navItem.promos && (
                                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                                  {navItem.promos.map((promo, promoIdx) => (
                                    <div
                                      key={promoIdx}
                                      className="flex items-center gap-2 text-xs text-gray-600"
                                    >
                                      <span className="text-[var(--color-gold)]">{promo.icon}</span>
                                      <span>{promo.text}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Simple Dropdown */}
                    {navItem.type === "dropdown" && navItem.categories && (
                      <div
                        className={`
                          absolute top-full left-0 pt-4 transition-all duration-300 ease-out
                          ${activeDropdown === idx
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-4 pointer-events-none"
                          }
                        `}
                      >
                        <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden min-w-[240px]">
                          <div className="py-2">
                            {navItem.categories[0].items.map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-gold)]/10 transition-colors group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item.icon && (
                                  <span className="text-gray-400 group-hover:text-[var(--color-gold)] transition-colors">
                                    {item.icon}
                                  </span>
                                )}
                                <span className="flex-1 text-gray-700 group-hover:text-[var(--color-gold)] font-medium transition-colors">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-0.5 lg:gap-1">
                {/* Search */}
                <IconButton
                  onClick={() => setSearchOpen(true)}
                  label="Search (⌘K)"
                  active={searchOpen}
                >
                  <Search className="w-5 h-5" />
                </IconButton>

                {/* User Account - Desktop */}
                <div className="relative hidden sm:block" ref={userMenuRef}>
                  <IconButton
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    label="Account"
                    active={userMenuOpen}
                  >
                    <User className="w-5 h-5" />
                  </IconButton>

                  {/* User Dropdown */}
                  <div
                    className={`
                      absolute top-full right-0 pt-4 transition-all duration-300 ease-out z-50
                      ${userMenuOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-4 pointer-events-none"
                      }
                    `}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden w-72">
                      {isLoggedIn ? (
                        <>
                          <div className="px-5 py-4 border-b border-gray-100 bg-[var(--color-gold)]/5">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">JD</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">John Doe</p>
                                <p className="text-sm text-gray-500">Premium Member</p>
                              </div>
                            </div>
                          </div>
                          <div className="py-2">
                            {[
                              { icon: <User className="w-5 h-5" />, label: "My Account", href: "/account" },
                              { icon: <Package className="w-5 h-5" />, label: "Orders", href: "/orders", badge: "2" },
                              { icon: <Heart className="w-5 h-5" />, label: "Wishlist", href: "/wishlist" },
                              { icon: <CreditCard className="w-5 h-5" />, label: "Payment Methods", href: "/payments" },
                              { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "/settings" },
                            ].map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--color-gold)]/10 transition-colors group"
                                onClick={() => setUserMenuOpen(false)}
                              >
                                <span className="text-gray-400 group-hover:text-[var(--color-gold)] transition-colors">
                                  {item.icon}
                                </span>
                                <span className="flex-1 text-gray-700 group-hover:text-[var(--color-gold)] transition-colors">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-gray-100 p-3">
                            <button className="flex items-center justify-center gap-2 w-full py-2.5 text-rose-500 hover:bg-rose-50 font-medium rounded-xl transition-colors">
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-5">
                          <div className="text-center mb-5">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3">
                              <User className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-900 font-semibold">Welcome!</p>
                            <p className="text-gray-500 text-sm mt-1">
                              Sign in to access your account
                            </p>
                          </div>
                          <div className="space-y-3">
                            <Link
                              href="/login"
                              className="flex items-center justify-center w-full py-3 bg-[var(--color-gold)] hover:opacity-90 text-white font-semibold rounded-xl transition-all shadow-lg"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Sign In
                            </Link>
                            <Link
                              href="/register"
                              className="flex items-center justify-center w-full py-3 border-2 border-gray-200 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] text-gray-700 font-semibold rounded-xl transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Create Account
                            </Link>
                          </div>
                          <p className="text-center text-xs text-gray-400 mt-4">
                            Get 10% off your first order when you sign up
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Wishlist */}
                <Link href="/wishlist" className="relative">
                  <IconButton label="Wishlist">
                    <Heart className="w-5 h-5" />
                    <AnimatedBadge count={wishlistCount} variant="secondary" />
                  </IconButton>
                </Link>

                {/* Cart */}
                <div className="relative" ref={cartRef}>
                  <IconButton
                    onClick={() => setCartOpen(!cartOpen)}
                    label="Cart"
                    active={cartOpen}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <AnimatedBadge count={cartCount} />
                  </IconButton>

                  {/* Cart Dropdown */}
                  <div
                    className={`
                      absolute top-full right-0 pt-4 transition-all duration-300 ease-out z-50
                      ${cartOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-4 pointer-events-none"
                      }
                    `}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 w-[380px] max-h-[85vh] flex flex-col overflow-hidden">
                      {/* Cart Header */}
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5 text-[var(--color-gold)]" />
                          <span>Shopping Bag</span>
                          <span className="text-gray-400 font-normal">({cartCount})</span>
                        </h3>
                        <button
                          onClick={() => setCartOpen(false)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {cartItems.length > 0 ? (
                        <>
                          {/* Free Shipping Progress */}
                          <div className="px-5 py-3 bg-[var(--color-gold)]/10 border-b border-[var(--color-gold)]/20">
                            {cartTotal >= 1000 ? (
                              <div className="flex items-center gap-2 text-sm text-[var(--color-gold)]">
                                <Truck className="w-4 h-4" />
                                <span className="font-medium">
                                  You&apos;ve unlocked free shipping!
                                </span>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                                  <span>Add ৳{(1000 - cartTotal).toLocaleString()} for free shipping</span>
                                  <Truck className="w-4 h-4 text-[var(--color-gold)]" />
                                </div>
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[var(--color-gold)] rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((cartTotal / 1000) * 100, 100)}%` }}
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          {/* Cart Items */}
                          <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-4 p-3 bg-gray-50 rounded-xl group"
                              >
                                <Link
                                  href={`/product/${item.slug}`}
                                  className="relative w-20 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0"
                                  onClick={() => setCartOpen(false)}
                                >
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </Link>
                                <div className="flex-1 min-w-0">
                                  <Link
                                    href={`/product/${item.slug}`}
                                    className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-[var(--color-gold)] transition-colors"
                                    onClick={() => setCartOpen(false)}
                                  >
                                    {item.name}
                                  </Link>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.size} • {item.color}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-[var(--color-gold)]">
                                        ৳{item.price.toLocaleString()}
                                      </span>
                                      {item.originalPrice && (
                                        <span className="text-xs text-gray-400 line-through">
                                          ৳{item.originalPrice.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Quantity Controls */}
                                  <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
                                      <button
                                        onClick={() => updateCartQuantity(item.id, -1)}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)] transition-colors"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-8 text-center text-sm font-medium">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateCartQuantity(item.id, 1)}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)] transition-colors"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => removeFromCart(item.id)}
                                      className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Cart Footer */}
                          <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50">
                            {/* Savings */}
                            {cartSavings > 0 && (
                              <div className="flex items-center justify-between text-sm px-3 py-2 bg-green-50 rounded-lg text-green-700">
                                <span>You&apos;re saving</span>
                                <span className="font-bold">৳{cartSavings.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {/* Total */}
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="text-2xl font-bold text-gray-900">
                                ৳{cartTotal.toLocaleString()}
                              </span>
                            </div>
                            
                            <p className="text-xs text-gray-500 text-center">
                              Shipping & taxes calculated at checkout
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                              <Link
                                href="/cart"
                                className="py-3 border-2 border-gray-200 text-gray-700 text-center font-semibold rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                onClick={() => setCartOpen(false)}
                              >
                                View Bag
                              </Link>
                              <Link
                                href="/checkout"
                                className="py-3 bg-[var(--color-gold)] text-white text-center font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg"
                                onClick={() => setCartOpen(false)}
                              >
                                Checkout
                              </Link>
                            </div>
                            
                            {/* Trust Badges */}
                            <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Secure
                              </span>
                              <span className="flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" />
                                Easy Returns
                              </span>
                              <span className="flex items-center gap-1">
                                <Headphones className="w-3 h-3" />
                                24/7 Support
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                          </div>
                          <p className="text-gray-900 font-semibold mb-1">
                            Your bag is empty
                          </p>
                          <p className="text-sm text-gray-500 mb-6">
                            Looks like you haven&apos;t added anything yet
                          </p>
                          <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-gold)] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg"
                            onClick={() => setCartOpen(false)}
                          >
                            Start Shopping
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          isMobileOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`
            absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white
            shadow-2xl transition-transform duration-500 ease-out flex flex-col
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--color-gold)] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-[var(--color-gold)]">AX</span>
                <span className="text-gray-900">RO</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-100">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={mobileSearchRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navLinks.map((navItem, idx) => (
                <div key={idx}>
                  {navItem.type !== "link" && navItem.categories ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileDropdown(mobileDropdown === idx ? null : idx)
                        }
                        className={`
                          flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-colors
                          ${mobileDropdown === idx 
                            ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)]" 
                            : "text-gray-700 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)]"
                          }
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{navItem.name}</span>
                          {navItem.badge && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                              navItem.name === "Sale"
                                ? "bg-rose-100 text-rose-600"
                                : "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                            }`}>
                              {navItem.badge}
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            mobileDropdown === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          mobileDropdown === idx
                            ? "max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="py-2 space-y-1">
                          {navItem.categories.flatMap((cat) => cat.items).map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="flex items-center justify-between px-6 py-3 text-gray-600 hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 rounded-lg transition-colors ml-2"
                            >
                              <span>{item.name}</span>
                              {item.badge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={navItem.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        flex items-center gap-2 px-4 py-3.5 font-semibold rounded-xl transition-colors
                        ${isActiveLink(navItem.href)
                          ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                          : navItem.name === "Sale"
                          ? "text-rose-500 hover:bg-rose-50"
                          : "text-gray-700 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)]"
                        }
                      `}
                    >
                      {navItem.name}
                      {navItem.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          navItem.name === "Sale"
                            ? "bg-rose-100 text-rose-600"
                            : "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                        }`}>
                          {navItem.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-6 px-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                Quick Links
              </p>
              <div className="space-y-1">
                {[
                  { icon: <Package className="w-5 h-5" />, label: "Track Order", href: "/track-order" },
                  { icon: <MapPin className="w-5 h-5" />, label: "Find Store", href: "/stores" },
                  { icon: <Headphones className="w-5 h-5" />, label: "Customer Support", href: "/support" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20 rounded-xl transition-colors"
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-10 h-10 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">View Account</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--color-gold)] text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
              >
                <User className="w-5 h-5" />
                Sign In / Register
              </Link>
            )}
            
            <div className="flex items-center justify-center gap-4 pt-2 text-sm text-gray-500">
              <a href="tel:+8801700000000" className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
              <span className="text-gray-300">•</span>
              <a href="mailto:hello@axro.com" className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div
        className={`fixed inset-0 z-[70] transition-all duration-300 ${
          searchOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
            searchOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSearchOpen(false)}
        />

        {/* Search Container */}
        <div
          className={`
            absolute top-0 left-0 right-0 bg-white shadow-2xl
            transition-all duration-500 ease-out
            ${searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
          `}
        >
          <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products, categories, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full pl-14 pr-14 py-5 text-lg md:text-xl bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:bg-white transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-200 rounded">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </form>

            {/* Search Content */}
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Recent Searches
                      </h3>
                      <button className="text-xs text-[var(--color-gold)] hover:underline font-medium">
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)] text-gray-700 text-sm rounded-full transition-colors group"
                        >
                          <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--color-gold)]" />
                          <span>{term}</span>
                          <X className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
                    Trending Now
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-[var(--color-gold)]/10 hover:bg-[var(--color-gold)]/20 text-[var(--color-gold)] text-sm font-medium rounded-full transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Suggestions */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {searchQuery ? "Suggestions" : "Popular Products"}
                </h3>
                <div className="space-y-2">
                  {searchSuggestions
                    .filter((s) => s.type === "product")
                    .slice(0, 4)
                    .map((suggestion) => (
                      <Link
                        key={suggestion.href}
                        href={suggestion.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-3 bg-gray-50 hover:bg-[var(--color-gold)]/10 rounded-xl transition-colors group"
                      >
                        <div className="relative w-14 h-14 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {suggestion.image && (
                            <Image
                              src={suggestion.image}
                              alt={suggestion.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 group-hover:text-[var(--color-gold)] transition-colors truncate">
                            {suggestion.name}
                          </p>
                          {suggestion.price && (
                            <p className="text-sm text-[var(--color-gold)] font-semibold mt-0.5">
                              ৳{suggestion.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Categories Quick Links */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Browse Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["T-Shirts", "Hoodies", "Pants", "Accessories"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)] text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    {cat}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`
          fixed bottom-6 right-6 w-12 h-12 bg-[var(--color-gold)] text-white rounded-full
          shadow-lg flex items-center justify-center z-40
          transition-all duration-300 hover:opacity-90 hover:scale-110
          ${isScrolled && !isHidden ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}
        `}
        aria-label="Scroll to top"
      >
        <ChevronDown className="w-5 h-5 rotate-180" />
      </button>
    </>
  );
};

export default NavBar;