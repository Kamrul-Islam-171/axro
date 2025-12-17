// components/Footer.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronUp,
  Heart,
  Loader2,
  CheckCircle,
  Shield,
  Truck,
  RefreshCw,
  Headphones,
  Clock,
  ArrowRight,
} from "lucide-react";

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribing(false);
    setIsSubscribed(true);
    setEmail("");

    setTimeout(() => setIsSubscribed(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/shop" },
      { name: "New Arrivals", href: "/shop?filter=new" },
      { name: "Best Sellers", href: "/shop?filter=bestseller" },
      { name: "On Sale", href: "/shop?filter=sale" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faq" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Track Order", href: "/track-order" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Blog", href: "/blog" },
    ],
  };

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over ৳2000",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "7-day return policy",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Cash on Delivery",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated support",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/axro",
      hoverBg: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/axro",
      hoverBg: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      href: "https://tiktok.com/@axro",
      hoverBg: "hover:bg-zinc-950",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:support@axro.com",
      hoverBg: "hover:bg-[var(--color-gold)]",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-300">
      {/* Features Bar */}
      <div className="border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center group-hover:bg-[var(--color-gold)]/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-zinc-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative bg-gradient-to-r from-zinc-800/60 via-zinc-800/40 to-zinc-800/60 rounded-2xl p-6 lg:p-10 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-gold)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  Join Our Newsletter
                </h3>
                <p className="text-zinc-400 text-sm lg:text-base max-w-md">
                  Subscribe to get exclusive offers, new arrivals & 10% off your
                  first order!
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="Enter your email address"
                    className={`w-full sm:w-72 lg:w-80 px-5 py-3.5 rounded-xl bg-zinc-900/80 border-2 ${
                      emailError
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-zinc-700/50 focus:border-[var(--color-gold)]"
                    } text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/20 transition-all duration-300`}
                  />
                  <p
                    className={`absolute -bottom-5 left-0 text-xs text-red-400 transition-all duration-300 ${
                      emailError
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1"
                    }`}
                  >
                    {emailError}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3.5 bg-[var(--color-gold)] text-white font-semibold rounded-xl hover:bg-[var(--color-gold)]/90 hover:shadow-lg hover:shadow-[var(--color-gold)]/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing</span>
                    </>
                  ) : isSubscribed ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Success Message */}
            <div
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg transition-all duration-500 ${
                isSubscribed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="text-sm text-emerald-400 flex items-center gap-2 whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                Thanks for subscribing! Check your email for a welcome gift.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <Link href="/" className="inline-block group">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                <span className="text-[var(--color-gold)] group-hover:text-[var(--color-gold)]/80 transition-colors duration-300">
                  Ax
                </span>
                <span className="group-hover:text-zinc-200 transition-colors duration-300">
                  ro
                </span>
              </h2>
            </Link>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-sm">
              Premium quality t-shirts crafted for the modern lifestyle. Where
              comfort meets style, and every piece tells a story.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="tel:+8801XXXXXXXXX"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-[var(--color-gold)] transition-colors duration-300 group"
              >
                <span className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-[var(--color-gold)]/10 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </span>
                <span>+880 1XXX-XXXXXX</span>
              </a>
              <a
                href="mailto:support@axro.com"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-[var(--color-gold)] transition-colors duration-300 group"
              >
                <span className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-[var(--color-gold)]/10 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </span>
                <span>support@axro.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </span>
                <span>Sat-Thu: 10AM - 8PM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110 ${social.hoverBg}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-[var(--color-gold)] transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-[var(--color-gold)] transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-[var(--color-gold)] transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Trust */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Payment
            </h3>

            {/* Cash on Delivery Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Cash on Delivery</p>
                  <p className="text-xs text-zinc-400">Pay when you receive</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-[var(--color-gold)]" />
                <span className="text-sm text-white font-medium">
                  Secure Shopping
                </span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "100% Authentic Products",
                  "Quality Guaranteed",
                  "Easy Returns & Exchange",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-zinc-400"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800/50 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-zinc-500 order-2 md:order-1">
              © {currentYear} <span className="text-zinc-400">Axro</span>. All
              rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm order-1 md:order-2">
              <Link
                href="/privacy-policy"
                className="text-zinc-500 hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-zinc-500 hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                className="text-zinc-500 hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                Refund Policy
              </Link>
            </div>

            {/* Made with love */}
            <p className="text-sm text-zinc-500 flex items-center gap-1.5 order-3">
              Made with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
              in Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {/* <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[var(--color-gold)] text-white shadow-lg shadow-[var(--color-gold)]/25 flex items-center justify-center hover:bg-[var(--color-gold)]/90 hover:scale-110 active:scale-95 transition-all duration-300 z-50 group ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button> */}
    </footer>
  );
}