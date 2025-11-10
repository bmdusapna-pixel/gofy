import api from "../api/axios.js";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
const CartContext = createContext();
import { AuthContext } from "./AuthContext";

const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [openCart, setOpenCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [itemDescriptions, setItemDescriptions] = useState([]);
  const [isQuickBuyClicked, setIsQuickBuyClicked] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(true);

  const [isBulkOrderModalOpen, setIsBulkOrderModalOpen] = useState(false);

  const [totalFavouriteItems, setTotalFavouriteItems] = useState(() => {
    const stored = localStorage.getItem("totalFavouriteItems");
    return stored ? Number(JSON.parse(stored)) : 0;
  });

  const [favouriteItems, setFavouriteItems] = useState(() => {
    const stored = localStorage.getItem("favouriteItems");
    return stored ? JSON.parse(stored) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  const [totalItems, setTotalItems] = useState(() => {
    const stored = localStorage.getItem("totalItems");
    return stored ? Number(JSON.parse(stored)) : 0;
  });

  const [totalPrice, setTotalPrice] = useState(() => {
    const stored = localStorage.getItem("totalPrice");
    return stored ? Number(JSON.parse(stored)) : 0;
  });

  const [savedForLaterItems, setSavedForLaterItems] = useState(() => {
    const stored = localStorage.getItem("savedForLaterItems");
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();

  const handleBulkOrderAlert = () => {
    setIsBulkOrderModalOpen(true);
  };

  const syncAddToCart = async (
    productId,
    colorId,
    ageGroupId,
    quantity = 1
  ) => {
    if (!user?._id) return;

    try {
      const body = productId
        ? { userId: user._id, productId, colorId, ageGroupId, quantity }
        : { userId: user._id };
      await api.post("/user/cart/add", body);
    } catch (err) {
      console.error("Cart add API failed:", err);
    }
  };

  const syncRemoveFromCart = async (productId, colorId, ageGroupId) => {
    if (!user?._id) return;

    try {
      await api.delete("/user/cart/remove", {
        data: { productId, colorId, ageGroupId },
      });
    } catch (err) {
      console.error("Cart remove API failed:", err);
    }
  };

  const syncAddToWishlist = async (
    productId,
    colorId = null,
    ageGroupId = null
  ) => {
    if (!user?._id) return;

    try {
      const body = { productId };

      if (colorId) body.colorId = colorId;
      if (ageGroupId) body.ageGroupId = ageGroupId;
      await api.post("/user/wishlist/add", body);
    } catch (err) {
      console.error("Wishlist add API failed:", err);
    }
  };

  const syncRemoveFromWishlist = async (
    productId,
    colorId = null,
    ageGroupId = null
  ) => {
    if (!user?._id) return;

    try {
      const body = { productId };

      if (colorId) body.colorId = colorId;
      if (ageGroupId) body.ageGroupId = ageGroupId;
      await api.delete("/user/wishlist/remove", { data: body });
    } catch (err) {
      console.error("Wishlist remove API failed:", err);
    }
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item._id === product._id &&
        item.colorId === product.colorId &&
        item.ageGroupId === product.ageGroupId
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          if (item.quantity + 1 > 5) handleBulkOrderAlert();
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
      syncAddToCart(product._id, product.colorId, product.ageGroupId, 1);
    } else {
      // Add new variant to cart
      const newCartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.images[0],
        colorId: product.colorId,
        ageGroupId: product.ageGroupId,
        quantity: 1,
      };
      setCartItems([...cartItems, newCartItem]);
      syncAddToCart(product._id, product.colorId, product.ageGroupId, 1);
    }

    setTotalItems((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
    setOpenCart(true);
  };

  const addingProductToCart = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item._id === product._id &&
        item.colorId === product.colorId &&
        item.ageGroupId === product.ageGroupId
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          const quantityDiff = quantity - item.quantity;
          setTotalItems((prev) => prev + quantityDiff);
          setTotalPrice((prev) => prev + product.price * quantityDiff);
          if (quantity > 5) handleBulkOrderAlert();
          return { ...item, quantity };
        }
        return item;
      });
      setCartItems(updatedCart);
      syncAddToCart(product._id, product.colorId, product.ageGroupId, quantity);
    } else {
      if (quantity > 5) handleBulkOrderAlert();
      const newCartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.images[0],
        colorId: product.colorId,
        ageGroupId: product.ageGroupId,
        quantity,
      };
      setCartItems([...cartItems, newCartItem]);
      syncAddToCart(product._id, product.colorId, product.ageGroupId, quantity);
      setTotalItems((prev) => prev + quantity);
      setTotalPrice((prev) => prev + product.price * quantity);
    }
    setOpenCart(true);
  };

  const removeProductFromCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item._id === product._id &&
        item.colorId === product.colorId &&
        item.ageGroupId === product.ageGroupId
    );

    if (existingItemIndex !== -1) {
      const itemToRemove = cartItems[existingItemIndex];
      const updatedCart = cartItems.filter(
        (item) =>
          !(
            item._id === product._id &&
            item.colorId === product.colorId &&
            item.ageGroupId === product.ageGroupId
          )
      );

      setCartItems(updatedCart);
      syncRemoveFromCart(product._id, product.colorId, product.ageGroupId);

      setTotalItems((prev) => prev - itemToRemove.quantity);
      setTotalPrice(
        (prev) => prev - itemToRemove.price * itemToRemove.quantity
      );
      if (totalItems - itemToRemove.quantity <= 0) setOpenCart(false);
    }
  };

  const increaseQuantityFromCart = (product) => {
    const updatedCart = cartItems.map((item) => {
      if (
        item._id === product._id &&
        item.colorId === product.colorId &&
        item.ageGroupId === product.ageGroupId
      ) {
        if (item.quantity + 1 > 5) handleBulkOrderAlert();
        setTotalItems((prev) => prev + 1);
        setTotalPrice((prev) => prev + product.price);
        syncAddToCart(product._id, product.colorId, product.ageGroupId, 1);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const decreaseQuantityFromCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item._id === product._id &&
        item.colorId === product.colorId &&
        item.ageGroupId === product.ageGroupId
    );

    if (existingItemIndex !== -1) {
      const item = cartItems[existingItemIndex];
      if (item.quantity === 1) {
        const updatedCart = cartItems.filter(
          (i) =>
            !(
              i._id === product._id &&
              i.colorId === product.colorId &&
              i.ageGroupId === product.ageGroupId
            )
        );
        setCartItems(updatedCart);
        syncRemoveFromCart(product._id, product.colorId, product.ageGroupId);
        setTotalItems((prev) => prev - 1);
        setTotalPrice((prev) => prev - product.price);
        if (totalItems - 1 <= 0) setOpenCart(false);
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
        syncAddToCart(product._id, product.colorId, product.ageGroupId, -1);
        setTotalItems((prev) => prev - 1);
        setTotalPrice((prev) => prev - product.price);
      }
    }
  };

  const addFavouriteItems = (product) => {
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
      product_type: product.product_type,
      images: product.images,
      colorId: product.colorId || null,
      ageGroupId: product.ageGroupId || null,
    };

    const updatedFavourites = [...favouriteItems, newFavourite];
    setFavouriteItems(updatedFavourites);
    syncAddToWishlist(product._id, product.colorId, product.ageGroupId);

    setTotalFavouriteItems(updatedFavourites.length);
  };

  const removeFavouriteItemsWishList = (product) => {
    const updatedFavourites = favouriteItems.filter(
      (item) =>
        !(
          item._id === product._id &&
          item.colorId === product.colorId &&
          item.ageGroupId === product.ageGroupId
        )
    );

    setFavouriteItems(updatedFavourites);
    syncRemoveFromWishlist(product._id, product.colorId, product.ageGroupId);

    setTotalFavouriteItems(updatedFavourites.length);
  };

  const emptyCart = () => {
    syncRemoveFromCart();
    setCartItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    setOpenCart(false);
  };

  const saveForLater = (product) => {
    const alreadySaved = savedForLaterItems.some(
      (item) =>
        item._id === product._id &&
        item.colorId === product.colorId &&
        item.ageGroupId === product.ageGroupId
    );

    if (alreadySaved) return;

    removeProductFromCart(product);

    setSavedForLaterItems((prev) => [
      ...prev,
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.image || "",
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

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
    localStorage.setItem(
      "totalFavouriteItems",
      JSON.stringify(totalFavouriteItems)
    );
    localStorage.setItem(
      "savedForLaterItems",
      JSON.stringify(savedForLaterItems)
    );
  }, [
    cartItems,
    totalItems,
    totalPrice,
    favouriteItems,
    totalFavouriteItems,
    savedForLaterItems,
  ]);

  const contextValues = {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    itemDescriptions,
    setItemDescriptions,
    isQuickBuyClicked,
    setIsQuickBuyClicked,
    totalItems,
    setTotalItems,
    totalPrice,
    setTotalPrice,
    cartItems,
    setCartItems,
    openCart,
    setOpenCart,
    addToCart,
    formSubmit,
    setFormSubmit,
    addingProductToCart,
    removeProductFromCart,
    increaseQuantityFromCart,
    decreaseQuantityFromCart,
    emptyCart,
    addFavouriteItems,
    totalFavouriteItems,
    favouriteItems,
    removeFavouriteItemsWishList,
    isForgotPasswordOpen,
    setIsForgotPasswordOpen,
    isBulkOrderModalOpen,
    setIsBulkOrderModalOpen,
    savedForLaterItems,
    saveForLater,
    moveToCartFromSaved,
    removeSavedForLaterItem,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
