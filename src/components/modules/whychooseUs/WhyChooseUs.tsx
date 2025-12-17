// components/home/WhyChooseUs.tsx
"use client";

import {
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCcw,
  CreditCard,
  Award,
  Package,
  Clock,
  Heart,
  Sparkles,
  BadgeCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders over ৳1000. Fast & reliable shipping nationwide.",
    highlight: "Free over ৳1000",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure payment with SSL encryption. Multiple payment options available.",
    highlight: "100% Secure",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy. No questions asked refund guarantee.",
    highlight: "30 Days",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support. We're here to help anytime you need.",
    highlight: "Always Online",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handpicked premium fabrics and materials. Quality you can feel and trust.",
    highlight: "Top Quality",
  },
  {
    icon: Package,
    title: "Fast Delivery",
    description: "Same-day delivery in Dhaka. Express shipping options available countrywide.",
    highlight: "Same Day",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-semibold rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            Why Shop With Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The AXRO <span className="text-[var(--color-gold)]">Difference</span>
          </h2>
          <p className="text-gray-600 text-lg">
            We're committed to providing you with the best shopping experience. 
            Here's what sets us apart from the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--color-gold)]/30 overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              
              {/* Icon */}
              <div className="relative mb-5">
                <div className="w-14 h-14 bg-[var(--color-gold)]/10 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-gold)] transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-[var(--color-gold)] group-hover:text-white transition-colors duration-300" />
                </div>
                {/* Highlight Badge */}
                <span className="absolute -top-2 -right-2 px-2 py-1 bg-[var(--color-gold)] text-white text-[10px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.highlight}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;