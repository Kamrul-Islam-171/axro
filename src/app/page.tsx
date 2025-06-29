// import HeaderSlider from "@/components/modules/homePageComponents/HeaderSlider";
// import SmoothAutoplaySliderInstantPauseOnHover from "@/components/modules/homePageComponents/Sliders/SmoothAutoplaySliderInstantPauseOnHover";
// import SwiperSlider from "@/components/modules/homePageComponents/SwiperSlider";

// import FeaturedCategories from "@/components/modules/homePageComponents/featuredCategories/FeaturedCategories";
import Slider from "@/components/modules/homePageComponents/homeBanarSlider/Slider";
import PopularProducts from "@/components/modules/homePageComponents/popularProducts/PopularProducts";



export default function Home() {
  return (
    
    <div className=" max-w-7xl px-4 mx-auto">
      <div className="mt-5">
        {/* <HeaderSlider></HeaderSlider> */}
        {/* <SwiperSlider></SwiperSlider> */}
        {/* <SmoothAutoplaySliderInstantPauseOnHover></SmoothAutoplaySliderInstantPauseOnHover> */}
        <Slider></Slider>
        {/* <FeaturedCategories></FeaturedCategories> */}
        <PopularProducts></PopularProducts>
      </div>
     
    </div>
  );
}
