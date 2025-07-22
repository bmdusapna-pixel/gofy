import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [openCart, setOpenCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [itemDescriptions, setItemDescriptions] = useState([]);
  const [isQuickBuyClicked, setIsQuickBuyClicked] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);

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

  // adding product to the cart
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCart);
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
    }
    setTotalItems((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
    setOpenCart(true);
  };

  // adding product to the cart from product details page
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
          return {
            ...item,
            quantity: quantity,
          };
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      const newCartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.images[0],
        quantity: quantity,
      };
      setCartItems([...cartItems, newCartItem]);
      setTotalItems((prev) => prev + quantity);
      setTotalPrice((prev) => prev + product.price * quantity);
    }
    setOpenCart(true);
  };

  // removing product from cart
  const removeProductFromCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const itemToRemove = cartItems[existingItemIndex];
      const updatedCart = cartItems.filter((item) => item._id !== product._id);
      setCartItems(updatedCart);
      setTotalItems((prev) => prev - itemToRemove.quantity);
      setTotalPrice(
        (prev) => prev - itemToRemove.price * itemToRemove.quantity
      );
      if (totalItems - itemToRemove.quantity <= 0) {
        setOpenCart(false);
      }
    }
  };

  // incraesing the quantity of the product from cart by 1
  const increaseQuantityFromCart = (product) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === product._id) {
        setTotalItems((prev) => prev + 1);
        setTotalPrice((prev) => prev + product.price);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // decreasing the quantity of the product from cart by 1
  const decreaseQuantityFromCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const item = cartItems[existingItemIndex];
      if (item.quantity === 1) {
        const updatedCart = cartItems.filter((i) => i._id !== product._id);
        setCartItems(updatedCart);
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
        setTotalItems((prev) => prev - 1);
        setTotalPrice((prev) => prev - product.price);
      }
    }
  };

  // removing all product from the cart
  const emptyCart = () => {
    setCartItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    setOpenCart(false);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalItems");
    localStorage.removeItem("totalPrice");
  };

  // add favour items to the cart
  const addFavouriteItems = (product) => {
    // Check if product already exists in favourites
    const alreadyExists = favouriteItems.some(
      (item) => item._id === product._id
    );
    if (alreadyExists) return;

    // Create new favourite item object
    const newFavourite = {
      _id: product._id,
      name: product.name,
      price: product.price,
      product_type: product.product_type,
      images: product.images,
    };

    // Update state and localStorage
    const updatedFavourites = [...favouriteItems, newFavourite];
    setFavouriteItems(updatedFavourites);
    setTotalFavouriteItems(updatedFavourites.length);
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
  }, [cartItems, totalItems, totalPrice, favouriteItems, totalFavouriteItems]);

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
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
