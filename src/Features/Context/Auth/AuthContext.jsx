
import { createContext, useContext, useState } from 'react';

let authContext = createContext();



// https://edu-master-psi.vercel.app/auth/login


// display total users
export function AuthContextProvider({ children }) {
     const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
    
  // if(!user){
  //   return null;
  // }

  const loginAsAdmin = async (email, password) => {
  try {
    const response = await fetch("https://edu-master-psi.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    console.log("Login Response:", data);
   if (data.message === "login successfully") {
        // ✅ نحفظ التوكن
        localStorage.setItem("token", data.token);
        setToken(data.token);
        console.log("Token saved:", data.token);

        return { success: true, token: data.token };
      } else {
        alert("Invalid email or password");
        return { success: false };
      }

     
    
   
  } catch (error) {
    console.error("Login Error:", error);
  }
};
const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

    return <authContext.Provider value={{loginAsAdmin,token,user,logout}}>
        {children}
        </authContext.Provider>;
}


export const useAuth =()=> useContext(authContext);