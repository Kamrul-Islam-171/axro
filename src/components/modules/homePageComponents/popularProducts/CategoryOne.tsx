
import ProductCard from "./ProductCard";
import './popularProduct.css'

const imageScrs = [
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-3_nm1chs.jpg",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704170/tshirt-1_fwy1zy.png",
    },
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg",
    },
  
    {
        imageUrl : "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1748704169/tshirt-2_o2hami.jpg",
    },
  
]

const CategoryOne = async () => {
  
  return (
    <>
      
        <div className="popularProduct">
          {
            imageScrs.map((item, idx) => <ProductCard imageSrc={item.imageUrl} key={idx}></ProductCard>)
          }
          
        </div>
      
      
    </>
  );
};

export default CategoryOne;
