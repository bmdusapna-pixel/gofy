import React, { Suspense, lazy, useContext, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CartContext } from "./Context/CartContext";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import BulkOrderModal from "./Components/BulkOrderModal";
import {ScrollToTop} from "./Components/AnimatedDropdown";
import PageLoader from "./Components/PageLoader";
import FloatingProductCard from "./Components/FloatingProductCard";
import WhatsAppButton from "./Components/WhatsAppButton";
import BackToTopButton from "./Components/BackToTopButton";
import { ToastContainer } from "react-toastify";

// 🔹 Lazy loaded pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Products = lazy(() => import("./Pages/Products"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const SuperDealsProduct = lazy(() => import("./Pages/SuperDealsProduct"));
const Trending = lazy(() => import("./Pages/Trending"));
const Offers = lazy(() => import("./Pages/Offers"));
const Faq = lazy(() => import("./Pages/Faq"));
const Contact = lazy(() => import("./Pages/Contact"));
const ShippingAndDelivery = lazy(() => import("./Pages/ShippingAndDelivery"));
const CartDetails = lazy(() => import("./Pages/CartDetails"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const RefundReturns = lazy(() => import("./Pages/RefundReturns"));
const BulkOrder = lazy(() => import("./Pages/BulkOrder"));
const NewArrivals = lazy(() => import("./Pages/NewArrivals"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Payment = lazy(() => import("./Pages/Payment"));
const OrderConfirmation = lazy(() => import("./Pages/OrderConfirmation"));
const Blog = lazy(() => import("./Pages/Blog"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const WishList = lazy(() => import("./Pages/WishList"));
const Account = lazy(() => import("./Pages/Account"));
const BlogDetails = lazy(() => import("./Pages/BlogDetails"));
const TermsAndConditions = lazy(() => import("./Pages/TermsAndConditions"));
const SpecificToyProducts = lazy(() => import("./Pages/SpecificToyProducts"));
const SpecificClotheProducts = lazy(() => import("./Pages/SpecificClotheProducts"));

const App = () => {
  const {
    openCart,
    setOpenCart,
    isMobileMenuOpen,
    isBulkOrderModalOpen,
    setIsBulkOrderModalOpen,
  } = useContext(CartContext);

  const cartRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Lock body scroll only when needed
  useEffect(() => {
    document.body.classList.toggle(
      "overflow-hidden",
      openCart || isMobileMenuOpen || isBulkOrderModalOpen
    );
  }, [openCart, isMobileMenuOpen, isBulkOrderModalOpen]);

  // // 🔹 Close cart on outside click
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (cartRef.current && !cartRef.current.contains(e.target)) {
  //       setOpenCart(false);
  //     }
  //   };

  //   if (openCart) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [openCart, setOpenCart]);

  const handleBulkOrderConfirm = () => {
    setIsBulkOrderModalOpen(false);
    navigate("/bulk-order");
  };

  return (
    <>
    <ToastContainer/>
      <Header />

      <div ref={cartRef}>
        <Cart />
      </div>

      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/products/:slug?/:category?" element={<Products />} />
          <Route path="/super-deals-product" element={<SuperDealsProduct />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/offer" element={<Offers />} />
          <Route path="/product-details/:url" element={<ProductDetails />} />
          <Route
            path="/products/toys/item/:url"
            element={<SpecificToyProducts />}
          />
          <Route
            path="/products/clothes/item/:url"
            element={<SpecificClotheProducts />}
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/shipping-and-delivery"
            element={<ShippingAndDelivery />}
          />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-returns" element={<RefundReturns />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/account" element={<Account />} />
          <Route path="/blog-details" element={<BlogDetails />} />
        </Routes>
      </Suspense>

      <BulkOrderModal
        isOpen={isBulkOrderModalOpen}
        onClose={() => setIsBulkOrderModalOpen(false)}
        onConfirm={handleBulkOrderConfirm}
      />
     {/* ✅ FLOATING FEATURES */}
     {/* <FloatingProductCard open /> */}
      {/* <WhatsAppButton /> */}
      <BackToTopButton />
      <Footer />
    </>
  );
};

export default App;

