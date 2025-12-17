"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Sparkles } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/parallax";
import "./homeSlider.css";

// Types
interface SlideContent {
  id: number;
  image: string;
  mobileImage?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  subtitle?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  position?: "left" | "center" | "right";
  theme?: "light" | "dark";
  overlayOpacity?: number;
}

// Slide Data
const slides: SlideContent[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
    badge: "New Collection",
    badgeIcon: <Sparkles className="w-3.5 h-3.5" />,
    subtitle: "Summer 2024",
    title: "Redefine Your",
    titleHighlight: "Style",
    description: "Discover premium quality t-shirts crafted for comfort and designed for the modern lifestyle.",
    primaryCTA: { text: "Shop Collection", href: "/collections/summer-2024" },
    secondaryCTA: { text: "Learn More", href: "/about" },
    position: "left",
    theme: "dark",
    overlayOpacity: 40,
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    badge: "Limited Edition",
    subtitle: "Exclusive Drop",
    title: "Premium",
    titleHighlight: "Streetwear",
    description: "Elevate your wardrobe with our exclusive streetwear collection. Limited pieces, unlimited style.",
    primaryCTA: { text: "Explore Now", href: "/collections/streetwear" },
    position: "center",
    theme: "dark",
    overlayOpacity: 50,
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg",
    badge: "Up to 50% Off",
    subtitle: "Season Sale",
    title: "Unbeatable",
    titleHighlight: "Deals",
    description: "Don't miss out on our biggest sale of the season. Premium quality at unbeatable prices.",
    primaryCTA: { text: "Shop Sale", href: "/sale" },
    secondaryCTA: { text: "View All", href: "/products" },
    position: "right",
    theme: "dark",
    overlayOpacity: 45,
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Progress bar animation
  useEffect(() => {
    if (isPlaying) {
      setProgress(0);
      const startTime = Date.now();
      
      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(newProgress);
      }, 50);

      return () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      };
    }
  }, [activeIndex, isPlaying]);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setProgress(0);
  };

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  const getPositionClasses = (position: string = "left") => {
    switch (position) {
      case "center":
        return "items-center text-center";
      case "right":
        return "items-end text-right";
      default:
        return "items-start text-left";
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        speed={1200}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        parallax={true}
        centeredSlides={true}
        autoplay={{
          delay: SLIDE_DURATION,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
                {/* Background Image with Parallax */}
                <div 
                  className="absolute inset-0"
                  data-swiper-parallax="-23%"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    quality={90}
                    className={`
                      object-cover transition-transform duration-[2s] ease-out
                      ${isActive ? "scale-100" : "scale-110"}
                    `}
                  />
                </div>

                {/* Gradient Overlays */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
                  style={{ opacity: slide.overlayOpacity ? slide.overlayOpacity / 100 : 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
                <div 
                  className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"
                />

                {/* Content Container */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`h-full flex flex-col justify-center ${getPositionClasses(slide.position)}`}>
                    <div className={`max-w-2xl ${slide.position === "center" ? "mx-auto" : ""}`}>
                      
                      {/* Badge */}
                      {slide.badge && (
                        <div 
                          className={`
                            inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[var(--color-gold)] text-white text-sm font-semibold
                            mb-4 md:mb-6 shadow-lg
                            transition-all duration-700 ease-out
                            ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                          `}
                          style={{ transitionDelay: "200ms" }}
                        >
                          {slide.badgeIcon}
                          <span>{slide.badge}</span>
                        </div>
                      )}

                      {/* Subtitle */}
                      {slide.subtitle && (
                        <p 
                          className={`
                            text-[var(--color-gold)] text-sm md:text-base lg:text-lg font-medium
                            tracking-[0.2em] uppercase mb-2 md:mb-3
                            transition-all duration-700 ease-out
                            ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                          `}
                          style={{ transitionDelay: "300ms" }}
                          data-swiper-parallax="-100"
                        >
                          {slide.subtitle}
                        </p>
                      )}

                      {/* Main Title */}
                      <h1 
                        className={`
                          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                          font-bold text-white leading-[1.1] mb-4 md:mb-6
                          transition-all duration-700 ease-out
                          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                        `}
                        style={{ transitionDelay: "400ms" }}
                        data-swiper-parallax="-200"
                      >
                        {slide.title}
                        {slide.titleHighlight && (
                          <>
                            <br />
                            <span className="text-[var(--color-gold)] relative">
                              {slide.titleHighlight}
                              <svg 
                                className="absolute -bottom-2 left-0 w-full h-3 text-[var(--color-gold)]/30"
                                viewBox="0 0 200 12"
                                preserveAspectRatio="none"
                              >
                                <path 
                                  d="M0,6 Q50,0 100,6 T200,6" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="4"
                                  className={`
                                    transition-all duration-1000 ease-out
                                    ${isActive ? "stroke-dashoffset-0" : "stroke-dashoffset-full"}
                                  `}
                                  style={{
                                    strokeDasharray: 200,
                                    strokeDashoffset: isActive ? 0 : 200,
                                  }}
                                />
                              </svg>
                            </span>
                          </>
                        )}
                      </h1>

                      {/* Description */}
                      {slide.description && (
                        <p 
                          className={`
                            text-gray-300 text-base md:text-lg lg:text-xl
                            max-w-lg mb-6 md:mb-8 leading-relaxed
                            transition-all duration-700 ease-out
                            ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                            ${slide.position === "center" ? "mx-auto" : ""}
                          `}
                          style={{ transitionDelay: "500ms" }}
                          data-swiper-parallax="-300"
                        >
                          {slide.description}
                        </p>
                      )}

                      {/* CTAs */}
                      <div 
                        className={`
                          flex flex-wrap gap-4
                          transition-all duration-700 ease-out
                          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                          ${slide.position === "center" ? "justify-center" : ""}
                        `}
                        style={{ transitionDelay: "600ms" }}
                        data-swiper-parallax="-400"
                      >
                        {/* Primary CTA */}
                        <Link
                          href={slide.primaryCTA.href}
                          className="group relative inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 
                            bg-[var(--color-gold)] text-white font-semibold text-base md:text-lg
                            rounded-full overflow-hidden transition-all duration-300
                            hover:shadow-[0_0_40px_rgba(var(--color-gold-rgb,212,175,55),0.4)]"
                        >
                          <span className="relative z-10">{slide.primaryCTA.text}</span>
                          <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>

                        {/* Secondary CTA */}
                        {slide.secondaryCTA && (
                          <Link
                            href={slide.secondaryCTA.href}
                            className="group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4
                              border-2 border-white/50 text-white font-semibold text-base md:text-lg
                              rounded-full transition-all duration-300
                              hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
                              hover:bg-white/5"
                          >
                            <span>{slide.secondaryCTA.text}</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`
                    group relative h-1 rounded-full overflow-hidden transition-all duration-500
                    ${activeIndex === index ? "w-16 md:w-24 bg-white/30" : "w-8 md:w-12 bg-white/20 hover:bg-white/30"}
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {/* Progress Fill */}
                  {activeIndex === index && (
                    <div 
                      className="absolute inset-y-0 left-0 bg-[var(--color-gold)] rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  
                  {/* Hover Fill */}
                  {activeIndex !== index && (
                    <div className="absolute inset-0 bg-white/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              {/* Play/Pause Button */}
              <button
                onClick={toggleAutoplay}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 
                  flex items-center justify-center text-white
                  hover:bg-white/10 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
                  transition-all duration-300"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
                )}
              </button>

              {/* Prev Button */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 
                  flex items-center justify-center text-white
                  hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)]
                  transition-all duration-300 group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>

              {/* Next Button */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 
                  flex items-center justify-center text-white
                  hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)]
                  transition-all duration-300 group"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Slide Counter */}
          <div className="hidden md:flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span className="text-2xl font-bold text-[var(--color-gold)]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-white/40">/</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-white/60 text-sm">
              {slides[activeIndex].title} {slides[activeIndex].titleHighlight}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Side Decoration */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-8 z-20 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="flex flex-col items-center -rotate-90 origin-center">
          <span className="text-white/50 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
            AXRO — Premium Wear
          </span>
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSlider;