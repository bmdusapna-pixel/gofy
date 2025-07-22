import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const WishList = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, cartItems, openCart, setOpenCart, totalItems, formSubmit, favouriteItems, addToCart } = useContext(CartContext);

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full lg:px-12 px-5 mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[650px] w-full flex flex-col gap-2">
              <div className="flex gap-5 items-center w-full h-full justify-between bg-[#fce7ef] rounded-xl px-10 py-2">
                <p className="sm:text-[20px] text-[18px] leading-[27px] sm:leading-[30px] text-[#001430] font-bold text-center">Thumbnail</p>
                <p className="sm:text-[20px] text-[18px] leading-[27px] sm:leading-[30px] text-[#001430] font-bold text-center">Product</p>
                <p className="sm:text-[20px] text-[18px] leading-[27px] sm:leading-[30px] text-[#001430] font-bold text-center">Price</p>
                <p className="sm:text-[20px] text-[18px] leading-[27px] sm:leading-[30px] text-[#001430] font-bold text-center">Add To Cart</p>
                <div className="w-10 h-10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-black" />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {
                  favouriteItems.length > 0 && favouriteItems.map((item) => (
                    <div key={item._id} className="flex gap-5 items-center w-full h-full justify-between bg-white rounded-xl px-10 py-1">
                      <div className="flex items-center justify-center w-20">
                        <img src={item.images[0]} alt={item.name} className="object-cover w-full rounded-md" />
                      </div>
                      <p className="text-[16px] leading-[24px] sm:text-[18px] sm:leading-[27px] text-[#001430] font-semibold text-center">{item.name}</p>
                      <p className="text-[16px] leading-[24px] text-[#001430] font-semibold text-center">₹ {item.price}</p>
                      <button onClick={()=>addToCart(item)} type="submit" className="rounded-xl text-[16px] leading-[24px] sm:text-[18px] sm:leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 h-12 bg-[#00bbae] flex gap-3 items-center justify-center">Add to Cart</button>
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-[#00bbae]" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          {
            favouriteItems.length === 0 && (
              <div className="flex items-center justify-center bg-white">
                <p className="text-[16px] font-medium text-black leading-[24px]">No favourites items present</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default WishList;
