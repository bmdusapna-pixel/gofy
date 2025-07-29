import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Faq from "./Pages/Faq";
import Contact from "./Pages/Contact";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import { ArrowUp } from "lucide-react";
import { CartContext } from "./Context/CartContext";
import About from "./Pages/About";
import TermsAndConditions from "./Pages/TermsAndConditions";
import CartDetails from "./Pages/CartDetails";
import { ScrollToTop } from "./Components/AnimatedDropdown";
import RefundReturns from "./Pages/RefundReturns";
import BulkOrder from "./Pages/BulkOrder";
import NewArrivals from "./Pages/NewArrivals";
import Checkout from "./Pages/Checkout";
import Blog from "./Pages/Blog";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import WishList from "./Pages/WishList";
import Account from "./Pages/Account";
import BlogDetails from "./Pages/BlogDetails";
import Toys from "./Pages/Toys";
import Clothes from "./Pages/Clothes";
import ToysDetails from "./Pages/ToysDetails";
import ClothesDetails from "./Pages/ClothesDetails";
import SpecificToyProducts from "./Pages/SpecificToyProducts";
import SpecificClotheProducts from "./Pages/SpecificClotheProducts";

const product = {
  name: "Outdoor Swing Set",
  price: 1199,
  rating: 4.0,
  review: 54,
  product_type: "Outdoor Toy",
  images: [
    "https://www.radiustheme.com/demo/wordpress/themes/toyup/wp-content/uploads/2024/01/product_17.png",
    "https://www.radiustheme.com/demo/wordpress/themes/toyup/wp-content/uploads/2023/12/product_02-300x300.png",
    "https://www.radiustheme.com/demo/wordpress/themes/toyup/wp-content/uploads/2023/12/product_10-300x300.png",
    "https://www.radiustheme.com/demo/wordpress/themes/toyup/wp-content/uploads/2024/01/product_20-300x300.png",
    "https://www.radiustheme.com/demo/wordpress/themes/toyup/wp-content/uploads/2023/12/product_07-300x300.png",
  ],
};

const App = () => {
  const [isShowTopButton, setIsShowTopButton] = useState(false);
  const [flashCardOpen, setFlashCardOpen] = useState(false);
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    cartItems,
    openCart,
    setOpenCart,
    totalItems,
  } = useContext(CartContext);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsShowTopButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (openCart || isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openCart, isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setOpenCart(false);
      }
    };
    if (openCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCart]);

  return (
    <div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-10"></div>
      )}
      {openCart && <div className="fixed inset-0 bg-black/20 z-40"></div>}
      <Header />
      <div ref={cartRef}>
        <Cart />
      </div>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/products/:category?/:slug?" element={<Products />} />
          <Route path="/product-details/:url" element={<ProductDetails />} />
          <Route path="/products/toys" element={<Toys />} />
          <Route
            path="/products/toys/item/:url"
            element={<SpecificToyProducts />}
          />
          <Route path="/products/toys/:url" element={<ToysDetails />} />
          <Route path="/products/clothes" element={<Clothes />} />
          <Route
            path="/products/clothes/item/:url"
            element={<SpecificClotheProducts />}
          />
          <Route path="/products/clothes/:url" element={<ClothesDetails />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-returns" element={<RefundReturns />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/account" element={<Account />} />
          <Route path="/blog-details" element={<BlogDetails />} />
        </Routes>
      </div>
      <div
        className="w-72 transition-transform duration-500 ease-in-out rounded-md h-32 fixed left-10 z-40 bottom-5 bg-white"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          transform: flashCardOpen
            ? "translateX(0)"
            : "translateX(calc(-100% - 2.5rem))",
        }}
      >
        <div className="flex w-full items-center">
          <div className="w-44 h-32 flex items-center justify-center">
            <img
              src={product.images[0]}
              className="w-full"
              alt={product.name}
            />
          </div>
          <div className="py-4 flex flex-col gap-2 w-full items-center">
            <Link
              to="/product-details"
              className="text-[16px] leading-[20px] text-[#001430] font-semibold transition-colors duration-300 hover:text-[#00bbae]"
            >
              {product.name}
            </Link>
            <p className="text-[16px] leading-[20px] text-[#001430] font-semibold">
              {product.price}
            </p>
          </div>
        </div>
      </div>
      {isShowTopButton && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-5 z-50 right-5 w-10 h-10 rounded-full bg-[#f88e0f] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
