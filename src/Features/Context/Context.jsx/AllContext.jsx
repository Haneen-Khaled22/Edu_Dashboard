import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const UsersContext = createContext();

export function UsersContextProvider({ children }) {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalLessons, setTotalLessons] = useState([]);
   const [totalExams, setTotalExams] = useState([]);

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

  // get all admins
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


  // lessonns
  // get all lessons
 const getAllLessons = async (page = 1, limit = 10) => {
  try {
   

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    // ✅ لو API عنده pagination
    const response = await fetch(
      `https://edu-master-psi.vercel.app/lesson?page=${page}&limit=${limit}`,
      {
        headers: {
          token: token,
        },
      }
    );

    const data = await response.json();
    console.log("Lessons Data:", data);

    if (response.ok) {
      // ✅ حفظ البيانات في الـ state
      setTotalLessons(data.data || []);

      // ✅ نرجع كل حاجة علشان الكومبوننت يستخدمها
      return {
        lessons: data.data || [],
        pagination: data.pagination || { page: 1, total: 0, totalPages: 1 },
      };
    } else {
      console.error("Error fetching lessons:", data.message);
      return { lessons: [], pagination: {} };
    }
  } catch (error) {
    console.error("Fetch Lessons Error:", error);
    return { lessons: [], pagination: {} };
  }
};


 // Get Lesson by ID
const getLessonById = async (id) => {
  try {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await fetch(
      `https://edu-master-psi.vercel.app/lesson/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );

    const data = await response.json();
    console.log("Lesson details:", data);

    if (response.ok) {
      console.log("Fetched lesson details successfully");
      return data;
    } else {
      console.error("Error fetching lesson details:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Fetch lesson detail error:", error);
  }
};

//  Delete Lesson
const deleteLesson = async (id) => {
  try {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await fetch(
      `https://edu-master-psi.vercel.app/lesson/${id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );

    const data = await response.json();
    console.log("Delete response:", data);

    if (response.ok) {
      console.log("Lesson deleted successfully");
    } else {
      console.error("Error deleting lesson:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Delete lesson error:", error);
  }
};

// add lesson
const addLesson = async (lessonData) => {
  try {
  

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await fetch("https://edu-master-psi.vercel.app/lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,  
      },
      body: JSON.stringify(lessonData), // lessonData هو object فيه كل البيانات
    });

    const data = await response.json();
    console.log("Add Lesson Response:", data);

    if (response.ok) {
      console.log("✅ Lesson added successfully",data);
      toast.success("Lesson added successfully")
    } else {
      console.error("❌ Error adding lesson:", data.message);
      toast.error(data.message);
    }

    return data;
  } catch (error) {
    console.error("🚨 Add Lesson Error:", error);
  }
};

//update lesson
const updateLesson = async (id,updatedData) => {
  try {

    if (!token) {
      console.error("No token found in localStorage");
      toast.error("Authentication token not found!");
      return;
    }

    const response = await fetch(`https://edu-master-psi.vercel.app/lesson/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token, // ممكن تكتبها كده مباشرة
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    console.log("Update Lesson Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to update lesson");
    }

    toast.success("Lesson updated successfully");
    return data;
  } catch (error) {
    console.error(" updateLesson Error:", error);
    toast.error(error.message || "Something went wrong while updating lesson");
  }
};


// examss

// get all exams
 const getAllExams = async () => {
  try {
   

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    
    const response = await fetch(
      `https://edu-master-psi.vercel.app/exam`,
      {
        headers: {
          token: token,
        },
      }
    );

    const data = await response.json();
    console.log("Exams Data:", data);

    if (response.ok) {
      // ✅ حفظ البيانات في الـ state
      setTotalExams(data.data || []);

      // ✅ نرجع كل حاجة علشان الكومبوننت يستخدمها
      return data;
    } else {
      console.error("Error fetching exams:", data.message);
     
    }
  } catch (error) {
    console.error("Fetch exams Error:", error);
   
  }
};

 // Get exam by ID
const getExamById = async (id) => {
  try {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await fetch(
      `https://edu-master-psi.vercel.app/exam/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );

    const data = await response.json();
    console.log("Exam details:", data);

    if (response.ok) {
      console.log("Fetched exam details successfully");
      return data;
    } else {
      console.error("Error fetching exam details:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Fetch exam detail error:", error);
  }
};

// add exam
const addExam = async (examData) => {
  try {
  

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await fetch("https://edu-master-psi.vercel.app/exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,  
      },
      body: JSON.stringify(examData), // lessonData هو object فيه كل البيانات
    });

    const data = await response.json();
    console.log("Add exam Response:", data);

    if (response.ok) {
      console.log(" exam added successfully",data);
    
    } else {
      console.error("❌ Error adding exam:", data.message);
      
    }

    return data;
  } catch (error) {
    console.error("🚨 Add exam Error:", error);
  }
};

//  Delete exam
const deleteExam= async (id) => {
  try {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await fetch(
      `https://edu-master-psi.vercel.app/exam/${id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );

    const data = await response.json();
    console.log("Delete response:", data);

    if (response.ok) {
      console.log("Exam deleted successfully");
    } else {
      console.error("Error deleting exam:", data.message);
    }

    return data;
  } catch (error) {
    console.error("Delete exam error:", error);
  }
};

//update exam

const updateExam = async (id,updatedData) => {
  try {

    if (!token) {
      console.error("No token found in localStorage");
      toast.error("Authentication token not found!");
      return;
    }

    const response = await fetch(`https://edu-master-psi.vercel.app/exam/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token, // ممكن تكتبها كده مباشرة
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    console.log("Update exam Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to update exam");
    }

    return data;
  } catch (error) {
    console.error(" updateExam Error:", error);
  }
};


  return (
    <UsersContext.Provider value={{ totalUsers, setTotalUsers, getAllUsers,getAllAdmins,getAllLessons,totalLessons,setTotalLessons,getLessonById,deleteLesson,addLesson,getAllExams,totalExams,setTotalExams,updateLesson ,getExamById,addExam
      ,deleteExam,updateExam
    }}>
      {children}
    </UsersContext.Provider>
  );
}
export const useUsers = () => useContext(UsersContext);
