"use client";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import "./NavBar.css";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/", isDropDown: false },
  { name: "All Products", href: "/", isDropDown: false },
  // {
  //   name: "Fashion",
  //   href: "/fashion",
  //   isDropDown: true,
  //   children: [
  //     { cname: "Fashion1", href: "#" },
  //     { cname: "Fashion2", href: "#" },
  //     { cname: "Fashion3", href: "#" },
  //   ],
  // },
  // {
  //   name: "T-Shirts",
  //   href: "/tshirts",
  //   isDropDown: true,
  //   children: [
  //     { cname: "T-Shirts1", href: "#" },
  //     { cname: "T-Shirts2", href: "#" },
  //     { cname: "T-Shirts3", href: "#" },
  //   ],
  // },
  { name: "About Us", href: "/", isDropDown: false },
];

const NavBar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileChild, setIsMobileChild] = useState<number | null>(null);
  return (
    <div className="bg-white text-lg sticky-nav z-10">
      {/* upper part */}
      <div className=" border-b">
        <div className="flex justify-between items-center  py-3 max-w-7xl mx-auto px-4">
          <div className="flex  items-center justify-between  gap-20">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-gold)] shadow-for-text">
                AXRO
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-5 ">
              {navLinks.map((navItem, idx: number) => (
                <div key={idx} className="">
                  <div className=" py-2   link-animation hover:text-[var(--color-gold)] ">
                    <Link
                      className="px-4  font-medium"
                      href={navItem.href}
                    >
                      {navItem.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* <button className="button-animation">Hello</button> */}

            {/* <div className="hidden md:flex items-center  border ">
              <div className="">
                <Select>
                  <SelectTrigger className="w-[160px] cursor-pointer border-none outline-none ring-0 focus:outline-none focus:ring-0">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="tshirt">
                      T-Shirt
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="bags">
                      Bags
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="shooes">
                      Shooes
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <input
                className="outline-0 px-3 border-l-2"
                type="text"
                placeholder="Search for items..."
              />
              <Button className="cursor-pointer">
                <Search className="w-5 h-5 text-white" />
              </Button>
            </div> */}
          </div>
          <div>
            <div className="flex gap-5">
              {/* <Button>Wishlist</Button> */}
              <div>
                <div className=" relative h-full w-10  text-gray-700 flex items-center justify-center cursor-pointer">
                  <Heart className="md:w-7 md:h-7 " />
                  <div className=" text-[13px] w-6 h-6 absolute -top-2 -right-1 bg-[var(--color-gold)] text-white flex items-center justify-center rounded-full ">
                    10
                  </div>
                </div>
              </div>
              <div>
                <button className=" relative h-full w-10 text-gray-700 flex items-center justify-center cursor-pointer">
                  <ShoppingCart className="md:w-7 md:h-7" />
                  <div className=" text-[13px] w-6 h-6 absolute -top-2 -right-1 bg-[var(--color-gold)] text-white flex items-center justify-center rounded-full ">
                    10
                  </div>
                </button>
              </div>

              {/* hamberge menu for mobile */}
              <button
                className="md:hidden relative w-6 h-6"
                onClick={(prev) => {
                  const newIsOpen = !prev;
                  setIsMobileOpen(!isMobileOpen);
                  setIsMobileChild(newIsOpen ? isMobileChild : null);
                }}
              >
                {/* {isMobileOpen ? <X size={24}  /> : <Menu  size={24} />} */}
                <X
                  size={24}
                  className={`transition-all absolute top-0 left-0 duration-800 ease-in-out ${
                    isMobileOpen
                      ? "opacity-100 rotate-0"
                      : "opacity-0 rotate-45"
                  }`}
                />
                <Menu
                  className={`transition-all absolute top-0 left-0 duration-800 ease-in-out ${
                    isMobileOpen
                      ? "opacity-0 rotate-45"
                      : "opacity-100 rotate-0"
                  }`}
                  size={24}
                />
              </button>

              <Button className="cursor-pointer hidden">Login</Button>
            </div>
          </div>
        </div>
      </div>

      {/* lower part. nav menu */}
      {/* invisible group-hover:visible */}
    

      {/* <div className="bg-[var(--main-color)]">
        hellofdf
      </div> */}

      {/* // past it here */}

      <div
        className={`md:hidden  z-50 absolute top-14 left-0 right-0 bg-background border-t shadow-lg overflow-hidden transition-all duration-800 ease-in-out  ${
          isMobileOpen ? "max-h-[1000px]  " : "max-h-0  "
        }`}
      >
        <div className="flex flex-col gap-5 px-4 py-6">
          {navLinks.map((navItem, idx: number) => (
            <div key={idx}>
              {navItem.isDropDown ? (
                <div>
                  <div
                    className="flex items-center gap-2"
                    onClick={() =>
                      setIsMobileChild(isMobileChild === idx ? null : idx)
                    }
                  >
                    <div>{navItem.name}</div>
                    <ChevronDown className="w-4 h-4 mt-1 text-gray-500" />
                  </div>

                  {/* ✅ Animated Dropdown inside the menu */}
                  <div
                    className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                      isMobileChild === idx ? "max-h-60" : "max-h-0 "
                    }`}
                  >
                    {/* <div className="flex flex-col px-4 gap-1 py-2">
                      {navItem?.children?.map((cItem, cIdx) => (
                        <Link className="" href={cItem.href} key={cIdx}>
                          {cItem.cname}
                        </Link>
                      ))}
                    </div> */}
                  </div>
                </div>
              ) : (
                <Link href={navItem.href}>{navItem.name}</Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* // here */}

      <div>{/* <input placeholder="hell"></input> */}</div>
    </div>
  );
};

export default NavBar;
