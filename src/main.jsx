import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { AuthProvider } from "./Context/AuthContext";
import LocationProvider from "./Context/LocationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LocationProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
