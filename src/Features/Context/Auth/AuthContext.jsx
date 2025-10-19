import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  

  // ✅ تسجيل الدخول كأدمن
  const loginAsAdmin = async (email, password) => {
  try {
    const res = await fetch("https://edu-master-psi.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token); // ✅ خزني التوكن هنا
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.error("Login error:", err);
    return { success: false };
  }
};

  // ✅ تحميل التوكن عند فتح الصفحة
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ✅ تسجيل الخروج
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    
  };

  return (
    <authContext.Provider value={{ loginAsAdmin, token, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
