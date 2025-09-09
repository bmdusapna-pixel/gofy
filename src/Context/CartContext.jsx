import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
const CartContext = createContext();
import { AuthContext } from "./AuthContext";

const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const baseUrl = import.meta.env.VITE_BASE_URL;
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

  const syncAddToCart = async (productId, quantity = 1) => {
    if (!user?._id) return;
    try {
      const body = productId
        ? { userId: user._id, productId, quantity }
        : { userId: user._id };

      await fetch(`${baseUrl}/user/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error("Cart add API failed:", err);
    }
  };

  const syncRemoveFromCart = async (productId) => {
    if (!user?._id) return;
    try {
      await fetch(`${baseUrl}/user/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, productId }),
      });
    } catch (err) {
      console.error("Cart remove API failed:", err);
    }
  };

  const syncAddToWishlist = async (productId) => {
    if (!user?._id) return;
    try {
      await fetch(`${baseUrl}/user/wishlist/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, productId }),
      });
    } catch (err) {
      console.error("Wishlist add API failed:", err);
    }
  };

  const syncRemoveFromWishlist = async (productId) => {
    if (!user?._id) return;
    try {
      await fetch(`${baseUrl}/user/wishlist/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, productId }),
      });
    } catch (err) {
      console.error("Wishlist remove API failed:", err);
    }
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          if (item.quantity + 1 > 5) {
            handleBulkOrderAlert();
          }
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCart);
      syncAddToCart(product._id, 1);
    } else {
      const newCartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.images[0],
        quantity: 1,
      };
      setCartItems([...cartItems, newCartItem]);
      syncAddToCart(product._id, 1);
    }
    setTotalItems((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
    setOpenCart(true);
  };

  const addingProductToCart = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          const quantityDiff = quantity - item.quantity;
          setTotalItems((prev) => prev + quantityDiff);
          setTotalPrice((prev) => prev + product.price * quantityDiff);
          if (quantity > 5) {
            handleBulkOrderAlert();
          }
          return {
            ...item,
            quantity: quantity,
          };
        }
        return item;
      });
      setCartItems(updatedCart);
      syncAddToCart(product._id, quantity);
    } else {
      if (quantity > 5) {
        handleBulkOrderAlert();
      }
      const newCartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.images[0],
        quantity: quantity,
      };
      setCartItems([...cartItems, newCartItem]);
      syncAddToCart(product._id, quantity);
      setTotalItems((prev) => prev + quantity);
      setTotalPrice((prev) => prev + product.price * quantity);
    }
    setOpenCart(true);
  };

  const removeProductFromCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const itemToRemove = cartItems[existingItemIndex];
      const updatedCart = cartItems.filter((item) => item._id !== product._id);
      setCartItems(updatedCart);
      syncRemoveFromCart(product._id);
      setTotalItems((prev) => prev - itemToRemove.quantity);
      setTotalPrice(
        (prev) => prev - itemToRemove.price * itemToRemove.quantity
      );
      if (totalItems - itemToRemove.quantity <= 0) {
        setOpenCart(false);
      }
    }
  };

  const increaseQuantityFromCart = (product) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === product._id) {
        if (item.quantity + 1 > 5) {
          handleBulkOrderAlert();
        }
        setTotalItems((prev) => prev + 1);
        setTotalPrice((prev) => prev + product.price);
        syncAddToCart(product._id, 1);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const decreaseQuantityFromCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const item = cartItems[existingItemIndex];
      if (item.quantity === 1) {
        const updatedCart = cartItems.filter((i) => i._id !== product._id);
        setCartItems(updatedCart);
        syncRemoveFromCart(product._id);
        setTotalItems((prev) => prev - 1);
        setTotalPrice((prev) => prev - product.price);
        if (totalItems - 1 <= 0) {
          setOpenCart(false);
        }
      } else {
        const updatedCart = cartItems.map((item) => {
          if (item._id === product._id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCartItems(updatedCart);
        syncAddToCart(product._id, -1);
        setTotalItems((prev) => prev - 1);
        setTotalPrice((prev) => prev - product.price);
      }
    }
  };

  const addFavouriteItems = (product) => {
    const alreadyExists = favouriteItems.some(
      (item) => item._id === product._id
    );
    if (alreadyExists) return;
    const newFavourite = {
      _id: product._id,
      name: product.name,
      price: product.price,
      product_type: product.product_type,
      images: product.images,
    };
    const updatedFavourites = [...favouriteItems, newFavourite];
    setFavouriteItems(updatedFavourites);
    syncAddToWishlist(product._id);
    setTotalFavouriteItems(updatedFavourites.length);
  };

  const removeFavouriteItemsWishList = (product) => {
    const updatedFavourites = favouriteItems.filter(
      (item) => item._id !== product._id
    );
    setFavouriteItems(updatedFavourites);
    syncRemoveFromWishlist(product._id);
    setTotalFavouriteItems(updatedFavourites.length);
  };

  const emptyCart = () => {
    syncAddToCart();
    setCartItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    setOpenCart(false);
  };

  const saveForLater = (product) => {
    const isAlreadySaved = savedForLaterItems.some(
      (item) => item._id === product._id
    );
    if (isAlreadySaved) {
      return;
    }
    removeProductFromCart(product);
    setSavedForLaterItems((prev) => [...prev, product]);
  };

  const moveToCartFromSaved = (product) => {
    setSavedForLaterItems((prev) =>
      prev.filter((item) => item._id !== product._id)
    );

    // Create a new product object with the 'images' property
    // so it matches the expected structure of addingProductToCart
    const productWithImages = {
      ...product,
      images: [product.image],
    };

    addingProductToCart(productWithImages, product.quantity);
  };

  const removeSavedForLaterItem = (product) => {
    setSavedForLaterItems((prev) =>
      prev.filter((item) => item._id !== product._id)
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
