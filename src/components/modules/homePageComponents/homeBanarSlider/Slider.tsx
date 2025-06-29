"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './homeSlider.css'

const Slider = () => {
  return (
    <>
      <Swiper
      speed={2500}
   
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg"
              alt="T-shirt"
              width={1000}
              height={600}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />

            {/* Overlay Content */}
            <div className=" absolute inset-0 bg-black/33  flex gap-4 flex-col justify-center items-center text-white ">
              <div className="px-10 py-5 md:px-20 md:py-10 lg:px-20 lg:py-8 bg-black/13 space-y-4 text-center">
                <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold">
                  Stylish T-Shirt
                </h2>
                <Button className="px-5  border border-white bg-transparent rounded lg:text-lg md:text-lg hover:bg-white/13 cursor-pointer">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png"
              alt="T-shirt"
              width={1000}
              height={600}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />

            {/* Overlay Content */}
            <div className=" absolute inset-0 bg-black/33  flex gap-4 flex-col justify-center items-center text-white ">
              <div className="px-10 py-5 md:px-20 md:py-10 lg:px-20 lg:py-8 bg-black/13 space-y-4 text-center">
                <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold">
                  Stylish T-Shirt
                </h2>
                <Button className="px-5  border border-white bg-transparent rounded lg:text-lg md:text-lg hover:bg-white/13 cursor-pointer">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg"
              alt="T-shirt"
              width={1000}
              height={600}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />

            {/* Overlay Content */}
            <div className=" absolute inset-0 bg-black/33  flex gap-4 flex-col justify-center items-center text-white ">
              <div className="px-10 py-5 md:px-20 md:py-10 lg:px-20 lg:py-8 bg-black/13 space-y-4 text-center">
                <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold">
                  Stylish T-Shirt
                </h2>
                <Button className="px-5  border border-white bg-transparent rounded lg:text-lg md:text-lg hover:bg-white/13 cursor-pointer">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;

// bg-black/33 = It sets the background color to black (#000) and applies 33% transparency.
// background-color: rgba(0, 0, 0, 0.33);

{
  /* <div className="relative">
      
      <Image
        src="https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg"
        alt="T-shirt"
        width={1000}
        height={600}
        className="w-full h-auto lg:h-[500px] object-cover"
      />

     
      <div className=" absolute inset-0 bg-black/33  flex gap-4 flex-col justify-center items-center text-white ">
      <div className="px-10 py-5 md:px-20 md:py-10 lg:px-20 lg:py-8 bg-black/13 space-y-4 text-center">
        <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold">
          Stylish T-Shirt
        </h2>
        <Button className="px-5  border border-white bg-transparent rounded lg:text-lg md:text-lg hover:bg-white/13 cursor-pointer">
          Shop Now
        </Button>
        </div>
      </div>
    </div> */
}
