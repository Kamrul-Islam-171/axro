import CategoryCard from "./CategoryCard";


const FeaturedCategories = () => {
    return (
        <div className="space-y-5">
            <h1 className="text-xl font-semibold mt-16">Featured Categories</h1>
            <div className="flex overflow-x-auto gap-3 md:gap-5 lg:gap-10  [scrollbar-width:none]">
               <CategoryCard></CategoryCard>
               <CategoryCard></CategoryCard>
               <CategoryCard></CategoryCard>
               <CategoryCard></CategoryCard>
               <CategoryCard></CategoryCard>
              
            </div>
        </div>
    );
};

export default FeaturedCategories;