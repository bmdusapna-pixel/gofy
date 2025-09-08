import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { AuthProvider } from "./Context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
