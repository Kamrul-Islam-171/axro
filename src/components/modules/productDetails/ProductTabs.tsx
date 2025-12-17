"use client";

import { useState } from "react";
import {
  Ruler,
  Droplets,
  Wind,
  Sun,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Shirt,
  Leaf,
  ThermometerSun,
} from "lucide-react";

interface ProductTabsProps {
  product?: {
    fullDescription?: string;
    material?: string;
    careInstructions?: string[];
    features?: string[];
    specifications?: {
      label: string;
      value: string;
    }[];
  };
}

const defaultProductData = {
  fullDescription: `
    Elevate your casual wardrobe with our Premium Cotton Oversized Drop Shoulder T-Shirt. 
    Crafted from 100% organic cotton, this t-shirt offers exceptional comfort and durability 
    that lasts wash after wash.

    The relaxed drop shoulder design creates a modern, effortlessly cool silhouette that's 
    perfect for layering or wearing on its own. The oversized fit provides freedom of movement 
    while maintaining a stylish, contemporary look.

    Our commitment to quality means every stitch is carefully constructed to ensure longevity. 
    The fabric is pre-shrunk and treated to resist fading, so your t-shirt looks as good as 
    new even after multiple washes.
  `,
  material: `
    This t-shirt is made from 100% premium organic cotton sourced from sustainable farms. 
    The fabric features:

    • 180 GSM heavyweight cotton for durability
    • Ring-spun yarn for a softer, smoother texture
    • Reactive-dyed colors for vibrant, long-lasting hues
    • Bio-washed finish for extra softness

    The organic cotton is certified by GOTS (Global Organic Textile Standard), ensuring 
    it meets stringent environmental and social criteria throughout the entire supply chain.
  `,
  careInstructions: [
    "Machine wash cold with similar colors",
    "Do not bleach",
    "Tumble dry low or hang dry",
    "Warm iron if needed, inside out",
    "Do not dry clean",
    "Wash inside out to preserve print",
  ],
  features: [
    "100% Organic Cotton",
    "Drop shoulder relaxed fit",
    "Ribbed crew neckline",
    "Reinforced shoulder seams",
    "Pre-shrunk fabric",
    "Tagless comfort label",
    "Side-seamed construction",
    "Sustainable & eco-friendly",
  ],
  specifications: [
    { label: "Material", value: "100% Organic Cotton" },
    { label: "Weight", value: "180 GSM" },
    { label: "Fit Type", value: "Oversized / Relaxed" },
    { label: "Neckline", value: "Crew Neck" },
    { label: "Sleeve Type", value: "Drop Shoulder" },
    { label: "Pattern", value: "Solid" },
    { label: "Care", value: "Machine Washable" },
    { label: "Origin", value: "Made in Bangladesh" },
  ],
};

const tabs = [
  { id: "description", label: "Description" },
  { id: "details", label: "Fabric & Care" },
  { id: "sizing", label: "Size Guide" },
  { id: "shipping", label: "Shipping & Returns" },
];

const ProductTabs = ({ product = defaultProductData }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 bg-white rounded-t-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-4 font-medium text-sm md:text-base transition-all 
                         relative whitespace-nowrap ${
                           activeTab === tab.id
                             ? "text-[var(--color-gold)]"
                             : "text-gray-500 hover:text-gray-900"
                         }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-gold)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-sm p-6 md:p-8">
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Main Description */}
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Product Description
                </h3>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.fullDescription}
                </div>
              </div>

              {/* Features Grid */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {product.features?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {product.specifications?.map((spec, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-gray-900 w-1/3">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Fabric & Care Tab */}
          {activeTab === "details" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Material Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-[var(--color-gold)]" />
                  Material & Fabric
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.material}
                  </div>
                </div>
              </div>

              {/* Fabric Properties */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Fabric Properties
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium text-gray-900">Breathable</p>
                    <p className="text-sm text-gray-500">Moisture wicking</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Leaf className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="font-medium text-gray-900">Eco-Friendly</p>
                    <p className="text-sm text-gray-500">Organic cotton</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <ThermometerSun className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <p className="font-medium text-gray-900">All Season</p>
                    <p className="text-sm text-gray-500">Year-round comfort</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <p className="font-medium text-gray-900">Pre-Washed</p>
                    <p className="text-sm text-gray-500">No shrinkage</p>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Care Instructions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.careInstructions?.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--color-gold)] font-medium text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-700">{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Symbols */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Care Symbols
                </h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-xs text-gray-500 text-center">
                      Machine Wash
                      <br />
                      Cold
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 border-2 border-gray-300 rounded-full flex items-center justify-center relative">
                      <AlertCircle className="w-6 h-6 text-gray-600" />
                      <span className="absolute -top-1 -right-1 text-red-500 text-xl">
                        ✕
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 text-center">
                      Do Not
                      <br />
                      Bleach
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <Wind className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-xs text-gray-500 text-center">
                      Tumble Dry
                      <br />
                      Low
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <Sun className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-xs text-gray-500 text-center">
                      Warm Iron
                      <br />
                      Inside Out
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Size Guide Tab */}
          {activeTab === "sizing" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-5 h-5 text-[var(--color-gold)]" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Size Chart
                </h3>
              </div>

              {/* Size Note */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium">
                    Oversized Fit Notice
                  </p>
                  <p className="text-amber-700 text-sm">
                    This item has a relaxed, oversized fit. If you prefer a more
                    fitted look, we recommend sizing down.
                  </p>
                </div>
              </div>

              {/* Size Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="px-4 py-3 text-left font-medium">Size</th>
                      <th className="px-4 py-3 text-center font-medium">
                        Chest (inches)
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Length (inches)
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Shoulder (inches)
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Sleeve (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: "XS", chest: "38", length: "27", shoulder: "19", sleeve: "8" },
                      { size: "S", chest: "40", length: "28", shoulder: "20", sleeve: "8.5" },
                      { size: "M", chest: "42", length: "29", shoulder: "21", sleeve: "9" },
                      { size: "L", chest: "44", length: "30", shoulder: "22", sleeve: "9.5" },
                      { size: "XL", chest: "46", length: "31", shoulder: "23", sleeve: "10" },
                      { size: "XXL", chest: "48", length: "32", shoulder: "24", sleeve: "10.5" },
                    ].map((row, index) => (
                      <tr
                        key={row.size}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } border-b border-gray-200`}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {row.size}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {row.chest}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {row.length}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {row.shoulder}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {row.sleeve}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* How to Measure */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  How to Measure
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Chest</p>
                      <p className="text-gray-600">
                        Measure around the fullest part of your chest, keeping
                        the tape horizontal.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Length</p>
                      <p className="text-gray-600">
                        Measure from the highest point of the shoulder to the
                        bottom hem.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Shoulder</p>
                      <p className="text-gray-600">
                        Measure from one shoulder seam to the other across the
                        back.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      4
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">Sleeve</p>
                      <p className="text-gray-600">
                        Measure from the shoulder seam to the end of the sleeve.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping & Returns Tab */}
          {activeTab === "shipping" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Shipping Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Shipping Information
                </h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        Standard Delivery
                      </span>
                      <span className="text-[var(--color-gold)] font-semibold">
                        ৳60
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Delivery within 3-5 business days
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        Express Delivery
                      </span>
                      <span className="text-[var(--color-gold)] font-semibold">
                        ৳120
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Delivery within 1-2 business days
                    </p>
                  </div>
                  <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        Free Shipping
                      </span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      On orders over ৳1000
                    </p>
                  </div>
                </div>
              </div>

              {/* Returns Policy */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Returns & Exchange
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        7 Days Easy Returns
                      </p>
                      <p className="text-gray-600 text-sm">
                        Return or exchange within 7 days of delivery
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Original Condition Required
                      </p>
                      <p className="text-gray-600 text-sm">
                        Items must be unworn with original tags attached
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Free Exchange</p>
                      <p className="text-gray-600 text-sm">
                        Exchange for different size or color at no extra cost
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;