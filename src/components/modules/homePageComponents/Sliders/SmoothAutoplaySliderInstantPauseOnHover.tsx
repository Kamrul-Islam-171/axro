"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SmoothAutoplaySliderInstantPauseOnHover.css";

const SmoothAutoplaySliderInstantPauseOnHover = () => {
   
  return (
    <div>
      <Swiper
        className="mt-20"
        speed={6000}
        loop={true}
        freeMode={true}
        slidesPerView={5}
        spaceBetween={30}
        allowTouchMove={false}
        autoplay={{
          delay: 1000,
          // disableOnInteraction: false,
        }}
       
        // breakpoints={{
        //   "@0.00": {
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        //   },
        //   "@0.75": {
        //     slidesPerView: 2,
        //     spaceBetween: 20,
        //   },
        //   "@1.00": {
        //     slidesPerView: 3,
        //     spaceBetween: 40,
        //   },
        //   "@1.50": {
        //     slidesPerView: 5,
        //     spaceBetween: 50,
        //   },
        // }}
        modules={[Autoplay]}
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
    </div>
  );
};

export default SmoothAutoplaySliderInstantPauseOnHover;


