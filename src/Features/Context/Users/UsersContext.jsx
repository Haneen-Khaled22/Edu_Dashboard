import { createContext, useContext, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import toast from "react-hot-toast";

const UsersContext = createContext();

export function UsersContextProvider({ children }) {
  const [totalUsers, setTotalUsers] = useState([]);

  const { token } = useAuth();

  //users
  // get all users
  const getAllUsers = async () => {
    try {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await fetch(
        "https://edu-master-psi.vercel.app/admin/all-user",
        {
          headers: {
            token: token,
          },
        }
      );

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

  ///////////////////////////////////////

  // get user profile
  const getUserProfile = async () => {
    try {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await fetch("https://edu-master-psi.vercel.app/user/", {
        headers: {
          token: token,
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

  /////////////////////////////////////

  //  Delete user
  const deleteUser = async (id) => {
    try {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch(`https://edu-master-psi.vercel.app/user/`, {
        method: "DELETE",
        headers: {
          token: token,
        },
      });

      const data = await response.json();
      console.log("Delete user:", data);

      if (response.ok) {
        console.log("user deleted successfully");
      } else {
        console.error("Error deleting user:", data.message);
      }

      return data;
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  /////////////////////////////////////

  //update user
  const updateUser = async (id, updatedData) => {
    try {
      if (!token) {
        console.error("No token found in localStorage");
        toast.error("Authentication token not found!");
        return;
      }

      const response = await fetch(
        `https://edu-master-psi.vercel.app/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token, // ممكن تكتبها كده مباشرة
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      console.log("Update user Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      toast.success("user updated successfully");
      return data;
    } catch (error) {
      console.error(" updateuser Error:", error);
      toast.error(error.message || "Something went wrong while updating user");
    }
  };

  return (
    <UsersContext.Provider
      value={{
        totalUsers,
        setTotalUsers,
        getAllUsers,

        getUserProfile,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);