import { Tabs } from "@/components/ui/tabs";
import CategoryOne from "./CategoryOne";

const PopularProducts = () => {
  return (
    <div className="mt-16">
      <Tabs defaultValue="category1" className="">
       <div className="flex flex-col lg:flex-row md:flex-row lg:items-center gap-2 lg:justify-between md:items-center  md:justify-between mb-2">
        <h1 className="text-3xl font-semibold mb-3">Popular Products</h1>
         {/* <TabsList className="bg-white   [scrollbar-width:none] overflow-x-scroll w-full">
          <TabsTrigger value="category1" className="cursor-pointer ">Category 1</TabsTrigger>
          <TabsTrigger value="category2" className="cursor-pointer ">Category 2</TabsTrigger>
         
        
        </TabsList> */}
       </div>
       <CategoryOne></CategoryOne>
        {/* <TabsContent value="category1">
        </TabsContent> */}
        {/* <TabsContent value="category2">Change your password here.</TabsContent> */}
      </Tabs>
    </div>
  );
};

export default PopularProducts;
