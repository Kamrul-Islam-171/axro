"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Minus,
  Plus,
  Check,
  ChevronRight,
  Star,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface ProductColor {
  id: number;
  name: string;
  hex: string;
  image?: string;
}

interface ProductSize {
  id: number;
  name: string;
  available: boolean;
}

interface ProductDetailsProps {
  product?: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    description: string;
    rating: number;
    reviewCount: number;
    sku: string;
    category: string;
    tags: string[];
    images: ProductImage[];
    colors: ProductColor[];
    sizes: ProductSize[];
    inStock: boolean;
    stockCount?: number;
  };
}

const defaultProduct = {
  id: "PRD-001",
  title: "Premium Cotton Oversized Drop Shoulder T-Shirt",
  price: 490,
  originalPrice: 750,
  description:
    "Experience ultimate comfort with our premium cotton oversized t-shirt. Features a relaxed drop shoulder design, perfect for casual everyday wear.",
  rating: 4.8,
  reviewCount: 256,
  sku: "TSH-DRP-BLK-001",
  category: "T-Shirts",
  tags: ["Cotton", "Oversized", "Casual", "Summer", "Streetwear"],
  images: [
    { id: 1, src: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg", alt: "Product front view" },
    { id: 2, src: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png", alt: "Product back view" },
    { id: 3, src: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg", alt: "Product side view" },
    { id: 4, src: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png", alt: "Product detail view" },
  ],
  colors: [
    { id: 1, name: "Midnight Black", hex: "#1a1a1a" },
    { id: 2, name: "Cloud White", hex: "#f5f5f5" },
    { id: 3, name: "Navy Blue", hex: "#1e3a5f" },
    { id: 4, name: "Olive Green", hex: "#4a5d23" },
    { id: 5, name: "Burgundy", hex: "#722f37" },
  ],
  sizes: [
    { id: 1, name: "XS", available: false },
    { id: 2, name: "S", available: true },
    { id: 3, name: "M", available: true },
    { id: 4, name: "L", available: true },
    { id: 5, name: "XL", available: true },
    { id: 6, name: "XXL", available: false },
  ],
  inStock: true,
  stockCount: 15,
};

const ProductDetails = ({ product = defaultProduct }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < (product.stockCount || 10)) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    // Add to cart logic
    console.log({
      product: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-[var(--color-gold)] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/category/${product.category.toLowerCase()}`}
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in group"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src={product.images[selectedImage].src}
                alt={product.images[selectedImage].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                  -{discount}% OFF
                </div>
              )}

              {/* Zoom Icon */}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-24 md:w-24 md:h-28 flex-shrink-0 rounded-lg overflow-hidden 
                             transition-all duration-200 ${
                               selectedImage === index
                                 ? "ring-2 ring-[var(--color-gold)] ring-offset-2"
                                 : "ring-1 ring-gray-200 hover:ring-gray-300"
                             }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  In Stock
                </span>
                {product.stockCount && product.stockCount < 20 && (
                  <span className="text-sm text-orange-600">
                    Only {product.stockCount} left!
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
                    Save ৳{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <hr className="border-gray-200" />

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  Color: <span className="text-gray-600">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full relative transition-all duration-200 
                               hover:scale-110 ${
                                 selectedColor.id === color.id
                                   ? "ring-2 ring-[var(--color-gold)] ring-offset-2"
                                   : "ring-1 ring-gray-300"
                               }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <Check
                        className={`absolute inset-0 m-auto w-5 h-5 ${
                          color.hex === "#f5f5f5" || color.hex === "#ffffff"
                            ? "text-gray-800"
                            : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  Size:{" "}
                  <span className="text-gray-600">
                    {selectedSize?.name || "Select a size"}
                  </span>
                </span>
                <button className="text-sm text-[var(--color-gold)] hover:underline font-medium">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => {
                      if (size.available) {
                        setSelectedSize(size);
                        setSizeError(false);
                      }
                    }}
                    disabled={!size.available}
                    className={`min-w-[50px] h-12 px-4 rounded-lg font-medium text-sm 
                               transition-all duration-200 ${
                                 !size.available
                                   ? "bg-gray-100 text-gray-300 cursor-not-allowed line-through"
                                   : selectedSize?.id === size.id
                                   ? "bg-gray-900 text-white"
                                   : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                               }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-red-500 text-sm">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <span className="font-medium text-gray-900">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 
                             hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed 
                             transition-colors rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-medium text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    disabled={quantity >= (product.stockCount || 10)}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 
                             hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed 
                             transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stockCount} pieces available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-[var(--color-gold)] hover:bg-[#b8922a] text-white 
                         font-semibold rounded-xl flex items-center justify-center gap-2 
                         transition-all duration-300 active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`h-14 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 
                           transition-all duration-300 border-2 ${
                             isWishlisted
                               ? "bg-red-50 border-red-500 text-red-500"
                               : "border-gray-300 text-gray-700 hover:border-gray-400"
                           }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`}
                />
                <span className="hidden sm:inline">Wishlist</span>
              </button>
              <button
                className="h-14 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 
                          border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-all"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white font-semibold 
                       rounded-xl transition-all duration-300 active:scale-[0.98]"
            >
              Buy Now
            </button>

            <hr className="border-gray-200" />

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Truck className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-500">Orders over ৳1000</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <RotateCcw className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500">7 days return</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Shield className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% Protected</p>
                </div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">SKU:</span> {product.sku}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">Category:</span>{" "}
                <Link
                  href={`/category/${product.category.toLowerCase()}`}
                  className="text-[var(--color-gold)] hover:underline"
                >
                  {product.category}
                </Link>
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-gray-900">Tags:</span>
                {product.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${tag.toLowerCase()}`}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md 
                             hover:bg-[var(--color-gold)] hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsZoomed(false)}
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
          <div className="relative w-full max-w-4xl aspect-[3/4]">
            <Image
              src={product.images[selectedImage].src}
              alt={product.images[selectedImage].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;