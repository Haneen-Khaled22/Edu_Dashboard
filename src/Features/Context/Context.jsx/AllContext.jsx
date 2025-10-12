import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const UsersContext = createContext();

export function UsersContextProvider({ children }) {
  const [totalUsers, setTotalUsers] = useState([]);
  // const [totalLessons, setTotalLessons] = useState([]);

   const { token } = useAuth();
  

  // get all users
  const getAllUsers = async () => {
    try {
     

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
      const response = await fetch("https://edu-master-psi.vercel.app/admin/all-user", {
        headers: {
          token: token
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setTotalUsers(data.data); // لو رجعوا بيانات بنحدث الستيت
      } else {
        console.error("Error fetching users:", data.message);
      }

      return data;
    } catch (error) {
      console.error("Fetch Users Error:", error);
    }
  };

   const getAllAdmins = async () => {
    try {
      

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
      const response = await fetch("https://edu-master-psi.vercel.app/admin/all-admin", {
        headers: {
          token: token
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setTotalUsers(data.data); // لو رجعوا بيانات بنحدث الستيت
      } else {
        console.error("Error fetching users:", data.message);
      }

      return data;
    } catch (error) {
      console.error("Fetch Users Error:", error);
    }
  };


  // get all lessons
  // const getAllLessons = async () => {
  //   try {
    

  //   if (!token) {
  //     console.error("No token found in localStorage");
  //     return;
  //   }
  //     const response = await fetch("https://edu-master-psi.vercel.app/admin/all-user", {
  //       headers: {
  //         token: token
  //       },
  //     });

  //     const data = await response.json();
  //     console.log(data);

  //     if (response.ok) {
  //       setTotalUsers(data.data); // لو رجعوا بيانات بنحدث الستيت
  //     } else {
  //       console.error("Error fetching users:", data.message);
  //     }

  //     return data;
  //   } catch (error) {
  //     console.error("Fetch Users Error:", error);
  //   }
  // };

  return (
    <UsersContext.Provider value={{ totalUsers, setTotalUsers, getAllUsers,getAllAdmins }}>
      {children}
    </UsersContext.Provider>
  );
}

// ✅ كستم هوك
export const useUsers = () => useContext(UsersContext);
