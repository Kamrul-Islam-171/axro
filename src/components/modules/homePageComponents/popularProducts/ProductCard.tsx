import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const ProductCard = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="hover-animation relative cursor-pointer">
      <div className="border ">
        <div className="h-[200px]">
          <Image
            src={imageSrc}
            alt="image-1"
            width={1000}
            height={200}
            className="w-full object-cover h-full"
          ></Image>
        </div>
        <div className="p-4 space-y-1">
          <Link href="/details" className="text-xl hover:text-[var(--color-gold)] font-medium">Drop Shoulder Print </Link>
          <div>
            {/* <p>Category</p> */}
            {/* <p>Rating</p> */}
          </div>
          <div className="">
            <p>Tk 490.00 BDT</p>
          </div>
        </div>
      </div>
     <div className="add-to-cart-button w-full flex items-center">
         <button className="button-animation toggle-add-to-cart  w-full">Add to Cart <span className="add-to-cart-animation flex items-center justify-center"><ShoppingCart></ShoppingCart></span></button>
         
     </div>
    </div>
  );
};

export default ProductCard;
