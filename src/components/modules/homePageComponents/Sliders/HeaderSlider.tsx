'use client';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeaderSlider = () => {
  return (
    <div>
      <Carousel
        className="w-full "
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 3000, // 3 seconds
            stopOnInteraction: false,
            
          }),
        ]}
      >
        <CarouselContent className="">
          {Array.from({ length: 15 }).map((_, index) => (
            <CarouselItem key={index} className="">
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6 bg-gray-100 rounded">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeaderSlider;
