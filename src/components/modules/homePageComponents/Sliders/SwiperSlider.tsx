"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import  './swiper.css'
const SwiperSlider = () => {
  
  return (
    <Swiper className="mt-20"
     
       
      speed={3500}
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
     
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      pagination={true}
      navigation={true}
      breakpoints={{
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.50': {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" w-[200px]  relative">
          <div>
            <Image
              className="grayscale rounded-2xl"
              alt="doctor"
              width={200}
              height={500}
              src={
                "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1745512713/jh2pbjihgyduptx2khi3.jpg"
              }
            ></Image>
          </div>
          <div className="rounded-2xl w-[200px] h-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-transparent  to-orange-200 ">
            <Button className="rounded-full absolute bottom-4 font-bold opacity-60 text-lg cursor-pointer hover:opacity-100">
              DOCTOR
            </Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;
