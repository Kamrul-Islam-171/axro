import Image from "next/image";

const CategoryCard = () => {
  return (
    <div className=" w-[150px] space-y-2 mb-5">
     <div className="w-[150px] h-[150px] rounded-full p-2 shadow-lg">
         <Image
        className="w-full h-full object-cover rounded-full"
        alt="category-1"
        width={150}
        height={150}
        src={
          "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg"
        }
      />
     </div>
      <p className="text-center text-gray-700 font-semibold">Cagetoy1</p>
    </div>
  );
};

export default CategoryCard;
