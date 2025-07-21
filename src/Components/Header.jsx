import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Flame,
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { AnimatedDropdown, DropDownMobileTablet } from "./AnimatedDropdown";
import { CartContext } from "../Context/CartContext";

const products = [
  {
    _id: 1,
    name: "Age 0 to 2",
    toys: [
      { _id: 1, name: "Football" },
      { _id: 2, name: "Cycle" },
      { _id: 3, name: "Doll" },
      { _id: 4, name: "Puzzle" },
      { _id: 5, name: "Building Blocks" },
      { _id: 6, name: "Remote Car" },
      { _id: 7, name: "Action Figure" },
      { _id: 8, name: "Kitchen Set" },
    ],
  },
  {
    _id: 2,
    name: "Age 3 to 5",
    toys: [
      { _id: 1, name: "Football" },
      { _id: 2, name: "Cycle" },
      { _id: 3, name: "Doll" },
      { _id: 4, name: "Puzzle" },
      { _id: 5, name: "Building Blocks" },
      { _id: 6, name: "Remote Car" },
      { _id: 7, name: "Action Figure" },
      { _id: 8, name: "Kitchen Set" },
    ],
  },
  {
    _id: 3,
    name: "Age 6 to 9",
    toys: [
      { _id: 1, name: "Football" },
      { _id: 2, name: "Cycle" },
      { _id: 3, name: "Doll" },
      { _id: 4, name: "Puzzle" },
      { _id: 5, name: "Building Blocks" },
      { _id: 6, name: "Remote Car" },
      { _id: 7, name: "Action Figure" },
      { _id: 8, name: "Kitchen Set" },
    ],
  },
  {
    _id: 4,
    name: "Age 9 to 12",
    toys: [
      { _id: 1, name: "Football" },
      { _id: 2, name: "Cycle" },
      { _id: 3, name: "Doll" },
      { _id: 4, name: "Puzzle" },
      { _id: 5, name: "Building Blocks" },
      { _id: 6, name: "Remote Car" },
      { _id: 7, name: "Action Figure" },
      { _id: 8, name: "Kitchen Set" },
    ],
  },
];


const FirstHeader = () => {
  return (
    <div className="w-full bg-[#dc3545]">
      <div className="w-full lg:px-12 px-5 py-2 lg:py-0 lg:h-12 mx-auto flex lg:flex-row flex-col gap-2 items-center">
        <div className="overflow-hidden w-full cursor-pointer">
          <p className="text-base font-medium text-white marquee">Free shipping worldwide for all orders over ₹599/-{" "}<a href="/" className="underline">Shop Now</a>{" "}Hello, Welcome to Gofy! Enjoy exclusive deals & free delivery across India.</p>
        </div>
        <div className="flex gap-3 items-center w-60">
          <div className="flex gap-1 items-center">
            <MapPin className="w-5 h-5 text-white" />
            <p className="text-base font-medium text-white">Delhi, India</p>
          </div>
          <Link to="/blog" className="text-base font-medium text-white">Blog</Link>
          <Link to="/faq" className="text-base font-medium text-white">FAQ's</Link>
        </div>
      </div>
    </div>
  );
};

const SecondHeader = ({ cartItems, openCart, setOpenCart, totalItems }) => {
  const [openSearchMobile, setOpenSearchMobile] = useState(false);
  const navigate = useNavigate();

  const chechkingOut = () => {
    if (cartItems.length === 0) {
      navigate("/cart");
    } else {
      setOpenCart(true);
    }
  };

  return (
    <div className={`${openSearchMobile ? "h-40" : "h-20"} transition-all duration-300 w-full shadow-sm bg-white`}>
      <div className="w-full lg:px-12 px-5 h-20 mx-auto flex justify-between gap-2 items-center">
        <Link to="/" className="w-32">
          <img src={logo} alt="" className="w-full" />
        </Link>
        <div className="md:flex flex-1 hidden max-w-3xl">
          <div className="w-full flex items-center bg-[#f9f9f9] rounded-md overflow-hidden">
            <div className="flex gap-2 p-3 items-center cursor-pointer hover:bg-gray-100">
              <p className="text-black font-medium text-base whitespace-nowrap">All Categories</p>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex-1">
              <input type="text" placeholder="Search products..." className="w-full px-4 py-3 bg-transparent outline-none text-black font-medium text-base placeholder:text-gray-400"/>
            </div>
            <button className="p-3 hover:bg-gray-200 bg-transparent duration-300 transition-colors cursor-pointer">
              <Search className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
        <div onClick={()=>setOpenSearchMobile((prev) => !prev)} className="md:hidden flex w-10 h-10 items-center justify-center rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 duration-300 transition-colors">
          <Search className="w-5 h-5 text-black" />
        </div>
        <div className="bg-[#00bbae] hidden sm:flex gap-2 items-center rounded-full px-4 py-2 w-[200px]">
          <Phone className="w-5 h-5 text-white" />
          <div className="flex flex-col">
            <p className="text-white font-normal text-sm">24/7 Support</p>
            <p className="text-white font-semibold text-base">+91 234 786 8907</p>
          </div>
        </div>
        <div className="flex gap-4 sm:gap-6 items-center">
          <Link to="/wishList" className="relative cursor-pointer">
            <Heart className="w-6 h-6 text-black" />
            <p className="absolute -top-2 -right-3 text-white bg-pink-600 p-0.5 rounded-full w-5 h-5 text-[12px] font-semibold text-center">0</p>
          </Link>
          <div onClick={chechkingOut} className="relative cursor-pointer">
            <ShoppingBag className="w-6 h-6 text-black" />
            <p className="absolute -top-2 -right-3 text-white bg-pink-600 p-0.5 rounded-full w-5 h-5 text-[12px] font-semibold text-center">{totalItems}</p>
          </div>
          <Link to="/sign-in" className="flex gap-0.5 items-center">
            <User className="sm:w-7 w-6 sm:h-7 h-6 text-black" />
            <div className="flex-col sm:flex hidden">
              <p className="text-gray-600 font-medium text-sm">Sign In</p>
              <p className="text-base font-semibold text-black">Account</p>
            </div>
          </Link>
        </div>
      </div>
      <div className={`md:hidden flex flex-col items-center gap-3 max-w-xl ${openSearchMobile ? "max-h-20 z-50 opacity-100" : "max-h-0 -z-0 opacity-0"} bg-[#f7f7f7] relative top-3 left-1/2 -translate-x-1/2 lg:left-1/3 lg:translate-x-0 p-2`}>
        <input type="text" placeholder="Search products..." className="w-full px-4 py-1 bg-transparent outline-none text-black font-medium text-base placeholder:text-gray-400"/>
      </div>
    </div>
  );
};

const ThirdHeader = ({isMobileMenuOpen, setIsMobileMenuOpen}) => {
  const [itemHovered, setItemHovered] = useState(null);
  const laptopMenuRef = useRef(null);

  const navigatingPageInMobileTablet = (item) => {
    if (itemHovered === item) {
      setItemHovered(null);
    } else {
      setItemHovered(item);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      setItemHovered(null);
    };
    const menuNode = laptopMenuRef.current;
    if (menuNode) {
      menuNode.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (menuNode) {
        menuNode.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="w-full bg-white">
      {/* for laptop */}
        <div className="w-full hidden lg:block lg:px-12 px-0 py-5 mx-auto">  
          <div ref={laptopMenuRef} className="flex items-center justify-between w-full" onMouseLeave={() => setItemHovered(null)}>
            <div className="flex gap-5 items-center relative">
              <Link onMouseEnter={() => setItemHovered(null)} to="/" className="text-[16px] leading-[24px] text-black font-semibold transition-colors duration-300 hover:text-[#00bbae]">Home</Link>
              <Link onMouseEnter={() => setItemHovered(null)} to="/about" className="text-[16px] leading-[24px] text-black font-semibold transition-colors duration-300 hover:text-[#00bbae]">About</Link>
              <div onMouseEnter={() => setItemHovered("shopByAge")} className="flex gap-1 items-center cursor-pointer text-black font-semibold transition-colors duration-300 hover:text-[#00bbae]">
                <p className="text-[16px] leading-[24px] font-semibold">Shop By Age</p>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${itemHovered === "shopByAge" ? "rotate-180" : "rotate-0"}`} />
                {
                  itemHovered === "shopByAge" && (
                    <AnimatedDropdown items={products} />
                  )
                }
              </div>
              <div onMouseEnter={() => setItemHovered("shopByCollection")} className="flex gap-1 items-center cursor-pointer text-black hover:text-[#00bbae] transition-transform duration-300 ">
                <p className="text-[16px] leading-[24px] font-semibold">Shop By Collection</p>
                <p id="items" className="text-[11px] leading-[11px] text-white bg-[#198754] p-1.5 rounded-md font-semibold">SALE</p>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${itemHovered === "shopByCollection" ? "rotate-180" : "rotate-0"}`} />
                {
                  itemHovered === "shopByCollection" && (
                    <AnimatedDropdown items={products} />
                  )
                }
              </div>
              <div onMouseEnter={() => setItemHovered("newArrivals")} className="flex gap-1 items-center cursor-pointer text-black transition-colors duration-300 hover:text-[#00bbae]">
                <p className="text-[16px] leading-[24px] font-semibold">New Arrivals</p>
                <p id="items" className="text-[11px] leading-[11px] text-white bg-pink-600 p-1.5 rounded-md font-semibold">HOT</p>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${itemHovered === "newArrivals" ? "rotate-180" : "rotate-0"}`} />
                {
                  itemHovered === "newArrivals" && (
                    <AnimatedDropdown items={products} />
                  )
                }
              </div>
              <div onMouseEnter={() => setItemHovered("trending")} className="flex gap-1 items-center cursor-pointer text-black transition-colors duration-300 hover:text-[#00bbae]">
                <p className="text-[16px] leading-[24px] font-semibold">Trending</p>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${itemHovered === "trending" ? "rotate-180" : "rotate-0"}`} />
                {
                  itemHovered === "trending" && (
                    <AnimatedDropdown items={products} />
                  )
                }
              </div>
              <div onMouseEnter={() => setItemHovered("offer")} className="flex gap-2 items-center cursor-pointer text-black transition-colors duration-300 hover:text-[#00bbae]">
                <p className="text-[16px] leading-[24px] font-semibold">Offer</p>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${itemHovered === "offer" ? "rotate-180" : "rotate-0"}`} />
                {
                  itemHovered === "offer" && (
                    <AnimatedDropdown items={products} />
                  )
                }
              </div>
            </div>
            <div className="border border-gray-200 rounded-full bg-[#fce7ef] flex gap-0.5 items-center py-2 px-5">
              <Flame className="w-5 h-5 text-[#dc3545]" fill="#dc3545" />
              <p className="text-[16px] leading-[24px] text-[#dc3545] font-semibold">Super Deals Product</p>
            </div>
          </div>
        </div>

        {/* for tablet and mobile */}
        <div className="lg:hidden block w-full px-5 py-2">
          <div className="flex justify-end w-full">
            <div onClick={()=>setIsMobileMenuOpen((prev) => !prev)} className="flex gap-2 items-center p-1 text-[#6c757d] transition-colors duration-300 hover:text-white bg-transparent hover:bg-[#6c757d] cursor-pointer border border-gray-200 rounded-md z-20">
              <Menu className="w-6 h-6" />
              <p className="text-[16px] leading-[24px]">Browse Categories</p>
            </div>
            <div className={`w-full sm:w-96 h-full overflow-y-scroll bg-white fixed top-0 left-0 z-50 shadow-lg flex flex-col py-10 px-6 gap-5 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
              <div className="flex justify-between items-center w-full">
                <div className="w-28">
                  <img src={logo} alt="" className="w-full" />
                </div>
                <X onClick={()=>setIsMobileMenuOpen(false)} className="w-8 h-8 text-black cursor-pointer transition-all duration-300 hover:text-[#dc3545] hover:rotate-90" />
              </div>
              <div className="flex flex-col gap-5 w-full relative">
                <p className="text-[16px] leading-[24px] text-black font-semibold">Home</p>
                <div onClick={() => navigatingPageInMobileTablet("shopByAge")} className="flex flex-col gap-5 cursor-pointer">
                  <div className="flex justify-between w-full items-center">
                    <p className="text-[16px] leading-[24px] text-black font-semibold">Shop By Age</p>
                    <ChevronDown className={`w-5 h-5 text-black transition-colors duration-300 ${itemHovered === "shopByAge" ? "rotate-180" : ""}`} />
                  </div>
                  {
                    itemHovered === "shopByAge" && (
                      <DropDownMobileTablet items={products} />
                    )
                  }
                </div>
                <div onClick={() => navigatingPageInMobileTablet("shopByCollection")} className="flex flex-col gap-5 cursor-pointer">
                  <div className="flex justify-between w-full items-center">
                    <div className="flex gap-2 items-center">
                      <p className="text-[16px] leading-[24px] text-black font-semibold">Shop By Collection</p>
                      <p className="text-[11px] leading-[11px] text-white bg-[#198754] p-1.5 rounded-md font-semibold">SALE</p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {
                    itemHovered === "shopByCollection" && (
                      <DropDownMobileTablet items={products} />
                    )
                  }
                </div>
                <div className="flex justify-between w-full items-center">
                  <div className="flex gap-2 items-center">
                    <p className="text-[16px] leading-[24px] text-black font-semibold">New Arrivals</p>
                    <p className="text-[11px] leading-[11px] text-white bg-[#dc3545] p-1.5 rounded-md font-semibold">HOT</p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-black" />
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-[16px] leading-[24px] text-black font-semibold">Trending</p>
                  <ChevronDown className="w-5 h-5 text-black" />
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-[16px] leading-[24px] text-black font-semibold">Offer</p>
                  <ChevronDown className="w-5 h-5 text-black" />
                </div>
                <div className="border border-gray-200 rounded-full bg-[#fce7ef] flex gap-0.5 items-center py-2 px-5">
                  <Flame className="w-5 h-5 text-[#dc3545]" fill="#dc3545" />
                  <p className="text-[16px] leading-[24px] text-[#dc3545] font-semibold">Super Deals Product</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

const Header = () => {
  const {isMobileMenuOpen, setIsMobileMenuOpen, cartItems, openCart, setOpenCart, totalItems} = useContext(CartContext);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <FirstHeader />
      <div className={`w-full transition-all duration-300 ${isSticky ? "fixed top-0 shadow-md z-40" : ""}`}>
        <SecondHeader cartItems={cartItems} openCart={openCart} setOpenCart={setOpenCart} totalItems={totalItems} />
        <hr />
        <ThirdHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>
    </div>
  );
};

export default Header;
