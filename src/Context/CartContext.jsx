import api from "../api/axios.js";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // UI States
  const [openCart, setOpenCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [itemDescriptions, setItemDescriptions] = useState([]);
  const [isQuickBuyClicked, setIsQuickBuyClicked] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(true);
  const [isBulkOrderModalOpen, setIsBulkOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cart & Wishlist States
  const [cartItems, setCartItems] = useState([]);
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [savedForLaterItems, setSavedForLaterItems] = useState(() => {
    const stored = localStorage.getItem("savedForLaterItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Derived values (no need to store separately)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total selling price (after product-level discount, before coupon)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  console.log(cartItems)
  console.log("totalPrice",totalPrice)

  // Total MRP (original price) – fall back to price if cutPrice is missing
  const totalMrp = cartItems.reduce(
    (sum, item) =>
      sum + ((item.cutPrice != null || item.cutPrice !== 0 ? item.cutPrice : item.price || 0) * item.quantity),
    0
  );
  console.log("totalMrp",totalMrp)

  // Discount coming from product pricing (MRP - selling price)
  const totalProductDiscount = Math.max(totalMrp - totalPrice, 0);

  // Total coupon discount coming from backend per cart line (if provided)
  const totalCouponDiscount = cartItems.reduce(
    (sum, item) => sum + (item.coupanDiscont || 0) * (item.quantity || 1),
    0
  );

  // Coupon States
  const [applicableCoupons, setApplicableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const stored = localStorage.getItem("appliedCoupon");
    return stored ? JSON.parse(stored) : null;
  });
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Calculate coupon discount from applied coupon
  useEffect(() => {
    if (appliedCoupon && totalPrice > 0) {
      let discount = 0;
      if (appliedCoupon.discountType === "PERCENTAGE") {
        discount = (appliedCoupon.discountValue / 100) * totalPrice;
        if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
          discount = appliedCoupon.maxDiscount;
        }
      } else if (appliedCoupon.discountType === "FLAT") {
        discount = appliedCoupon.discountValue;
      }
      // Don't exceed total price
      discount = Math.min(discount, totalPrice);
      setCouponDiscount(discount);
    } else {
      setCouponDiscount(0);
    }
  }, [appliedCoupon, totalPrice]);

  // Final payable amount after all discounts (including applied coupon)
  const payableAmount = Math.max(totalPrice - totalCouponDiscount - couponDiscount, 0);
  const totalFavouriteItems = favouriteItems.length;

  // Fetch cart from server
  const fetchCart = async () => {
    if (!user?._id) {
      // Load from localStorage for guest users
      const stored = localStorage.getItem("cartItems");
      setCartItems(stored ? JSON.parse(stored) : []);
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get("/user/cart/user");
      const serverCart = response.data.map((item) => ({
        _id: item.productId,
        name: item.productName,
        price: item.price,
        cutPrice: item.cutPrice,
        discount: item.discount,
        product_type: item.brand || "",
        image: item.productImage,
        colorId: item.color,
        ageGroupId: item.ageGroupId,
        ageGroup: item.ageGroup,
        quantity: item.quantity,
        stock: item.stock,
        tax: item.tax,
        coupanDiscont:item.coupanDiscount
      }));
      console.log("cart",serverCart)
      setCartItems(serverCart);
      localStorage.setItem("cartItems", JSON.stringify(serverCart));
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      // Fallback to localStorage
      const stored = localStorage.getItem("cartItems");
      setCartItems(stored ? JSON.parse(stored) : []);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch wishlist from server
  const fetchWishlist = async () => {
    if (!user?._id) {
      const stored = localStorage.getItem("favouriteItems");
      setFavouriteItems(stored ? JSON.parse(stored) : []);
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get("/user/wishlist/user");
      const serverWishlist = response.data.map((item) => ({
        _id: item.productId,
        name: item.productName,
        price: item.price,
        cutPrice: item.cutPrice,
        discount: item.discount,
        product_type: item.brand || "",
        images: [item.productImage],
        colorId: item.color,
        ageGroupId: item.ageGroup,
        stock: item.stock,
        tax: item.tax,
      }));
      setFavouriteItems(serverWishlist);
      localStorage.setItem("favouriteItems", JSON.stringify(serverWishlist));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      const stored = localStorage.getItem("favouriteItems");
      setFavouriteItems(stored ? JSON.parse(stored) : []);
    } finally {
      setIsLoading(false);
    }
  };

  // Sync cart and wishlist on user login/change
  useEffect(() => {
    if (user?._id) {
      fetchCart();
      fetchWishlist();
    } else {
      // Guest mode: load from localStorage
      const storedCart = localStorage.getItem("cartItems");
      const storedWishlist = localStorage.getItem("favouriteItems");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
      setFavouriteItems(storedWishlist ? JSON.parse(storedWishlist) : []);
    }
  }, [user?._id]);

  // Save to localStorage whenever cart/wishlist changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
  }, [favouriteItems]);

  useEffect(() => {
    localStorage.setItem("savedForLaterItems", JSON.stringify(savedForLaterItems));
  }, [savedForLaterItems]);

  useEffect(() => {
    localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  // Fetch applicable coupons based on total price
  const fetchApplicableCoupons = async () => {
    if (totalPrice <= 0) {
      setApplicableCoupons([]);
      return;
    }

    try {
      const response = await api.post("/user/coupons/applicable", {
        totalPrice: totalPrice,
      });
      if (response.data.success) {
        setApplicableCoupons(response.data.applicableCoupons || []);
      }
    } catch (error) {
      console.error("Failed to fetch applicable coupons:", error);
      setApplicableCoupons([]);
    }
  };

  // Apply coupon
  const applyCoupon = (coupon) => {
    // Validate minimum order value
    if (totalPrice < coupon.minOrderValue) {
      alert(`Minimum order value of ₹${coupon.minOrderValue} required for this coupon`);
      return;
    }
    setAppliedCoupon(coupon);
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  // Fetch applicable coupons when totalPrice changes
  useEffect(() => {
    if (totalPrice > 0) {
      fetchApplicableCoupons();
    }
  }, [totalPrice]);

  const handleBulkOrderAlert = () => {
    setIsBulkOrderModalOpen(true);
  };

  // API sync functions
  const syncAddToCart = async (productId, colorId, ageGroupId, quantityDelta) => {
    if (!user?._id) return;
    try {
      await api.post("/user/cart/add", {
        productId,
        colorId,
        ageGroupId,
        quantity: quantityDelta, // This is the delta (+1, -1, etc.)
      });
    } catch (err) {
      console.error("Cart add API failed:", err);
      throw err;
    }
  };

  const syncRemoveFromCart = async (productId = null, colorId = null, ageGroupId = null) => {
    if (!user?._id) return;
    try {
      if (productId) {
        // Remove specific item
        await api.delete("/user/cart/remove", {
          data: { productId, colorId, ageGroupId },
        });
      } else {
        // Empty entire cart - send empty body
        await api.delete("/user/cart/remove", {
          data: {},
        });
      }
    } catch (err) {
      console.error("Cart remove API failed:", err);
      throw err;
    }
  };

  const syncAddToWishlist = async (productId, colorId = null, ageGroupId = null) => {
    if (!user?._id) return;
    try {
      const body = { productId };
      if (colorId) body.colorId = colorId;
      if (ageGroupId) body.ageGroupId = ageGroupId;
      await api.post("/user/wishlist/add", body);
    } catch (err) {
      console.error("Wishlist add API failed:", err);
      throw err;
    }
  };

  const syncRemoveFromWishlist = async (productId, colorId = null, ageGroupId = null) => {
    if (!user?._id) return;
    try {
      const body = { productId };
      if (colorId) body.colorId = colorId;
      if (ageGroupId) body.ageGroupId = ageGroupId;
      await api.delete("/user/wishlist/remove", { data: body });
    } catch (err) {
      console.error("Wishlist remove API failed:", err);
      throw err;
    }
  };

  // Cart operations
  const addToCart = async (product) => {
    try {
      const existingItemIndex = cartItems.findIndex(
        (item) =>
          item._id === product._id &&
          item.colorId === product.colorId &&
          item.ageGroupId === product.ageGroupId
      );
      if (existingItemIndex !== -1) {
        const existingItem = cartItems[existingItemIndex];
        const availableStock = existingItem.stock ?? 0;
        
        // Check stock limit before increasing
        if (existingItem.quantity >= availableStock) {
          // Stock limit reached, don't add more
          return;
        }

        const newQuantity = existingItem.quantity + 1;

        if (newQuantity > 5) handleBulkOrderAlert();

        const updatedCart = cartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: newQuantity } : item
        );

        setCartItems(updatedCart);
        // Send +1 as delta
        await syncAddToCart(product._id, product.colorId, product.ageGroupId, 1);
      } else {
        // Check stock before adding new item
        const availableStock = product.stock ?? 0;
        if (availableStock <= 0) {
          // No stock available
          return;
        }

        const newCartItem = {
          _id: product._id,
          name: product.name,
          price: product.price,
          cutPrice: product.cutPrice,
          discount: product.discount,
          product_type: product.product_type,
          image: product.images[0],
          colorId: product.colorId,
          ageGroupId: product.ageGroupId,
          quantity: 1,
          stock: product.stock,
        };

        setCartItems([...cartItems, newCartItem]);
        // Send 1 as initial quantity
        await syncAddToCart(product._id, product.colorId, product.ageGroupId, 1);
      }

      setOpenCart(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Rollback on error
      await fetchCart();
    }
  };

  const addingProductToCart = async (product, quantity) => {
    try {
      if (quantity > 5) handleBulkOrderAlert();

      const existingItemIndex = cartItems.findIndex(
        (item) =>
          item._id === product._id &&
          item.colorId === product.colorId &&
          item.ageGroupId === product.ageGroupId
      );

      if (existingItemIndex !== -1) {
        const existingItem = cartItems[existingItemIndex];
        const availableStock = existingItem.stock ?? 0;
        
        // Ensure quantity doesn't exceed stock
        const finalQuantity = Math.min(quantity, availableStock);
        
        if (finalQuantity <= existingItem.quantity) {
          // Can't increase beyond stock, or trying to decrease
          return;
        }

        const quantityDelta = finalQuantity - existingItem.quantity;

        const updatedCart = cartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: finalQuantity } : item
        );
        setCartItems(updatedCart);
        
        // Send the delta, not absolute quantity
        await syncAddToCart(product._id, product.colorId, product.ageGroupId, quantityDelta);
      } else {
        // Check stock before adding new item
        const availableStock = product.stock ?? 0;
        if (availableStock <= 0) {
          // No stock available
          return;
        }

        // Ensure quantity doesn't exceed stock
        const finalQuantity = Math.min(quantity, availableStock);

        const newCartItem = {
          _id: product._id,
          name: product.name,
          price: product.price,
          cutPrice: product.cutPrice,
          discount: product.discount,
          product_type: product.product_type,
          image: product.images[0],
          colorId: product.colorId,
          ageGroupId: product.ageGroupId,
          quantity: finalQuantity,
          stock: product.stock,
        };
        setCartItems([...cartItems, newCartItem]);
        
        // Send initial quantity
        await syncAddToCart(product._id, product.colorId, product.ageGroupId, finalQuantity);
      }

      setOpenCart(true);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      await fetchCart();
    }
  };

  const removeProductFromCart = async (product) => {
    try {
      const updatedCart = cartItems.filter(
        (item) =>
          !(
            item._id === product._id &&
            item.colorId === product.colorId &&
            item.ageGroupId === product.ageGroupId
          )
      );

      setCartItems(updatedCart);
      await syncRemoveFromCart(product._id, product.colorId, product.ageGroupId);

      if (updatedCart.length === 0) setOpenCart(false);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      // Rollback on error
      await fetchCart();
    }
  };

  const increaseQuantityFromCart = async (product) => {
    try {
      // Find the item to check stock
      const existingItem = cartItems.find(
        (item) =>
          item._id === product._id &&
          item.colorId === product.colorId &&
          item.ageGroupId === product.ageGroupId
      );

      if (!existingItem) return;

      // Check stock limit
      const availableStock = existingItem.stock ?? 0;
      if (existingItem.quantity >= availableStock) {
        // Stock limit reached, don't increase
        return;
      }

      const updatedCart = cartItems.map((item) => {
        if (
          item._id === product._id &&
          item.colorId === product.colorId &&
          item.ageGroupId === product.ageGroupId
        ) {
          const newQuantity = item.quantity + 1;
          if (newQuantity > 5) handleBulkOrderAlert();
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setCartItems(updatedCart);

      // Send +1 as delta to increase quantity
      await syncAddToCart(product._id, product.colorId, product.ageGroupId, 1);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      await fetchCart();
    }
  };

  const decreaseQuantityFromCart = async (product) => {
    try {
      const existingItem = cartItems.find(
        (item) =>
          item._id === product._id &&
          item.colorId === product.colorId &&
          item.ageGroupId === product.ageGroupId
      );

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        // Remove item completely
        await removeProductFromCart(product);
      } else {
        const updatedCart = cartItems.map((item) => {
          if (
            item._id === product._id &&
            item.colorId === product.colorId &&
            item.ageGroupId === product.ageGroupId
          ) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });

        setCartItems(updatedCart);

        // Send -1 as delta to decrease quantity
        await syncAddToCart(product._id, product.colorId, product.ageGroupId, -1);
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      await fetchCart();
    }
  };

  const emptyCart = async () => {
    try {
      // Call remove without productId to clear all items
      await syncRemoveFromCart();
      setCartItems([]);
      setOpenCart(false);
    } catch (error) {
      console.error("Failed to empty cart:", error);
      await fetchCart();
    }
  };

  // Wishlist operations
  const addFavouriteItems = async (product) => {
    try {
      const alreadyExists = favouriteItems.some(
        (item) =>
          item._id === product._id &&
          item.colorId === product.colorId &&
          item.ageGroupId === product.ageGroupId
      );

      if (alreadyExists) return;

      const newFavourite = {
        _id: product._id,
        name: product.name,
        price: product.price,
        cutPrice: product.cutPrice,
        discount: product.discount,
        product_type: product.product_type,
        images: product.images,
        colorId: product.colorId || null,
        ageGroupId: product.ageGroupId || null,
        stock: product.stock,
      };

      setFavouriteItems([...favouriteItems, newFavourite]);
      await syncAddToWishlist(product._id, product.colorId, product.ageGroupId);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      await fetchWishlist();
    }
  };

  const removeFavouriteItemsWishList = async (product) => {
    try {
      const updatedFavourites = favouriteItems.filter(
        (item) =>
          !(
            item._id === product._id &&
            item.colorId === product.colorId &&
            item.ageGroupId === product.ageGroupId
          )
      );

      setFavouriteItems(updatedFavourites);
      await syncRemoveFromWishlist(product._id, product.colorId, product.ageGroupId);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      await fetchWishlist();
    }
  };

  // Save for later operations - saves to wishlist if authenticated, otherwise to local storage
  const saveForLater = async (product) => {
    // Check if already saved locally
    const alreadySaved = savedForLaterItems.some(
      (item) =>
        item._id === product._id &&
        item.colorId === product.colorId &&
        item.ageGroupId === product.ageGroupId
    );

    if (alreadySaved) return;

    // If user is authenticated, save to wishlist API
    if (user?._id) {
      try {
        const wishProduct = {
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images || [product.image],
          colorId: product.colorId,
          ageGroupId: product.ageGroupId,
        };
        await addFavouriteItems(wishProduct);
        return; // Don't save to local storage if saved to API
      } catch (error) {
        console.error("Failed to save to wishlist:", error);
        // Fall through to save locally if API fails
      }
    }

    // Save to local storage for guest users or if API fails
    setSavedForLaterItems((prev) => [
      ...prev,
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.image || (product.images && product.images[0]) || "",
        colorId: product.colorId,
        ageGroupId: product.ageGroupId,
        quantity: product.quantity || 1,
      },
    ]);
  };

  const moveToCartFromSaved = (product) => {
    setSavedForLaterItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === product._id &&
            item.colorId === product.colorId &&
            item.ageGroupId === product.ageGroupId
          )
      )
    );

    const productWithImages = {
      ...product,
      images: [product.image],
    };
    addingProductToCart(productWithImages, product.quantity);
  };

  const removeSavedForLaterItem = (product) => {
    setSavedForLaterItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === product._id &&
            item.colorId === product.colorId &&
            item.ageGroupId === product.ageGroupId
          )
      )
    );
  };

  const contextValues = {
    // UI States
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    itemDescriptions,
    setItemDescriptions,
    isQuickBuyClicked,
    setIsQuickBuyClicked,
    formSubmit,
    setFormSubmit,
    isForgotPasswordOpen,
    setIsForgotPasswordOpen,
    isBulkOrderModalOpen,
    setIsBulkOrderModalOpen,
    isLoading,

    // Cart
    cartItems,
    setCartItems,
    totalItems,
    totalPrice,
    totalMrp,
    totalProductDiscount,
    totalCouponDiscount,
    payableAmount,
    openCart,
    setOpenCart,
    addToCart,
    addingProductToCart,
    removeProductFromCart,
    increaseQuantityFromCart,
    decreaseQuantityFromCart,
    emptyCart,
    fetchCart,

    // Wishlist
    favouriteItems,
    totalFavouriteItems,
    addFavouriteItems,
    removeFavouriteItemsWishList,
    fetchWishlist,

    // Save for Later
    savedForLaterItems,
    saveForLater,
    moveToCartFromSaved,
    removeSavedForLaterItem,

    // Coupons
    applicableCoupons,
    appliedCoupon,
    couponDiscount,
    fetchApplicableCoupons,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export { CartContext, CartContextProvider };