import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
          reject("Unable to fetch location");
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 1000 * 60 * 5,
        }
      );
    });
  };

  const detectLocation = async () => {
    try {
      setLoading(true);
      setError("");

      const coords = await getCurrentLocation();

      const res = await api.get(
        `location/reverse-geocode?lat=${coords.lat}&lng=${coords.lng}`
      );

      if (res.status !== 200) {
        throw new Error("Failed to fetch address");
      }

      const address = res.data;
      setLocation(address);

      // Save for reuse
      localStorage.setItem("userLocation", JSON.stringify(address));
    } catch (err) {
      console.error("Location error:", err);
      setError(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) {
      try {
        setLocation(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing saved location:", error);
      }
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        detectLocation,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
