import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  imageSrc: string;
  title?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  discount?: number;
  category?: string;
  id?: string;
}

const ProductCard = ({
  id = '1',
  imageSrc,
  title = "Drop Shoulder Print",
  price = 490,
  originalPrice = 650,
  rating = 4.5,
  reviewCount = 128,
  isNew = false,
  discount = 25,
  category = "T-Shirt",
}: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button - Always visible on mobile, hover on desktop */}
        <button
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full 
                     flex items-center justify-center shadow-md
                     opacity-100 md:opacity-0 md:group-hover:opacity-100 
                     hover:bg-red-50 hover:text-red-500 
                     transition-all duration-300 transform md:translate-x-2 md:group-hover:translate-x-0"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick View Button - Only on desktop hover */}
        <button
          className="absolute top-14 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full 
                     hidden md:flex items-center justify-center shadow-md
                     opacity-0 group-hover:opacity-100 
                     hover:bg-[var(--color-gold)] hover:text-white 
                     transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 delay-75"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <Link href={`/details/${id}`} className="block">
          <div className="aspect-[7/8]  relative bg-gray-50">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 md:group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        {/* Add to Cart - Slide up on desktop hover, always visible on mobile */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3
                      md:translate-y-full md:group-hover:translate-y-0 
                      transition-transform duration-300 ease-out
                      bg-gradient-to-t from-black/20 to-transparent md:from-transparent md:bg-none"
        >
          <button
            className="w-full py-2.5 px-4 bg-gray-900 hover:bg-[var(--color-gold)] 
                       text-white text-sm font-medium rounded-lg
                       flex items-center justify-center gap-2
                       transition-all duration-300 
                       active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          {category}
        </p>

        {/* Title */}
        <Link href={`/details/${id}`} className="block">
          <h3
            className="text-sm md:text-base font-medium text-gray-800 
                         hover:text-[var(--color-gold)] transition-colors duration-200
                         line-clamp-2 leading-snug"
          >
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? "text-amber-400 fill-amber-400"
                    : i < rating
                    ? "text-amber-400 fill-amber-400/50"
                    : "text-gray-200 fill-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-gray-900">
            ৳{price.toLocaleString()}
          </span>
          {originalPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              ৳{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Quick Actions Bar - Only visible on mobile */}
      <div className="md:hidden border-t border-gray-100 px-4 py-3 flex items-center justify-between">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[var(--color-gold)] transition-colors">
          <Heart className="w-4 h-4" />
          <span>Wishlist</span>
        </button>
        <div className="w-px h-4 bg-gray-200" />
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[var(--color-gold)] transition-colors">
          <Eye className="w-4 h-4" />
          <span>Quick View</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;