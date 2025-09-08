import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (phone, otp) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setToken(data.token);
      setUser(data.user || null);
      return { success: true, data };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (signUpData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signUpData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setToken(data.token);
      setUser(data.user || null);
      return { success: true, data };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
